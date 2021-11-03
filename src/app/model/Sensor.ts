import {MonitoredValue} from './MonitoredValue';

export interface Sensor {
  id: number;
  description: string;
  maximumValue: number;
  monitoredValue: MonitoredValue[];
}
