import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeviceService} from '../../../../service/device.service';
import {Device} from '../../../../model/Device';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  public availableDevices: Device[] = [];
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    birth_date: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    devices: new FormControl(null),
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private deviceService: DeviceService) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.element) {
      this.form.setValue({
        name: this.data.element.name,
        birth_date: this.data.element.birthdayDate,
        address: this.data.element.address,
        username: this.data.element.username,
        devices: this.data.element.devices,
        password: '',
      });
      this.form.get('password')?.setValidators([]);
    }
    this.deviceService.getDevicesWithoutUsers().subscribe((data) => {
      this.availableDevices = data;
      if (this.data.element) {
        this.data.element.devices.forEach((device: Device) => {
          this.availableDevices.push(device);
        });
      }
    });
  }

  submit(): void {
    const {name, birth_date, address, username, password, devices} = this.form.value;
    const roles: string[] = [];
    roles.push('ADMIN');
    roles.push('USER');
    if (!this.data.element)
    {
      this.data.element = {id: undefined};
    }
    this.data.element.name = name;
    this.data.element.birthdayDate = birth_date;
    this.data.element.address = address;
    this.data.element.address = address;
    this.data.element.username = username;
    this.data.element.password = password;
    this.data.element.devices = devices;
    this.dialogRef.close(this.data);
  }

}
