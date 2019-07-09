import {Todo} from './todo.js';

export class Storage{

    static getNonCompletedTodoList(){
        let listOfTodos = this.getListOfTodos()
            .filter(todo => !todo.completed);
        return listOfTodos; 
    }

    static getNonCompletedTodoListSize(){
        return window.localStorage.length;
    }

    static getCompletedTodoList(){
        let listOfTodos = this.getListOfTodos()
            .filter(todo => todo.completed);
        return listOfTodos; 
    }

    static getListOfTodos(){
        return Object.keys(window.localStorage)
        .filter(key => key.startsWith("todo-"))
        .map(key => Todo.createTodoFromJSON(JSON.parse(window.localStorage.getItem(key))));
    }

    static getTodo(todoId){
        return Todo.createTodoFromJSON(JSON.parse(window.localStorage.getItem(todoId)));
    }

    static pushTodo(todo){
        return window.localStorage.setItem(todo.id, JSON.stringify(todo));
    }

    static deleteTodo(todoId){
        window.localStorage.removeItem(todoId);
    }
}