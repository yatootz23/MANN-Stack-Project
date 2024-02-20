import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  host = 'http://localhost:3000/todo';

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.host);
  }

  deleteTodo(todo: Todo): Observable<Todo>{
    const url = `${this.host}/${todo._id}`;
    return this.http.delete<Todo>(url);
  }

  updateStatus(todo: Todo): Observable<Todo>{
    const url = `${this.host}/${todo._id}/status`;
    return this.http.post<Todo>(url,todo);
  }

  addTodo(todo:Todo): Observable<Todo>{
    return this.http.post<Todo>(this.host, todo);
  }
}
