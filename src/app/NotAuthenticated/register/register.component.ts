import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isAdmin = false;

  constructor(private registerService: RegisterService) {
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    birth_date: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  submit(): void {
    const {name, birthdayDate, address, username, password} = this.form.value;
    const roles: string[] = [];
    if (this.isAdmin) {
      roles.push('ADMIN');
    } else {
      roles.push('USER');
    }
    this.registerService.register(username, password, name, address, birthdayDate, roles, []).subscribe();
  }

}
