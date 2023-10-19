import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrivanceListNewComponent } from './contrivance-list-new.component';

describe('ContrivanceListNewComponent', () => {
  let component: ContrivanceListNewComponent;
  let fixture: ComponentFixture<ContrivanceListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrivanceListNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrivanceListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
