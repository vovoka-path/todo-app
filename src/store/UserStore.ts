import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import AuthService from '../services/AuthService';

export default class UserStore {
  user = {} as IUser;
  isAuth = false;
  isUserExist = true;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setUserExist(bool: boolean) {
    this.isUserExist = bool;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
    localStorage.setItem('isAuth', JSON.stringify(bool));
  }

  getAuth() {
    const itemFromLocal = localStorage.getItem('isAuth');
    const isAuth = itemFromLocal && JSON.parse(itemFromLocal);
    return isAuth;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async signup(login: string, password: string) {
    try {
      const response = await AuthService.signup(login, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log('Sign up ERROR:', e.response?.data?.message);
      }
    }
  }

  async signin(login: string, password: string) {
    try {
      const response = await AuthService.signin(login, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response.data.user;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log('Sign in ERROR:', e.response?.data?.message);
      }
      return null;
    }
  }

  async signout() {
    try {
      const response = await AuthService.signout();
      localStorage.removeItem('accessToken');
      this.setAuth(false);
      this.setUser({} as IUser);
      return response;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log('Sign out ERROR:', e.response?.data?.message);
      }
      return null;
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await AuthService.refresh();
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log('Check Auth ERROR:', e.response?.data?.message);
      }
    } finally {
      this.setLoading(false);
    }
  }
}
