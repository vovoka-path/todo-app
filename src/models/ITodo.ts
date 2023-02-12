import { InputName } from '../constants';

export interface ITodo {
  [InputName.Id]: string | null;
  [InputName.UserName]: string;
  [InputName.Email]: string;
  [InputName.Title]: string;
  [InputName.IsDone]: boolean;
  [InputName.IsEdited]: boolean;
}
