import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaListNewComponent } from './idea-list-new.component';

describe('IdeaListNewComponent', () => {
  let component: IdeaListNewComponent;
  let fixture: ComponentFixture<IdeaListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaListNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
