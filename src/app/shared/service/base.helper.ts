import { EventEmitter } from '@angular/core';

export interface BaseHelper {

    sendDataToParent(form, response: EventEmitter<any>);

    createForm();
}
