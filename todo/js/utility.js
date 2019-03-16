"use strict";

function fillTheLists(todoItems){
    todoItems.filter(todo => !todo.completed)
                .sort( (todo1, todo2) => todo1.orderNumber - todo2.orderNumber )
                .forEach( todoItem => {
                    document.getElementById("todo-list").appendChild(todoItem.convertIncompleteToDOM());
                });

    todoItems.filter(todo => todo.completed)
                .forEach(completedItem => {
                    document.getElementById("completed-list").appendChild(completedItem.convertCompleteToDOM());
                });
}

function resetTheLists(){
    let todoList = document.getElementById("todo-list");
    let completedList = document.getElementById("completed-list")
    while(todoList.firstChild){
        todoList.removeChild(todoList.firstChild);
    }

    while(completedList.firstChild){
        completedList.removeChild(completedList.firstChild);
    }
}



export function updateTheTodoLists(todoItems){
    resetTheLists();
    fillTheLists(todoItems);
    attachEventListeners();
}