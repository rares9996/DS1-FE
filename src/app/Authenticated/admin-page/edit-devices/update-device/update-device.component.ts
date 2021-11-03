import {Component, Inject, OnChanges, OnInit, Optional} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SensorService} from '../../../../service/sensor.service';
import {Sensor} from '../../../../model/Sensor';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css']
})
export class UpdateDeviceComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    maximumEnergyConsumption: new FormControl(0),
    averageEnergyConsumption: new FormControl(0),
    sensor: new FormControl(null, Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateDeviceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private sensorService: SensorService) {
  }

  public availableSensors: Sensor[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.element) {
      this.form.setValue({
        description: this.data.element.description,
        address: this.data.element.address,
        maximumEnergyConsumption: this.data.element.maximumEnergyConsumption,
        averageEnergyConsumption: this.data.element.averageEnergyConsumption,
        sensor: this.data.element.sensor,
      });
    }
    this.sensorService.getSensorsWithoutDevice().subscribe((data) => {
      this.availableSensors = data;
      if (this.data.element && this.data.element.sensor) {
        this.availableSensors.push(this.data.element.sensor);
      }
    });
  }
  submit(): void {
    const {description, address, maximumEnergyConsumption, averageEnergyConsumption, sensor} = this.form.value;
    if (!this.data.element)
    {
      this.data.element = {id: undefined};
    }
    this.data.element.description = description;
    this.data.element.address = address;
    this.data.element.maximumEnergyConsumption = maximumEnergyConsumption;
    this.data.element.averageEnergyConsumption = averageEnergyConsumption;
    this.data.element.sensor = sensor;

    this.dialogRef.close(this.data);
  }

}
