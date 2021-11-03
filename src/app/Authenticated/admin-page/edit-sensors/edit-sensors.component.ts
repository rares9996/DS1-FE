import {Component, Input, OnInit} from '@angular/core';
import {Sensor} from '../../../model/Sensor';
import {SensorService} from '../../../service/sensor.service';
import {Device} from '../../../model/Device';
import {UpdateDeviceComponent} from '../edit-devices/update-device/update-device.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateSensorComponent} from './update-sensor/update-sensor.component';
import {MonitoredValuesDialogComponent} from './monitored-values-dialog/monitored-values-dialog.component';
import {TokenStorageService} from '../../../service/token-storage.service';

@Component({
  selector: 'app-edit-sensors',
  templateUrl: './edit-sensors.component.html',
  styleUrls: ['./edit-sensors.component.css']
})
export class EditSensorsComponent implements OnInit {

  constructor(private sensorService: SensorService, private dialog: MatDialog, private tokenStorage: TokenStorageService) {
  }

  public displayedColumns: string[] = ['description', 'maximumValue', 'monitoredValue', 'delete'];
  public dataSource: Sensor[] = [];
  @Input()
  public isAdmin = true;

  ngOnInit(): void {
    this.getAllSensors();
  }

  private getAllSensors(): void {
    if (this.isAdmin) {
      this.sensorService.getAllSensors().subscribe((data) => {
        this.dataSource = data;
      });
    } else {
      this.sensorService.getAllSensorsOfUser(this.tokenStorage.getUser().username).subscribe((data) => {
        this.dataSource = data;
      });
    }
  }

  public deleteSensor(id: number): void {
    this.sensorService.deleteDevice(id).subscribe(() => {
      this.getAllSensors();
    });
  }

  public editSensor(element: Sensor): void {
    const dialogRef = this.dialog.open(UpdateSensorComponent, {
      width: '50%',
      height: '50%',
      data: {element, title: 'Edit Sensor'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sensorService.editDevice(result.element).subscribe(() => {
          this.getAllSensors();
        });
      }
    });
  }

  addSensor(): void {
    const dialogRef = this.dialog.open(UpdateSensorComponent, {
      width: '50%',
      height: '50%',
      data: {title: 'Add Sensor'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sensorService.addDevice(result.element).subscribe();
        this.getAllSensors();
      }
    });
  }

  viewMonitoredValues(element: Sensor): void {
    this.dialog.open(MonitoredValuesDialogComponent, {
      width: '50%',
      height: '50%',
      data: {element}
    });
  }
}
