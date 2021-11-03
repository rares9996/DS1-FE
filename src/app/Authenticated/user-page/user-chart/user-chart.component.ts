import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {UserService} from '../../../service/user.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {MonitoredValue} from '../../../model/MonitoredValue';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [{data: Array(23).fill(0), label: 'kWh'}];
  public total = 0;
  public today = new Date();

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 24; i++) {
      this.barChartLabels.push(i.toString());
    }
    this.userService.getMonitoredData(this.tokenStorage.getUser().username).subscribe((data) => this.createChart(data));
  }

  private createChart(data: MonitoredValue[]): void {
    for (const monitoredValue of data) {
      // @ts-ignore
      this.barChartData[0].data[new Date(monitoredValue.timestamp).getHours()]++;
      this.total++;
    }
  }

}
