"use strict";

import {Todo} from './todo.js';
import {ListOfTodos} from './listoftodos.js';

var todoItems = new ListOfTodos([]);


$("document").ready( () => {
    // todoItems.updateTheList();

    $("#add-new-todo").submit( function(event) {
        event.preventDefault();

        let inputField = $(this).children(".add__name");

        todoItems.createTodo(inputField.val());
        inputField.val('');
        
        todoItems.updateTheList();
    });
});