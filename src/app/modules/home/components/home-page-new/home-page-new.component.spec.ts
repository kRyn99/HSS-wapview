import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageNewComponent } from './home-page-new.component';

describe('HomePageNewComponent', () => {
  let component: HomePageNewComponent;
  let fixture: ComponentFixture<HomePageNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
