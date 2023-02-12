import { ChangeEvent } from 'react';
import UserStore from '../store/UserStore';
import TodoStore from '../store/TodoStore';
import FormsStore from '../store/FormsStore';
import { FormName } from '../constants';

export type IUserStore = UserStore;
export type ITodoStore = TodoStore;
export type IFormsStore = FormsStore;

export interface IMainStore {
  userStore: IUserStore;
  todoStore: ITodoStore;
  formsStore: IFormsStore;
}

export type IFormName = FormName;

export interface ITodoFormData {
  id: string | null;
  title: string;
  userName: string;
  email: string;
  isDone: boolean;
  isEdited: boolean;
}

export interface ISignInFormData {
  login: string;
  password: string;
}

export interface IInputsForValidate {
  [key: string]: string[];
}

export interface IInputElem {
  name: string;
  type: string;
  handler: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  autofocus?: boolean;
  value?: string;
  errorMsg?: string;
  isDone?: boolean;
}

export interface IBooleans {
  [key: string]: boolean;
}
