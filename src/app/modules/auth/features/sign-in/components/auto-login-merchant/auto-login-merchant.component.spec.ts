import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLoginMerchantComponent } from './auto-login-merchant.component';

describe('AutoLoginMerchantComponent', () => {
  let component: AutoLoginMerchantComponent;
  let fixture: ComponentFixture<AutoLoginMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoLoginMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoLoginMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
