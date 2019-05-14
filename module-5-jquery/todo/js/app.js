import {Todo} from './todo.js';

class App{
    constructor(listOfTodos){
        this.listOfTodos = listOfTodos;
        this.GET_NON_COMPLETED_TODOS = todo => !todo.completed;

        this.bindEvents();
    }

    createTodo(todoName){
        let orderNumber = this.listOfTodos.filter(this.GET_NON_COMPLETED_TODOS).length + 1;
        this.listOfTodos.push(
            new Todo(todoName, orderNumber, false, this)
        );
        this.updateTheList();
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

        this.updateTheList();
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

        this.updateTheList();
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

        this.updateTheList();
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
    }

    /**
     * Populate the web application with already created todos
     */
    fillTheLists(){
        this.listOfTodos.sort( (todo1, todo2) => todo1.orderNumber - todo2.orderNumber )
                    .forEach(item => {
                        item.completed ? 
                            item.convertCompleteToDOM().appendTo($('#completed-list')) : 
                            item.convertIncompleteToDOM().appendTo($('#todo-list'));
                    });
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



$('document').ready( () => new App([]));