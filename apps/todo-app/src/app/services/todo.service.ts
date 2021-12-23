import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";

export type Todo = {
    id: number;
    text: string;
    done: boolean;
}

@Injectable()
export class TodoService {
    #todoCounter = 0;
    #todos = new BehaviorSubject<Todo[]>([{id: 0, text: 'some text for a todo item', done: false}]);

    todos$ = this.#todos.asObservable();

    constructor(private readonly userService: UserService) {}

    createTodo(text: string): void {
        if (this.userService.getUser() !== 'Admin')
            throw new Error('Only Admins can create Todo objects');

        const newTodo = {
            id: ++this.#todoCounter,
            text,
            done: false,
        }

        this.#todos.next(this.#todos.value.concat(newTodo));
    }

    deleteTodo(id: number): void {
        if (this.userService.getUser() !== 'Admin')
            throw new Error('Only Admins can delete Todo items');

        const todoIndex = this.#todos.value.findIndex(todo => todo.id === id);

        if (todoIndex === -1)
            throw new Error(`No Todo with id ${id} found`);

        this.#todos.next(this.#todos.value.filter(todo => todo.id !== id));
    }

    toggleTodoDone(id: number): void {
        if (this.userService.getUser() === 'Guest')
            throw new Error('Guests cannot toggle done status of todo items');

        this.#todos.next(this.#todos.value.map(todo => todo.id !== id ? todo : {
            ...todo,
            done: !todo.done
        }))
    }

    updateTodoText(id: number, text: string): void {
        if (this.userService.getUser() !== 'Admin')
            throw new Error('Only Admins can update Todo item text');

            this.#todos.next(this.#todos.value.map(todo => todo.id !== id ? todo : {
                ...todo,
                text
            }))
    }
}