import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit{

  OnClick() {
    this.btnClick.emit();
  }

  @Input()
  text?: string;
  @Input()
  color?: string;
  @Output()
  btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
      
  }
}
