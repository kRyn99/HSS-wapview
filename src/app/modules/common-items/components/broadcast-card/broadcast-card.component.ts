import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-broadcast-card',
  templateUrl: './broadcast-card.component.html',
  styleUrls: ['./broadcast-card.component.scss']
})
export class BroadcastCardComponent implements OnInit {

  @Input() model: any;
  @Output() select = new EventEmitter<any>();

  transTime: any;

  constructor() { }

  ngOnInit() {
    if (this.model.createDatetime){
      // const arrDateTime = this.model.createDatetime.split('T');
      this.transTime = this.model.createDatetime.split('T')[1].split('.')[0];
    }
    // this.transTime = this.model.transTime.toLocaleTimeString();
  }

  onClick() {
    this.select.emit(this.model);
  }

}
