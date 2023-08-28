import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldCalendaComponent } from './input-field-calenda.component';

describe('InputFieldCalendaComponent', () => {
  let component: InputFieldCalendaComponent;
  let fixture: ComponentFixture<InputFieldCalendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputFieldCalendaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldCalendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
