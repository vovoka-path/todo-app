import { InputName } from '../constants';

export interface IUser {
  [InputName.Login]: string;
  [InputName.Password]: string;
}
