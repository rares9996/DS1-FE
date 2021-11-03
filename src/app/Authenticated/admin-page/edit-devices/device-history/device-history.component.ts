import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MonitoredValue} from '../../../../model/MonitoredValue';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.css']
})
export class DeviceHistoryComponent implements OnInit {

  public dataSource: string[] = [];
  public displayedColumns: string[] = ['timestamp', 'value'];
  constructor(
    public dialogRef: MatDialogRef<DeviceHistoryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.dataSource  = Object.keys(this.data.element);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
