import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrivanceListComponent } from './contrivance-list.component';

describe('ContrivanceListComponent', () => {
  let component: ContrivanceListComponent;
  let fixture: ComponentFixture<ContrivanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrivanceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrivanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
