import { ChangeEvent } from 'react';
import UserStore from '../store/UserStore';
import TodoStore from '../store/TodoStore';
import FormsStore from '../store/FormsStore';

export type IUserStore = UserStore;
export type ITodoStore = TodoStore;
export type IFormsStore = FormsStore;
export type ITodoFormKeys = 'id' | 'title' | 'userName' | 'email' | 'isDone' | 'isEdited';
export type ISignInFormKeys = 'login' | 'password';
export type TodoType = {
  id: string | null;
  title: string;
  userName: string;
  email: string;
  isDone: boolean;
  isEdited: boolean;
};

export interface IMainStore {
  userStore: IUserStore;
  todoStore: ITodoStore;
  formsStore: IFormsStore;
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

export interface ITodoFormData {
  id: string | null;
  title: string;
  userName: string;
  email: string;
  isDone: boolean;
  isEdited: boolean;
}

export interface IFormDataKeys {
  [key: string]: string | boolean | null;
}

export interface ISignInFormData {
  login: string;
  password: string;
}

export interface IIsValidate {
  [key: string]: boolean;
}
