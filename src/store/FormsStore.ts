import { makeAutoObservable } from 'mobx';
import { EMAIL_REGEXP, FormName, InputName } from '../constants';
import { ITodo } from '../models/ITodo';
import { IUser } from '../models/IUser';
import { ITodoFormData, ISignInFormData, IBooleans, IFormName, IInputsForValidate } from '../types';

interface IDefault {
  TodoFormData: ITodoFormData;
  SignInFormData: ISignInFormData;
  IsValid: IBooleans;
  IsOpen: IBooleans;
}

const DEFAULT: IDefault = {
  TodoFormData: {
    [InputName.Title]: '',
    [InputName.UserName]: '',
    [InputName.Email]: '',
    [InputName.Id]: null,
    [InputName.IsDone]: false,
    [InputName.IsEdited]: false,
  },
  SignInFormData: {
    [InputName.Login]: '',
    [InputName.Password]: '',
  },
  IsValid: {
    [InputName.Title]: true,
    [InputName.UserName]: true,
    [InputName.Email]: true,
    [InputName.Login]: true,
    [InputName.Password]: true,
  },
  IsOpen: {
    [FormName.NewTodo]: false,
    [FormName.EditTodo]: false,
    [FormName.Signin]: false,
    [FormName.SnackBar]: false,
  },
};

const inputsForValidate: IInputsForValidate = {
  [FormName.NewTodo]: [InputName.Title, InputName.UserName, InputName.Email],
  [FormName.EditTodo]: [InputName.Title],
  [FormName.Signin]: [InputName.Login, InputName.Password],
};

export default class FormsStore {
  todoFormData: ITodoFormData = { ...DEFAULT.TodoFormData };
  signInFormData: ISignInFormData = { ...DEFAULT.SignInFormData };
  isValid: IBooleans = { ...DEFAULT.IsValid };
  isOpen = { ...DEFAULT.IsOpen };
  isSuccessResponse = false;

  constructor() {
    makeAutoObservable(this);
  }

  setDefaultFormData(formName: string) {
    if (formName === (FormName.NewTodo || FormName.EditTodo))
      this.todoFormData = { ...DEFAULT.TodoFormData };
    if (formName === FormName.Signin) this.signInFormData = { ...DEFAULT.SignInFormData };
  }

  setDefaultIsValid() {
    this.isValid = { ...DEFAULT.IsValid };
  }

  setFormData(data: ITodoFormData) {
    this.todoFormData = {
      ...this.todoFormData,
      ...data,
    };
  }

  handle(inputName: string, value: string | boolean) {
    if (inputName in this.todoFormData) {
      this.updateTodoInput(inputName, value as keyof ITodoFormData);
    }
    if (inputName in this.signInFormData) {
      this.updateSigninInput(inputName, value as keyof ISignInFormData);
    }
  }

  updateTodoInput(inputName: string, value: string) {
    this.updateTodoValue(inputName, value);
    this.updateIsValidTodoValue(inputName as keyof ITodoFormData);
  }

  updateTodoValue(inputName: string, value: string | boolean) {
    this.todoFormData = {
      ...this.todoFormData,
      [inputName]: value,
    };
  }

  updateIsValidTodoValue(inputName: keyof ITodoFormData) {
    if (inputName === InputName.Email) {
      this.isValid[inputName] = EMAIL_REGEXP.test(this.todoFormData.email as string);
    } else {
      this.isValid[inputName] = !!this.todoFormData[inputName as keyof ITodoFormData];
    }
  }

  updateSigninInput(inputName: string, value: string) {
    this.updateSignInValue(inputName, value);
    this.updateIsValidSignInValue(inputName as keyof ISignInFormData);
  }

  updateSignInValue(inputName: string, value: string) {
    this.signInFormData = {
      ...this.signInFormData,
      [inputName]: value,
    };
  }

  updateIsValidSignInValue(inputName: keyof ISignInFormData) {
    this.isValid[inputName] = !!this.signInFormData[inputName];
  }

  checkIsValidForm(formName: keyof IInputsForValidate): boolean {
    inputsForValidate[formName].forEach((inputName) => {
      if (inputName in this.todoFormData) {
        this.updateIsValidTodoValue(inputName as keyof ITodoFormData);
      }

      if (inputName in this.signInFormData) {
        this.updateIsValidSignInValue(inputName as keyof ISignInFormData);
      }
    });
    return inputsForValidate[formName].every((inputName) => this.isValid[inputName]);
  }

  openModalWindow(formName: string) {
    this.setDefaultFormData(formName);
    this.setDefaultIsValid();
    this.isOpen[formName as IFormName] = true;
  }

  closeModalWindow(formName: string) {
    this.isOpen[formName as IFormName] = false;
  }

  showSnackBar(isSuccessResponse: boolean) {
    this.isSuccessResponse = isSuccessResponse;
    this.isOpen[FormName.SnackBar] = true;
  }

  hideSnackBar() {
    this.isOpen[FormName.SnackBar] = false;
  }

  checkTodoResponse(response: ITodo): boolean {
    let isSuccessResponse = true;
    for (const [key, value] of Object.entries(response)) {
      if (key !== InputName.Id && value !== this.todoFormData[key as keyof ITodo]) {
        isSuccessResponse = false;
      }
    }
    return isSuccessResponse;
  }

  checkSignInResponse(response: IUser): boolean {
    let isSuccessResponse = true;
    for (const [key, value] of Object.entries(response)) {
      if (value !== this.signInFormData[key as keyof IUser]) {
        isSuccessResponse = false;
      }
    }
    return isSuccessResponse;
  }
}
