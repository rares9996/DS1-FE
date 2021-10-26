import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../service/admin.service';
import {User} from '../../../model/User';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  constructor(private adminService: AdminService) {
  }

  public displayedColumns: string[] = ['name', 'address', 'birthdayDate', 'username', 'devices'];
  public dataSource: User[] = [];
  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((data) => this.dataSource = data);
  }

}
