import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) {
    this.name = this.tokenStorage.getUser().name;
  }
  public name?: string;
  ngOnInit(): void {
  }

}
