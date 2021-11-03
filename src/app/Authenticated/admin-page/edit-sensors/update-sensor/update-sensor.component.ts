import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SensorService} from '../../../../service/sensor.service';
import {Sensor} from '../../../../model/Sensor';
import {MonitoredValue} from '../../../../model/MonitoredValue';

@Component({
  selector: 'app-update-sensor',
  templateUrl: './update-sensor.component.html',
  styleUrls: ['./update-sensor.component.css']
})
export class UpdateSensorComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    maximumValue: new FormControl(0),
    monitoredValue: new FormControl([]),
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateSensorComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.element) {
      this.form.setValue({
        description: this.data.element.description,
        maximumValue: this.data.element.maximumValue,
        monitoredValue: this.data.element.monitoredValue,
      });
    }
  }
  submit(): void {
    const {description, maximumValue, monitoredValue} = this.form.value;
    if (!this.data.element)
    {
      this.data.element = {id: undefined};
    }
    this.data.element.description = description;
    this.data.element.maximumValue = maximumValue;
    this.data.element.monitoredValue = monitoredValue;
    this.dialogRef.close(this.data);
  }
}
