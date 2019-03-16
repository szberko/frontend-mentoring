'use strict';

function createTodo(todoName){
    let orderNumber = todoItems.filter(FILTER_OUT_NON_COMPLETED_TODO).length + 1;
    todoItems.push(
        new Todo(todoName, orderNumber, false)
    );
    updateTheTodoLists(todoItems);
    console.log(todoItems);
}

function deleteTodo(todoId){
    let orderNumberOfDeletedTodo;
    todoItems.forEach( (todoToBeDeleted, index, todoList) => {
        if(todoToBeDeleted.id === todoId){
            orderNumberOfDeletedTodo = todoToBeDeleted.orderNumber;
            todoList.splice(index, 1);
            return;
        }
    })

    todoItems.filter(FILTER_OUT_NON_COMPLETED_TODO)
                .filter(todo => todo.orderNumber > orderNumberOfDeletedTodo)
                .map(todo => todo.orderNumber--);

    updateTheTodoLists(todoItems);
}