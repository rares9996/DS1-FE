import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {AdminService} from '../../service/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
