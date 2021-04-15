import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmBlotterComponent } from './alarm-blotter.component';

describe('AlarmBlotterComponent', () => {
  let component: AlarmBlotterComponent;
  let fixture: ComponentFixture<AlarmBlotterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmBlotterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmBlotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
