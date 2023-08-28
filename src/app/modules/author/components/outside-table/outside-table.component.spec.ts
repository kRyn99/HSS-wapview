import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsideTableComponent } from './outside-table.component';

describe('OutsideTableComponent', () => {
  let component: OutsideTableComponent;
  let fixture: ComponentFixture<OutsideTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutsideTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutsideTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
