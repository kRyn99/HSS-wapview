import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerPopupComponent } from './picker-popup.component';

describe('PickerPopupComponent', () => {
  let component: PickerPopupComponent;
  let fixture: ComponentFixture<PickerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
