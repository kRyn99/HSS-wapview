import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IntegrateTopupComponent} from '@app/modules/auth/features/integrate/components/integrate-topup/integrate-topup.component';

describe('IntegrateTopupComponent', () => {
  let component: IntegrateTopupComponent;
  let fixture: ComponentFixture<IntegrateTopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrateTopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrateTopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
