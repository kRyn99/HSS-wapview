/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PickMapComponent } from './pick-map.component';

describe('OtpPopupComponent', () => {
  let component: PickMapComponent;
  let fixture: ComponentFixture<PickMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
