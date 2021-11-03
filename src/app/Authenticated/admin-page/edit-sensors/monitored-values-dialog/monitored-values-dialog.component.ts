import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MonitoredValue} from '../../../../model/MonitoredValue';

@Component({
  selector: 'app-monitored-values-dialog',
  templateUrl: './monitored-values-dialog.component.html',
  styleUrls: ['./monitored-values-dialog.component.css']
})
export class MonitoredValuesDialogComponent implements OnInit {

  public dataSource: MonitoredValue[] = [];
  public displayedColumns: string[] = ['timestamp', 'value'];
  constructor(
    public dialogRef: MatDialogRef<MonitoredValuesDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.dataSource  = this.data.element.monitoredValue;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
