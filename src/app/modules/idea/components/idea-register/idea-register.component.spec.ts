import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaRegisterComponent } from './idea-register.component';

describe('IdeaRegisterComponent', () => {
  let component: IdeaRegisterComponent;
  let fixture: ComponentFixture<IdeaRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
