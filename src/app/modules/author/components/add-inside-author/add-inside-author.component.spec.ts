import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsideAuthorComponent } from './add-inside-author.component';

describe('AddInsideAuthorComponent', () => {
  let component: AddInsideAuthorComponent;
  let fixture: ComponentFixture<AddInsideAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInsideAuthorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInsideAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
