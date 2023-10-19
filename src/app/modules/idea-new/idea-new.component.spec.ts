import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaNewComponent } from './idea-new.component';

describe('IdeaNewComponent', () => {
  let component: IdeaNewComponent;
  let fixture: ComponentFixture<IdeaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
