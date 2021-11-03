import {Component, Input, OnInit} from '@angular/core';
import {Device} from '../../../model/Device';
import {AdminService} from '../../../service/admin.service';
import {Sensor} from '../../../model/Sensor';
import {DeviceService} from '../../../service/device.service';
import {UpdateDeviceComponent} from './update-device/update-device.component';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../../service/token-storage.service';
import {MonitoredValuesDialogComponent} from '../edit-sensors/monitored-values-dialog/monitored-values-dialog.component';
import {DeviceHistoryComponent} from './device-history/device-history.component';

@Component({
  selector: 'app-edit-devices',
  templateUrl: './edit-devices.component.html',
  styleUrls: ['./edit-devices.component.css']
})
export class EditDevicesComponent implements OnInit {

  constructor(private deviceService: DeviceService, private dialog: MatDialog, private tokenStorage: TokenStorageService) {
  }

  public displayedColumns: string[] = ['description', 'address', 'maximumEnergyConsumption',
    'averageEnergyConsumption', 'sensor', 'delete'];
  public dataSource: Device[] = [];
  @Input()
  public isAdmin = true;

  ngOnInit(): void {
    this.getAllDevices();
  }

  private getAllDevices(): void {
    if (this.isAdmin) {
      this.deviceService.getAllDevices().subscribe((data) => {
        this.dataSource = data;
      });
    } else {
      this.deviceService.getAllDevicesOfUser(this.tokenStorage.getUser().username).subscribe((data) => {
        this.dataSource = data;
      });
    }
  }

  public calculateTotalDeviceConsumption(sensor: Sensor): number {
    let totalConsumption = 0;
    for (const monitoredValue of sensor.monitoredValue) {
      totalConsumption += monitoredValue.energyConsumption;
    }
    return totalConsumption;
  }

  public deleteDevice(id: number): void {
    this.deviceService.deleteDevice(id).subscribe(() => {
      this.getAllDevices();
    });
  }

  public editDevice(element: Device): void {
    const dialogRef = this.dialog.open(UpdateDeviceComponent, {
      width: '50%',
      height: '50%',
      data: {element, title: 'Edit Device'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deviceService.editDevice(result.element).subscribe();
        this.getAllDevices();
      }
    });
  }

  public addDevice(): void {
    const dialogRef = this.dialog.open(UpdateDeviceComponent, {
      width: '50%',
      height: '50%',
      data: {title: 'Add Device'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deviceService.addDevice(result.element).subscribe();
        this.getAllDevices();
      }
    });
  }

  public makeHistoryOfDevice(device: Device): any {
    this.dialog.open(DeviceHistoryComponent, {
      width: '50%',
      height: '50%',
      data: {element: this.createHistoryValues(device)}
    });
  }

  private createHistoryValues(device: Device): any {
    const historyValues = {};
    if (!device.sensor) {
      return historyValues;
    }
    for (const monitoredValues of device.sensor?.monitoredValue) {
      // @ts-ignore
      if (!historyValues[monitoredValues.timestamp.split('T')[0]]) {
        // @ts-ignore
        historyValues[monitoredValues.timestamp.split('T')[0]] = 0;
      }
      // @ts-ignore
      historyValues[monitoredValues.timestamp.split('T')[0]] += monitoredValues.energyConsumption;
    }
    return historyValues;
  }

}
