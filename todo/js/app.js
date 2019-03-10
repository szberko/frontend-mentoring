"use strict";

class Todo{
    constructor(name, orderNumber, completed){
        this.id = create_UUID();
        this.name = name;
        this.orderNumber = orderNumber;
        this.completed = completed;
    }

    convertIncompleteToDOM(){
        let liElement = document.createElement("li");
        liElement.innerHTML = `
        <li id="${this.id}" class="todo">
            <div class="todo__name todo__element">${this.name}</div>
            <div class="todo__moveup todo__element todo__modifier">↑</div>
            <div class="todo__movedown todo__element todo__modifier">↓</div>
            <div class="todo__complete todo__element todo__modifier">✓</div>
            <div class="todo__delete todo__element todo__modifier" onClick="deleteTodo(this.parentNode.id)">╳</div>
        </li>
        `;
        return liElement;
    }

    convertCompleteToDOM(){
        let liElement = document.createElement("li");
        liElement.innerHTML = `
        <li id="${this.id}" class="todo completed">
            <div class="todo__name todo__element">${this.name}</div>
            <div class="todo__delete todo__element todo__modifier" onClick="deleteTodo(this.parentNode.id)">╳</div>
        </li>
        `;
        return liElement;
    }
}

var todoItems = [
    new Todo("Milk", 1, false),
    new Todo("Eggs", 2, false),
    new Todo("Sugar", 3, false),
    new Todo("Carrots", 4, true)
];



function updateTheLists(){
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

function createTodo(todoName){
    // TODO - Handle the case when there is no incompleted item on the list
    let lastOrderNumber = todoItems.filter(todo => !todo.completed)[todoItems.length - 1].orderNumber;
    todoItems.push(
        new Todo(todoName, lastOrderNumber + 1, false)
    );
    resetTheLists();
    updateTheLists();

    console.log(todoItems);
}

function deleteTodo(todoId){
    todoItems.filter( (todo, index, todoList) => {
        if(todo.id === todoId){
            todoList.splice(index, 1);
        }
    })
    resetTheLists();
    updateTheLists();
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

document.getElementById("add-new-todo").addEventListener("click", function() {
    createTodo(this.previousElementSibling.value);
})