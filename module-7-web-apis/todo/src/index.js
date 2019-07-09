import {Todo} from './todo.js';
import './app.scss';
import {Storage} from './localStorageHelper.js';

class App{
    constructor(){
        this.bindEvents();
        this.updateTheList();
    }

    createTodo(todoName){
        let orderNumber = Storage.getNonCompletedTodoListSize() + 1;
        let newTodo = Todo.createBrandNewTodo(todoName, orderNumber, false, this);
        Storage.pushTodo(newTodo);
        this.updateTheList();
    }

    deleteTodo(todoId){
        Storage.deleteTodo(todoId);
        this.updateTheList();
    }

    completeTodo(todoToBeCompletedId){
        let todo = Storage.getTodo(todoToBeCompletedId);
        todo.completed = true;
        todo.orderNumber = null;

        Storage.pushTodo(todo);
        this.updateTheList();
    }

    moveUp(todoId){
        // Get the reuqested todo. Check is it the first element already
        let todoItem = Storage.getNonCompletedTodoList().find(todo => todo.id === todoId && todo.orderNumber !== 1);

        // Increase the order number for todo which is ahead of the todoItem
        // Decrease the order number for the todoItem
        if(todoItem !== undefined){
            let todoItemWithHigherPrio = Storage.getNonCompletedTodoList().find(todo => todo.orderNumber === todoItem.orderNumber - 1);
            todoItemWithHigherPrio.orderNumber++;
            todoItem.orderNumber--;

            Storage.pushTodo(todoItemWithHigherPrio);
            Storage.pushTodo(todoItem);
        }

        this.updateTheList();
    }

    moveDown(todoId){
        // Get the requested todo. CHeck is it the last element already
        let todoItem = Storage.getNonCompletedTodoList().find(todo => todo.id === todoId);

        // Decrease the order number for the todo which is below the todoItem
        // Increase the order number for the todoItem
        if(todoItem !== undefined){
            let todoItemWithLowerPrio = Storage.getNonCompletedTodoList().find(todo => todo.orderNumber === todoItem.orderNumber + 1);
            todoItemWithLowerPrio.orderNumber -- ;
            todoItem.orderNumber++;

            Storage.pushTodo(todoItemWithLowerPrio);
            Storage.pushTodo(todoItem);
        }

        this.updateTheList();
    }

    bindEvents(){
        $('#add-new-todo').submit( (event) => {
            event.preventDefault();
            let inputField = $(event.target).children('.add__name');
            this.createTodo(inputField.val());
            inputField.val('');
        });
    
        $('.todo-items__list').on('click', '.todo__moveup', (event) => {
            this.moveUp($(event.target).parent().attr('id'));
        });
    
        $('.todo-items__list').on('click', '.todo__movedown', (event) => {
            this.moveDown($(event.target).parent().attr('id'));
        });
    
        $('.todo-items__list').on('click', '.todo__complete', (event) => {
            this.completeTodo($(event.target).parent().attr('id'));
        });
    
        $('.todo-items__list').on('click', '.todo__delete', (event) => {
            this.deleteTodo($(event.target).parent().attr('id'));
        });

        $(window).bind('storage', () => {
            this.updateTheList();
        });
    }

    /**
     * Populate the web application with already created todos
     */
    fillTheLists(){
        Storage.getNonCompletedTodoList()
                    .sort( (todo1, todo2) => todo1.orderNumber - todo2.orderNumber )
                    .forEach(item => item.convertIncompleteToDOM().appendTo($('#todo-list')));

        Storage.getCompletedTodoList()
                    .forEach( item => item.convertCompleteToDOM().appendTo($('#completed-list')));
    }

    /**
     * Removes all todos from the web application
     */
    resetTheLists(){
        $('#todo-list').empty();
        $('#completed-list').empty();
    }

    updateTheList(){
        this.resetTheLists();
        this.fillTheLists();
    }
}



$('document').ready( () => new App());