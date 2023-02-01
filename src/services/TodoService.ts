import $api from '../api';
import { AxiosResponse } from 'axios';
import { TodoResponse } from '../models/response/TodoResponse';
import { ITodo } from '../models/ITodo';

export default class TodoService {
  static async getAll(): Promise<AxiosResponse<TodoResponse>> {
    return await $api.get<TodoResponse>('/todos');
  }

  static async create(data: ITodo): Promise<AxiosResponse<ITodo>> {
    return await $api.post<ITodo>('/todos', { ...data });
  }

  static async getById(data: ITodo): Promise<AxiosResponse<ITodo>> {
    const { id } = data;
    return await $api.get<ITodo>(`/todos/${id}`);
  }

  static async updateById(data: ITodo): Promise<AxiosResponse<ITodo>> {
    const id = Number.parseInt(data?.id as string);
    return await $api.put<ITodo>(`/todos/${id}`, { ...data });
  }

  static async deleteById(data: ITodo): Promise<AxiosResponse<string>> {
    const id = Number.parseInt(data?.id as string);
    return await $api.delete<string>(`/todos/${id}`);
  }
}
