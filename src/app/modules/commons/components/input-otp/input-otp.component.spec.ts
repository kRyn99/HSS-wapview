import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOtpComponent } from './input-otp.component';

describe('InputOtpComponent', () => {
  let component: InputOtpComponent;
  let fixture: ComponentFixture<InputOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputOtpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
