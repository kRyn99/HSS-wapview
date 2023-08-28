import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorBoxComponent } from './calculator-box.component';

describe('CalculatorBoxComponent', () => {
  let component: CalculatorBoxComponent;
  let fixture: ComponentFixture<CalculatorBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
