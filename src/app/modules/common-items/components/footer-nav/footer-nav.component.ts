import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class FooterNavComponent implements OnInit {

  @Input() submitDisabled: boolean;
	@Input() label: string;
  @Output() handleSubmit = new EventEmitter<any>();
	@Input() customStyle: string;

  constructor() { }

  ngOnInit() {
  }

  handleSubmitEvent(){
    this.handleSubmit.emit();
  }

}
