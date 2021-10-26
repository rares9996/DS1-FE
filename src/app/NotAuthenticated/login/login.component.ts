import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {
  }

  public error = '';
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  submit(): void {
    const {username, password} = this.form.value;
    this.loginService.login(username, password).subscribe(
      (data) => {
        const isAdmin = (data.roles.indexOf('ADMIN') !== -1);
        this.loginService.handleLogin(data, isAdmin);
      },
      () => {
        this.error = 'Invalid credentials!';
      });
  }

  ngOnInit(): void {
  }

  toRegister(): void {
    this.router.navigate(['/register']);
  }
}
