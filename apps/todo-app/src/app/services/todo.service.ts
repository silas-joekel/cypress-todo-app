import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const initialTodos: Todo[] = [
  {
    id: 1,
    text: 'First Todo Item',
    done: false,
  },
  {
    id: 2,
    text: 'Clean second street',
    done: false,
  },
  {
    id: 3,
    text: 'Fly you fools!',
    done: false,
  },
  {
    id: 4,
    text: 'Develop Angular App',
    done: true,
  },
  {
    id: 5,
    text: 'Stop being sad and be awesome instead',
    done: false,
  },
  {
    id: 6,
    text: 'Learn GraphQl',
    done: false,
  },
  {
    id: 7,
    text: 'Create a list of todos that makes absolutely no sense',
    done: true,
  },
  {
    id: 8,
    text: 'a²+b²=c²',
    done: true,
  },
  {
    id: 9,
    text: 'Johnny be good',
    done: false,
  },
  {
    id: 10,
    text: 'Meet Galactic President Superstar McAwesomeville',
    done: true,
  },
];

@Injectable()
export class TodoService {
  #todoCounter = initialTodos.length;
  #todos = new BehaviorSubject<Todo[]>(initialTodos);

  todos$ = this.#todos.asObservable();

  constructor(private readonly userService: UserService) {}

  createTodo(text: string): void {
    if (this.userService.getUser() !== 'Admin')
      throw new Error('Only Admins can create Todo objects');

    const newTodo = {
      id: ++this.#todoCounter,
      text,
      done: false,
    };

    this.#todos.next(this.#todos.value.concat(newTodo));
  }

  deleteTodo(id: number): void {
    if (this.userService.getUser() !== 'Admin')
      throw new Error('Only Admins can delete Todo items');

    const todoIndex = this.#todos.value.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) throw new Error(`No Todo with id ${id} found`);

    this.#todos.next(this.#todos.value.filter((todo) => todo.id !== id));
  }

  toggleTodoDone(id: number): void {
    if (this.userService.getUser() === 'Guest')
      throw new Error('Guests cannot toggle done status of todo items');

    this.#todos.next(
      this.#todos.value.map((todo) =>
        todo.id !== id
          ? todo
          : {
              ...todo,
              done: !todo.done,
            }
      )
    );
  }

  updateTodoText(id: number, text: string): void {
    if (this.userService.getUser() !== 'Admin')
      throw new Error('Only Admins can update Todo item text');

    this.#todos.next(
      this.#todos.value.map((todo) =>
        todo.id !== id
          ? todo
          : {
              ...todo,
              text,
            }
      )
    );
  }
}
