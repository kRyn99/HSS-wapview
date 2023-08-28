import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLoginEndUserComponent } from './auto-login-end-user.component';

describe('AutoLoginEndUserComponent', () => {
  let component: AutoLoginEndUserComponent;
  let fixture: ComponentFixture<AutoLoginEndUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoLoginEndUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoLoginEndUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
