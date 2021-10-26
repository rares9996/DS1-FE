import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  public register(username: string, password: string, name: string,
                  address: string, birthdayDate: string,
                  roles: string[]): Observable<User> {
    return this.http.post<User>('/api/register', {
      name,
      address,
      birthdayDate,
      username,
      password,
      roles
    });
  }
}
