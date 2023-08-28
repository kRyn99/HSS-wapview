import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInEndUserComponent } from './sign-in-end-user.component';

describe('SignInEndUserComponent', () => {
  let component: SignInEndUserComponent;
  let fixture: ComponentFixture<SignInEndUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInEndUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInEndUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
