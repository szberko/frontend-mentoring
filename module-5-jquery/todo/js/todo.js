"use strict";

export class Todo{
    constructor(name, orderNumber, completed){
        this.id = create_UUID();
        this.name = name;
        this.orderNumber = orderNumber;
        this.completed = completed;
    }

    convertIncompleteToDOM(){
        return $(`
            <li id="${this.id}" class="todo">
                <div class="todo__name todo__element">${this.name}</div>
                <div id="move-up-${this.id}" class="todo__moveup todo__element todo__modifier">↑</div>
                <div id="move-down-${this.id}" class="todo__movedown todo__element todo__modifier">↓</div>
                <div id="mark-completed-${this.id}" class="todo__complete todo__element todo__modifier">✓</div>
                <div id="delete-${this.id}" class="todo__delete todo__element todo__modifier">╳</div>
            </li>
        `);
    }

    convertCompleteToDOM(){
        return $(`
            <li id="${this.id}" class="todo completed">
                <div class="todo__name todo__element">${this.name}</div>
                <div class="todo__delete todo__element todo__modifier">╳</div>
            </li>

        `);
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