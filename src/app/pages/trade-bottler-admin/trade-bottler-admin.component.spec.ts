import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeBottlerAdminComponent } from './trade-bottler-admin.component';

describe('TradeBottlerAdminComponent', () => {
  let component: TradeBottlerAdminComponent;
  let fixture: ComponentFixture<TradeBottlerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeBottlerAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeBottlerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
