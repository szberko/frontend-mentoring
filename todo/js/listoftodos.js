"use strict";

import {Todo} from "./todo.js";

export class ListOfTodos{
    constructor(listOfTodos){
        this.listOfTodos = listOfTodos;
        this.FILTER_OUT_NON_COMPLETED_TODO = todo => !todo.completed;
    }

    createTodo(todoName){
        let orderNumber = this.listOfTodos.filter(this.FILTER_OUT_NON_COMPLETED_TODO).length + 1;
        this.listOfTodos.push(
            new Todo(todoName, orderNumber, false)
        );
    }

    deleteTodo(todoId){
        let orderNumberOfDeletedTodo;
        this.listOfTodos.forEach( (todoToBeDeleted, index) => {
            if(todoToBeDeleted.id === todoId){
                orderNumberOfDeletedTodo = todoToBeDeleted.orderNumber;
                this.listOfTodos.splice(index, 1);
                return;
            }
        })

        this.listOfTodos.filter(this.FILTER_OUT_NON_COMPLETED_TODO)
                    .filter(todo => todo.orderNumber > orderNumberOfDeletedTodo)
                    .map(todo => todo.orderNumber--);
    }

    fillTheLists(){
        let self = this;
        this.listOfTodos.filter(todo => !todo.completed)
                    .sort( (todo1, todo2) => todo1.orderNumber - todo2.orderNumber )
                    .forEach( todoItem => {
                        let todoElem = document.getElementById("todo-list").appendChild(todoItem.convertIncompleteToDOM());
                        todoElem.getElementsByClassName("todo__delete")[0].addEventListener("click", function() {
                            self.deleteTodo(todoItem.id);

                            self.resetTheLists();
                            self.fillTheLists();
                        })
                    });
    
        this.listOfTodos.filter(todo => todo.completed)
                    .forEach(completedItem => {
                        document.getElementById("completed-list").appendChild(completedItem.convertCompleteToDOM());
                    });
    }

    resetTheLists(){
        let todoList = document.getElementById("todo-list");
        let completedList = document.getElementById("completed-list")
        while(todoList.firstChild){
            todoList.removeChild(todoList.firstChild);
        }
    
        while(completedList.firstChild){
            completedList.removeChild(completedList.firstChild);
        }
    }

    updateTheList(){
        this.resetTheLists();
        this.fillTheLists();
    }
}