import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOutsideAuthorComponent } from './edit-outside-author.component';

describe('EditOutsideAuthorComponent', () => {
  let component: EditOutsideAuthorComponent;
  let fixture: ComponentFixture<EditOutsideAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOutsideAuthorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOutsideAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
