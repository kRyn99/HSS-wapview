import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDuplicateComponent } from './check-duplicate.component';

describe('AddInsideAuthorComponent', () => {
  let component: CheckDuplicateComponent;
  let fixture: ComponentFixture<CheckDuplicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckDuplicateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
