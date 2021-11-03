import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from '../../../service/admin.service';
import {User} from '../../../model/User';
import {UserService} from '../../../service/user.service';
import {UpdateDeviceComponent} from '../edit-devices/update-device/update-device.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateUserComponent} from './update-user/update-user.component';
import {UpdateSensorComponent} from '../edit-sensors/update-sensor/update-sensor.component';
import {RegisterService} from '../../../service/register.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  constructor(private userService: UserService, private dialog: MatDialog, private registerService: RegisterService) {
  }

  public displayedColumns: string[] = ['name', 'address', 'birthdayDate', 'username', 'devices', 'delete'];
  public dataSource: User[] = [];
  @Input()
  public isAdmin = true;

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.dataSource = data;
    });
  }

  public deleteUser(username: string): void {
    this.userService.deleteUser(username).subscribe(() => {
      this.getAllUsers();
    });
  }

  public editUser(element: User): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: 'max-content',
      data: {element, title: 'Edit User'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.editUser(result.element).subscribe(() => {
          this.getAllUsers();
        });
      }
    });
  }

  public addUser(): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: 'max-content',
      data: {title: 'Register'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const {name, birthdayDate, address, username, password, devices} = result.element;
        const roles: string[] = [];
        roles.push('ADMIN');
        this.registerService.register(username, password, name, address, birthdayDate, roles, devices).subscribe(() => {
          this.getAllUsers();
        });
      }
    });
  }
}
