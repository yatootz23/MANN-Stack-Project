import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../Todo';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent implements OnInit {

  faTimes = faTimes;
  @Input()
  todo!: Todo;
  @Output()
  onDeleteTodo: EventEmitter<Todo> = new EventEmitter();
  @Output()
  onToggleStatus: EventEmitter<Todo> = new EventEmitter();
  constructor() {
    
  }
  ngOnInit(): void {
  }

  onDelete(todo: Todo){
    this.onDeleteTodo.emit(todo);
  }

  onToggle(todo: Todo){
    this.onToggleStatus.emit(todo);
  }
}
