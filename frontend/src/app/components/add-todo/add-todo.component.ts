import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../../Todo';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent implements OnInit {

  text: string;
  showAddTask: boolean;
  subscription: Subscription;

  @Output()
  onAddTodo: EventEmitter<Todo> = new EventEmitter();
  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => (this.showAddTask = value));
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.text){
      alert('Please add a task!')
      return;
    }
    const newTodo = {
      task: this.text
    }

    this.onAddTodo.emit(newTodo);

    this.text = '';
  }
}
