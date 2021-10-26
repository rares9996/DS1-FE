import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Observable} from 'rxjs';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', {
      username,
      password
    });
  }

  public handleLogin(data: User, isAdmin: boolean): void{
    this.tokenStorage.saveToken(data.jwt);
    this.tokenStorage.saveUser(data);

    this.tokenStorage.login(isAdmin);

  }

  public logout(): void {
    this.http.post<any>('api/logout', null)
      .subscribe(() => this.tokenStorage.signOut());
  }

}
