import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  public name?: string;
  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.name = this.tokenStorage.getUser().name;
  }

}
