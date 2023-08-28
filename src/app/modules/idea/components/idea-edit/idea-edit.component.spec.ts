import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaEditComponent } from './idea-edit.component';

describe('IdeaEditComponent', () => {
  let component: IdeaEditComponent;
  let fixture: ComponentFixture<IdeaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
