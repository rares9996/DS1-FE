import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/user');
  }

  public getUserByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`/api/user/${username}`);
  }
}
