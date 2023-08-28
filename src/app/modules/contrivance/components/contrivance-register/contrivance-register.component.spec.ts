import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrivanceRegisterComponent } from './contrivance-register.component';

describe('ContrivanceRegisterComponent', () => {
  let component: ContrivanceRegisterComponent;
  let fixture: ComponentFixture<ContrivanceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrivanceRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrivanceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
