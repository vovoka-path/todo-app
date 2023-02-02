import $api from '../api';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
  static async signup(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/users/signup', { login, password });
  }

  static async signin(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/users/signin', { login, password });
  }

  static async signout(): Promise<void> {
    return $api.post('/users/signout');
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get('/users/refresh');
  }
}
