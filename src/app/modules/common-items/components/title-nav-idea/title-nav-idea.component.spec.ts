import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleNavIdeaComponent } from './title-nav-idea.component';

describe('TitleNavIdeaComponent', () => {
  let component: TitleNavIdeaComponent;
  let fixture: ComponentFixture<TitleNavIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleNavIdeaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleNavIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
