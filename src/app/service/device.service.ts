import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Device} from '../model/Device';
import {HttpClient} from '@angular/common/http';
import {Sensor} from '../model/Sensor';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  public getAllDevices(): Observable<Device[]> {
    return this.http.get<Device[]>('/api/device');
  }
  public deleteDevice(id: number): Observable<Device[]> {
    return this.http.delete<Device[]>(`/api/device/${id}`);
  }
  public editDevice(device: Device): Observable<Device[]>
  {
    return this.http.put<Device[]>('/api/device', device);
  }

  public addDevice(device: Device): Observable<Device[]>
  {
    return this.http.post<Device[]>('/api/device', device);
  }
  public getAllDevicesOfUser(username: string): Observable<Device[]> {
    return this.http.get<Device[]>(`/api/device/user/${username}`);
  }
  public getDevicesWithoutUsers(): Observable<Device[]> {
      return this.http.get<Device[]>('/api/device/not-assigned');
  }
}
