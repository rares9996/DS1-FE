import {Device} from './Device';

export interface User
{
  id: number;
  name: string;
  address: string;
  birthdayDate: string;
  username: string;
  roles: string[];
  devices: Device[];
  jwt: string;
}
