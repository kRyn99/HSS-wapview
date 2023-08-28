import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpointHistoryViewComponent } from './upoint-history-view.component';

describe('UpointHistoryViewComponent', () => {
  let component: UpointHistoryViewComponent;
  let fixture: ComponentFixture<UpointHistoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpointHistoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpointHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
