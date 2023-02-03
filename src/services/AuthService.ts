import $api from '../api';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { IUser } from '../models/IUser';

export default class AuthService {
  static async signup(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>('/users/signup', { login, password });
  }

  static async signin(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>('/users/signin', { login, password });
  }

  static async signout(): Promise<void> {
    return await $api.post('/users/signout');
  }

  static async checkauth(user: IUser): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>('/users/checkauth', {user});
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return await $api.get<AuthResponse>('/users/refresh');
  }
}
