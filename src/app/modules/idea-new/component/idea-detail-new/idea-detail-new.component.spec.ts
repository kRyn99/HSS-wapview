import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaDetailNewComponent } from './idea-detail-new.component';

describe('IdeaDetailNewComponent', () => {
  let component: IdeaDetailNewComponent;
  let fixture: ComponentFixture<IdeaDetailNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaDetailNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaDetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
