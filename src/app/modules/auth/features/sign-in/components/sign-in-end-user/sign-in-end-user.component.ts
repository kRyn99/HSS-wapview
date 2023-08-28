import {Component, OnInit} from '@angular/core';
import {CallbackService} from '@app/modules/auth/service/call-back.service';

@Component({
  selector: 'app-sign-in-end-user',
  templateUrl: './sign-in-end-user.component.html',
  styleUrls: ['./sign-in-end-user.component.scss']
})
export class SignInEndUserComponent implements OnInit {

  constructor(
      private callbackService: CallbackService
  ) {
    this.callbackService.directLoginUniId();
  }

  ngOnInit(): void {
  }

}
