import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() model: any;
  @Input() editInfoBtn: boolean;
  @Input() more = false;
  @Input() contact = false;
  @Output() select = new EventEmitter<any>();
  maxWidth: number = 320;

  constructor() {
    this.maxWidth = window.innerWidth;
  }

  ngOnInit() {
  }

  onClick() {
    this.select.emit(this.model);
  }

  handleEditInfo() {

  }
}
