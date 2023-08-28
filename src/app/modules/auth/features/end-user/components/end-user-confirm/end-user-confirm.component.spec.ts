import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUserConfirmComponent } from './end-user-confirm.component';

describe('EndUserConfirmComponent', () => {
  let component: EndUserConfirmComponent;
  let fixture: ComponentFixture<EndUserConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndUserConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndUserConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
