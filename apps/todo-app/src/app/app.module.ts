import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [TodoService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
