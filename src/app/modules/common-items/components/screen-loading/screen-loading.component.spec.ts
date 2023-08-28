import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLoadingComponent } from './screen-loading.component';

describe('ScreenLoadingComponent', () => {
  let component: ScreenLoadingComponent;
  let fixture: ComponentFixture<ScreenLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
