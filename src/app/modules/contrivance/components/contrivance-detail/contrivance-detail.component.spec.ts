import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrivanceDetailComponent } from './contrivance-detail.component';

describe('ContrivanceDetailComponent', () => {
  let component: ContrivanceDetailComponent;
  let fixture: ComponentFixture<ContrivanceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrivanceDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrivanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
