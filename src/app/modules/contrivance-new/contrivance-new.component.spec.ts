import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrivanceNewComponent } from './contrivance-new.component';

describe('ContrivanceNewComponent', () => {
  let component: ContrivanceNewComponent;
  let fixture: ComponentFixture<ContrivanceNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrivanceNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrivanceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
