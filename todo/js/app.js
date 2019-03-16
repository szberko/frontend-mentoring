"use strict";

import {Todo} from './todo.js';
import {updateTheTodoLists} from './utility.js'

const FILTER_OUT_NON_COMPLETED_TODO = todo => !todo.completed;

var todoItems = [
    new Todo("Milk", 1, false),
    new Todo("Eggs", 2, false),
    new Todo("Sugar", 3, false),
    new Todo("Carrots", null, true)
];







