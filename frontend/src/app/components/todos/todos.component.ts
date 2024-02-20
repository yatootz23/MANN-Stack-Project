import { Component, OnInit } from '@angular/core';
import {Todo} from '../../Todo';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  
  constructor(private todoService: TodoService) {
    
  }

  ngOnInit(): void {
      this.todoService.getAllTodos().subscribe((todos) =>(this.todos = todos));
  }

  deleteTodo(todo: Todo){
    this.todoService.deleteTodo(todo).subscribe(() =>(this.todos = this.todos.filter(t => t._id !== todo._id)));
  }

  toggleStatus(todo: Todo){
    todo.status =!todo.status;
    this.todoService.updateStatus(todo).subscribe();
  }

  addTodo(todo: Todo){
    this.todoService.addTodo(todo).subscribe((todo) =>(this.todos.push(todo)));
  }
}
