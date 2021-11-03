import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Sensor} from '../model/Sensor';
import {HttpClient} from '@angular/common/http';
import {Device} from '../model/Device';
import {MonitoredValue} from '../model/MonitoredValue';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) {
  }

  public getAllSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>('/api/sensor');
  }
  public deleteDevice(id: number): Observable<Sensor[]> {
    return this.http.delete<Sensor[]>(`/api/sensor/${id}`);
  }

  public editDevice(sensor: Sensor): Observable<Sensor> {
    return this.http.put<Sensor>(`/api/sensor`, sensor);
  }

  public addDevice(sensor: Sensor): Observable<Sensor> {
    return this.http.post<Sensor>(`/api/sensor`, sensor);
  }
  public getSensorsWithoutDevice(): Observable<Sensor[]>
  {
    return this.http.get<Sensor[]>('/api/sensor/not-assigned');
  }

  public getAllSensorsOfUser(username: string): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`/api/sensor/user/${username}`);
  }
}
