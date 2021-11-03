import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredValuesDialogComponent } from './monitored-values-dialog.component';

describe('MonitoredValuesDialogComponent', () => {
  let component: MonitoredValuesDialogComponent;
  let fixture: ComponentFixture<MonitoredValuesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoredValuesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoredValuesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
