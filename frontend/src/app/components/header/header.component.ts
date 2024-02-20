import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

  showAddTask: boolean = false;
  subscription: Subscription;
  title:string = 'Todo App';

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  ToggleAddTask() {
    this.uiService.toggleAddTodo();
  }
}