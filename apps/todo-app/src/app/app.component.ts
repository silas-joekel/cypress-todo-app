import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { User, UserService } from './services/user.service';

@Component({
  selector: 'cypress-todo-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User = 'Guest';

  todos$ = this.todoService.todos$;

  newTodoText = '';
  
  constructor(private readonly todoService: TodoService, private readonly userService: UserService) {}

  onUserChange(): void {
    switch (this.user) {
      case 'Admin':
        this.userService.loginAsAdmin();
        break;
      case 'User':
        this.userService.loginAsUser();
        break;
      case 'Guest':
      default:
        this.userService.logout();
        break;
    }
  }

  toggleTodoDone(id: number): void {
    this.todoService.toggleTodoDone(id);
  }

  updateTodoText(id: number, text: string): void {
    this.todoService.updateTodoText(id, text);
  }

  createTodo(text: string): void {
    this.todoService.createTodo(text);
    this.newTodoText = '';
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}
