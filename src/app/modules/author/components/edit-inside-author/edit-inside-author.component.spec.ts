import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsideAuthorComponent } from './edit-inside-author.component';

describe('EditInsideAuthorComponent', () => {
  let component: EditInsideAuthorComponent;
  let fixture: ComponentFixture<EditInsideAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsideAuthorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInsideAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
