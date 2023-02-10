import { ChangeEvent } from 'react';
import { makeAutoObservable } from 'mobx';
import { EMAIL_REGEXP } from '../constants';
import {
  IIsValidate,
  ITodoFormData,
  ITodoFormKeys,
  ISignInFormData,
  ISignInFormKeys,
} from '../types';

export default class FormsStore {
  todoFormData = {
    id: null,
    isDone: false,
    isEdited: false,
  } as ITodoFormData;
  signInFormData = {
    login: '',
    password: '',
  } as ISignInFormData;
  isOpen = {
    newTodoForm: false,
    editTodoForm: false,
    signInForm: false,
  };
  isValid = {
    title: true,
    userName: true,
    email: true,
    login: true,
    password: true,
  } as IIsValidate;
  snackBar = {
    isShow: false,
  };
  isSuccessResponse = false;
  isValidSigninFormData = true;

  constructor() {
    makeAutoObservable(this);
  }

  setFormData(data: ITodoFormData) {
    this.todoFormData = {
      ...this.todoFormData,
      ...data,
    };
  }

  handleTitle(e: ChangeEvent<HTMLInputElement>) {
    this.updateTodoInput('title', e.target.value);
  }

  handleUsername(e: ChangeEvent<HTMLInputElement>) {
    this.updateTodoInput('userName', e.target.value);
  }

  handleEmail(e: ChangeEvent<HTMLInputElement>) {
    this.updateTodoInput('email', e.target.value);
  }

  handleIsDone(e: ChangeEvent<HTMLInputElement>) {
    this.updateTodoValue('isDone', e.target.checked);
  }

  handleLogin(e: ChangeEvent<HTMLInputElement>) {
    this.updateSigninInput('login', e.target.value);
  }

  handlePassword(e: ChangeEvent<HTMLInputElement>) {
    this.updateSigninInput('password', e.target.value);
  }

  updateTodoInput(inputName: string, value: string) {
    this.updateTodoValue(inputName, value);
    this.updateIsValidTodoValue(inputName as ITodoFormKeys);
  }

  updateSigninInput(inputName: string, value: string) {
    this.updateSignInValue(inputName, value);
    this.updateIsValidSigninValue(inputName as ISignInFormKeys);
  }

  updateTodoValue(inputName: string, value: string | boolean) {
    this.todoFormData = {
      ...this.todoFormData,
      [inputName]: value,
    };
  }

  updateIsValidTodoValue(inputName: ITodoFormKeys) {
    if (inputName === 'email') {
      if (EMAIL_REGEXP.test(this.todoFormData.email as string)) {
        this.isValid.email = true;
      }
    } else if (!!this.todoFormData[inputName]) {
      this.isValid[inputName] = true;
    }
  }

  updateIsValidSigninValue(inputName: ISignInFormKeys) {
    if (!!this.signInFormData[inputName]) {
      this.isValid[inputName] = true;
    }
  }

  checkIsValidAddTodoForm() {
    const inputNames = ['title', 'userName', 'email'];

    inputNames.forEach((inputName) => {
      if (inputName === 'email') {
        this.setIsValidInput(inputName, EMAIL_REGEXP.test(this.todoFormData.email as string));
      } else {
        this.setIsValidInput(inputName, !!this.todoFormData[inputName as ITodoFormKeys]);
      }
    });

    return inputNames.every((inputName) => this.isValid[inputName] === true);
  }

  checkIsValidEditForm() {
    const inputNames = ['title'];

    inputNames.forEach((inputName) => {
      this.setIsValidInput(inputName, !!this.todoFormData[inputName as ITodoFormKeys]);
    });

    return inputNames.every((inputName) => this.isValid[inputName] === true);
  }

  setValidSigninFormData() {
    this.isValidSigninFormData = this.checkIsValidSignInForm();
  }

  checkIsValidSignInForm() {
    const inputNames = ['login', 'password'];

    inputNames.forEach((inputName) => {
      this.setIsValidInput(inputName, !!this.signInFormData[inputName as ISignInFormKeys]);
    });

    return inputNames.every((inputName) => this.isValid[inputName] === true);
  }

  updateSignInValue(inputName: string, value: string) {
    this.signInFormData = {
      ...this.signInFormData,
      [inputName]: value,
    };
  }

  updateIsValidSignInValue(inputName: ISignInFormKeys) {
    this.isValid[inputName] = true;
  }

  setIsValidInput(name: string, bool: boolean) {
    this.isValid[name] = bool;
  }

  openNewTodoForm() {
    this.isValid.email = true;
    this.isOpen.newTodoForm = true;
  }

  closeNewTodoForm() {
    this.isOpen.newTodoForm = false;
  }

  openEditTodoForm() {
    this.isOpen.editTodoForm = true;
  }

  closeEditTodoForm() {
    this.isOpen.editTodoForm = false;
  }

  openSignInForm() {
    this.isOpen.signInForm = true;
  }

  closeSignInForm() {
    this.isOpen.signInForm = false;
  }

  showSnackBar(isSuccessResponse: boolean) {
    this.setIsSuccessResponse(isSuccessResponse);
    this.snackBar.isShow = true;
  }

  setIsSuccessResponse(bool: boolean) {
    this.isSuccessResponse = bool;
  }

  closeSnackBar() {
    this.snackBar.isShow = false;
  }
}
