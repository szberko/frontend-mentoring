import {Utils} from './utils.js';

export class Todo{
    constructor(name, orderNumber, completed, app){
        this.id = Utils.create_UUID();
        this.name = name;
        this.orderNumber = orderNumber;
        this.completed = completed;
        this.app = app;
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

