import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutsideAuthorComponent } from './add-outside-author.component';

describe('AddOutsideAuthorComponent', () => {
  let component: AddOutsideAuthorComponent;
  let fixture: ComponentFixture<AddOutsideAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutsideAuthorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutsideAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
