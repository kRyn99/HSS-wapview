import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusColorComponent } from './status-color.component';

describe('StatusColorComponent', () => {
  let component: StatusColorComponent;
  let fixture: ComponentFixture<StatusColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
