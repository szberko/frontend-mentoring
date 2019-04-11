"use strict";

import {Todo} from "./todo.js";

export class ListOfTodos{
    constructor(listOfTodos){
        this.listOfTodos = listOfTodos;
        this.GET_NON_COMPLETED_TODOS = todo => !todo.completed;
    }

    createTodo(todoName){
        let orderNumber = this.listOfTodos.filter(this.GET_NON_COMPLETED_TODOS).length + 1;
        this.listOfTodos.push(
            new Todo(todoName, orderNumber, false)
        );
    }

    deleteTodo(todoId){
        let orderNumberOfDeletedTodo;
        // Remove todo from the list of todos
        this.listOfTodos.forEach( (todoToBeDeleted, index) => {
            if(todoToBeDeleted.id === todoId){
                orderNumberOfDeletedTodo = todoToBeDeleted.orderNumber;
                this.listOfTodos.splice(index, 1);
                return;
            }
        })

        // Lower the order number for all the todos which are above the deleted one
        this.listOfTodos.filter(this.GET_NON_COMPLETED_TODOS)
                    .filter(todo => todo.orderNumber > orderNumberOfDeletedTodo)
                    .map(todo => todo.orderNumber--);
    }

    completeTodo(todoToBeCompletedId){
        let todoToBeCompleted = this.listOfTodos.find( todo => todo.id === todoToBeCompletedId);
        // Lower the order number for all the todos which are above the completed one
        this.listOfTodos.filter( todo => todo.orderNumber > todoToBeCompleted.orderNumber).map(todo => {
            todo.orderNumber--;
        })

        // Mark the todo as completed and set the order number to null
        todoToBeCompleted.completed = true;
        todoToBeCompleted.orderNumber = null;
    }

    moveUp(todoId){
        // Get the reuqested todo. Check is it the first element already
        let todoItem = this.listOfTodos.find(todo => todo.id === todoId && todo.orderNumber !== 1);

        // Increase the order number for todo which is ahead of the todoItem
        // Decrease the order number for the todoItem
        if(todoItem !== undefined){
            let todoItemWithHigherPrio = this.listOfTodos.find(todo => todo.orderNumber === todoItem.orderNumber - 1);
            todoItemWithHigherPrio.orderNumber++;
            todoItem.orderNumber--;
        }
    }

    moveDown(todoId){
        // Get the requested todo. CHeck is it the last element already
        let numberOfNonCompletedTodos = this.listOfTodos.filter(this.GET_NON_COMPLETED_TODOS).length;
        let todoItem = this.listOfTodos.find(todo => todo.id === todoId && todo.orderNumber !== numberOfNonCompletedTodos);

        // Decrease the order number for the todo which is below the todoItem
        // Increase the order number for the todoItem
        if(todoItem !== undefined){
            let todoItemWithLowerPrio = this.listOfTodos.find(todo => todo.orderNumber === todoItem.orderNumber + 1);
            todoItemWithLowerPrio.orderNumber -- ;
            todoItem.orderNumber++;
        }
    }

    /**
     * Populate the web application with already created todos
     */
    fillTheLists(){
        this.listOfTodos.filter(todo => !todo.completed)
                    .sort( (todo1, todo2) => todo1.orderNumber - todo2.orderNumber )
                    .forEach( todoItem => {
                        let todoElem = document.getElementById("todo-list").appendChild(todoItem.convertIncompleteToDOM());
                        todoElem.getElementsByClassName("todo__delete")[0].addEventListener("click", () => {
                            this.deleteTodo(todoItem.id);

                            this.resetTheLists();
                            this.fillTheLists();
                        });

                        todoElem.getElementsByClassName("todo__complete")[0].addEventListener("click", () => {
                            this.completeTodo(todoItem.id);

                            this.resetTheLists();
                            this.fillTheLists();
                        });

                        todoElem.getElementsByClassName("todo__moveup")[0].addEventListener("click", () => {
                            this.moveUp(todoItem.id);

                            this.resetTheLists();
                            this.fillTheLists();
                        })

                        todoElem.getElementsByClassName("todo__movedown")[0].addEventListener("click", () => {
                            this.moveDown(todoItem.id);

                            this.resetTheLists();
                            this.fillTheLists();
                        })
                    });
    
        this.listOfTodos.filter(todo => todo.completed)
                    .forEach(completedItem => {
                        let todoElem = document.getElementById("completed-list").appendChild(completedItem.convertCompleteToDOM());
                        todoElem.getElementsByClassName("todo__delete")[0].addEventListener("click", () => {
                            this.deleteTodo(completedItem.id);

                            this.resetTheLists();
                            this.fillTheLists();
                        })
                    });
    }

    /**
     * Removes all todos from the web application
     */
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