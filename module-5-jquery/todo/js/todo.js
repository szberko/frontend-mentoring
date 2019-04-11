"use strict";

export class Todo{
    constructor(name, orderNumber, completed, app){
        this.id = create_UUID();
        this.name = name;
        this.orderNumber = orderNumber;
        this.completed = completed;
        this.app = app;
    }

    convertIncompleteToDOM(){
        let $todo = $(`<li id="${this.id}" class="todo"></li>`);
        $(`<div class="todo__name todo__element">${this.name}</div>`).appendTo($todo);
        $(`<div id="move-up-${this.id}" class="todo__moveup todo__element todo__modifier">↑</div>`).appendTo($todo).click( () => {
            this.app.moveUp(this.id);
        });
        $(`<div id="move-down-${this.id}" class="todo__movedown todo__element todo__modifier">↓</div>`).appendTo($todo).click( () => {
            this.app.moveDown(this.id);
        });
        $(`<div id="mark-completed-${this.id}" class="todo__complete todo__element todo__modifier">✓</div>`).appendTo($todo).click( () => {
            this.app.completeTodo(this.id);
        });
        $(`<div id="delete-${this.id}" class="todo__delete todo__element todo__modifier">╳</div>`).appendTo($todo).click( () => {
            this.app.deleteTodo(this.id);
        });

        return $todo;
    }

    convertCompleteToDOM(){
        let $todo = $(`<li id="${this.id}" class="todo completed"></li>`);
        $(`<div class="todo__name todo__element">${this.name}</div>`).appendTo($todo);
        $(`<div class="todo__delete todo__element todo__modifier">╳</div>`).appendTo($todo).click( () => {
            this.app.deleteTodo(this.id);
        });

        return $todo;
    }
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