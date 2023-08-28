import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer-nav-no-fix',
  templateUrl: './footer-nav-no-fix.component.html',
  styleUrls: ['./footer-nav-no-fix.component.scss']
})
export class FooterNavNoFixComponent implements OnInit {

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
