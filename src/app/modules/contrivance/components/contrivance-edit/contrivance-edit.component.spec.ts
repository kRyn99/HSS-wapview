import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrivanceEditComponent } from './contrivance-edit.component';

describe('ContrivanceEditComponent', () => {
  let component: ContrivanceEditComponent;
  let fixture: ComponentFixture<ContrivanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrivanceEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrivanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
