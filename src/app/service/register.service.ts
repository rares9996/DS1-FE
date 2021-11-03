import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {HttpClient} from '@angular/common/http';
import {Device} from '../model/Device';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  public register(username: string, password: string, name: string,
                  address: string, birthdayDate: string,
                  roles: string[], devices: Device[]): Observable<User> {
    return this.http.post<User>('/api/register', {
      name,
      address,
      birthdayDate,
      username,
      password,
      roles,
      devices
    });
  }
}
