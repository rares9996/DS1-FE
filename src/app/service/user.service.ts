import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {MonitoredValue} from '../model/MonitoredValue';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/user');
  }
  public deleteUser(username: string): Observable<User[]> {
    return this.http.delete<User[]>(`/api/user/${username}`);
  }
  public getUserByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`/api/user/${username}`);
  }
  public editUser(user: User[]): Observable<User[]>  {
    return this.http.put<User[]>(`/api/user`, user);
  }

  public getMonitoredData(username: string): Observable<MonitoredValue[]>
  {
    return this.http.get<MonitoredValue[]>(`/api/monitored-values/${username}`);
  }
}
