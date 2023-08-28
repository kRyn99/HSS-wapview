import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLoginToRedirectComponent } from './auto-login-to-redirect.component';

describe('AutoLoginToRedirectComponent', () => {
  let component: AutoLoginToRedirectComponent;
  let fixture: ComponentFixture<AutoLoginToRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoLoginToRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoLoginToRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
