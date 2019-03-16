"use strict";

import {Todo} from './todo.js';
import {ListOfTodos} from './listoftodos.js'



var todoItems = new ListOfTodos([
        new Todo("Milk", 1, false),
        new Todo("Eggs", 2, false),
        new Todo("Sugar", 3, false),
        new Todo("Carrots", null, true)
    ])






window.onload = function() {
    todoItems.updateTheList();

    document.getElementById("add-new-todo").addEventListener("submit", function(event) {
        event.preventDefault();
        todoItems.createTodo(this.firstElementChild.value);
        this.firstElementChild.value = '';
        
        todoItems.updateTheList();
    })
}



