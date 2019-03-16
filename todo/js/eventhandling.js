'use strict';

function attachEventListeners(){

    Array.from(document.getElementsByClassName("todo__delete")).forEach( element => {
        element.addEventListener("click", function() {
            deleteTodo(this.parentNode.id);
        })
    });
}


window.onload = function() {
    updateTheTodoLists(todoItems);

    document.getElementById("add-new-todo").addEventListener("submit", function(event) {
        event.preventDefault();
        createTodo(this.firstElementChild.value);
        this.firstElementChild.value = '';
    })
}