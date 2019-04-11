"use strict";

import {Todo} from './todo.js';
import {ListOfTodos} from './listoftodos.js';

var todoItems = new ListOfTodos([
    new Todo("Milk", 1, false),
    new Todo("Eggs", 2, false),
    new Todo("Sugar", 3, false),
    new Todo("Carrots", null, true)
]);


$("document").ready( () => {
    todoItems.updateTheList();

    $("#add-new-todo").submit( function(event) {
        event.preventDefault();

        let inputField = $(this).children(".add__name");

        todoItems.createTodo(inputField.val());
        inputField.val('');
        
        todoItems.updateTheList();
    });
});