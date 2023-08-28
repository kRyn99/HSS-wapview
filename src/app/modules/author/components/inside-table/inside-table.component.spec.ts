import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideTableComponent } from './inside-table.component';

describe('InsideTableComponent', () => {
  let component: InsideTableComponent;
  let fixture: ComponentFixture<InsideTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsideTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsideTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
