import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public error: any;
  add(error: any) {
    this.error = error;
  }

  clear() {
    this.error = null;
  }

}
