import {Sensor} from './Sensor';

export interface Device {
  id: number;
  description: string;
  address: string;
  maximumEnergyConsumption: number;
  averageEnergyConsumption: number;
  sensor: Sensor;
}
