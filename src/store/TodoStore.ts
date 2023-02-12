import { ITodo } from '../models/ITodo';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { InputName, SORTING, STORAGE } from '../constants';
import TodoService from '../services/TodoService';

export default class TodoStore {
  todos = [] as ITodo[];
  pages = {
    current: this.getCurrentPageFromStorage() || 1,
    total: 0,
    itemsOnPage: 3,
    todosOnPage: [] as ITodo[],
  };

  constructor() {
    makeAutoObservable(this);
  }

  get allTodos() {
    return this.todos;
  }

  addTodo(todo: ITodo) {
    this.todos = [...this.todos, todo];
  }

  getTodoByIdFromStore(id: string): ITodo {
    const [todo] = this.todos.filter((todo) => {
      return todo.id ? todo.id === id : false;
    });

    return todo;
  }

  setTodos(todos: ITodo[]) {
    this.todos = [...todos];
  }

  setTodosOnPage() {
    this.pages.todosOnPage = this.getCurretnTodosOnPage();
    const currentPage = this.pages.todosOnPage ? this.pages.current : this.pages.current - 1;
    this.setCurrentPage(currentPage);
  }

  setCurrentPage(pageNumber: number) {
    this.pages.current = pageNumber;
    this.pages.todosOnPage = this.getCurretnTodosOnPage();
    localStorage.setItem(STORAGE.CURRENT_PAGE, this.pages.current.toString());
  }

  getCurrentPageFromStorage() {
    const currentPageFromLocal = localStorage.getItem(STORAGE.CURRENT_PAGE);
    return parseInt(currentPageFromLocal && JSON.parse(currentPageFromLocal));
  }

  async deleteTodo() {
    await this.getAllTodos();
    this.setPagesCount();
    if (this.pages.current > this.pages.total) this.setCurrentPage(this.pages.total);
    this.setTodosOnPage();
  }

  setPagesCount() {
    this.pages.total = Math.ceil(this.todos.length / 3);
  }

  getCurretnTodosOnPage() {
    const start = this.pages.itemsOnPage * (this.pages.current - 1);
    const end = start + this.pages.itemsOnPage;
    return this.todos.slice(start, end);
  }

  updateTodo(res: ITodo) {
    this.todos.forEach((todo, i, arr) => {
      if (todo.id === res.id) {
        arr[i] = {
          ...arr[i],
          ...res,
        };
      }
    });
    this.setTodosOnPage();
  }

  sort(name: keyof ITodo, direction: string) {
    const todos = this.todos.sort((a, b) => {
      if (name === InputName.IsDone) {
        const statusA: number = (a[name] as boolean) ? 1 : 0;
        const statusB: number = (b[name] as boolean) ? 1 : 0;

        if (direction === SORTING.ASC) return statusA - statusB;
        if (direction === SORTING.DESC) return statusB - statusA;
      } else {
        const todoA = (a[name] as string).toUpperCase();
        const todoB = (b[name] as string).toUpperCase();

        if (direction === SORTING.ASC) return todoA < todoB ? -1 : 1;
        if (direction === SORTING.DESC) return todoA > todoB ? -1 : 1;
      }

      return 0;
    });

    this.setTodos(todos);
    this.setTodosOnPage();
  }

  async getAllTodos() {
    try {
      const response = await TodoService.getAll();
      this.setTodos([...response.data]);
      this.setPagesCount();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log('ERROR', e.response?.data?.message);
      }
    }
  }

  async create(data: ITodo) {
    try {
      const response = await TodoService.create({ ...data });
      this.addTodo(response.data);
      this.setPagesCount();
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log('ERROR', e.response?.data?.message);
      }
    }
  }

  async getById(data: ITodo) {
    try {
      const response = await TodoService.create({ ...data });
      this.addTodo(response.data);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log('ERROR', e.response?.data?.message);
      }
    }
  }

  async updateById(data: ITodo) {
    try {
      const response = await TodoService.updateById({ ...data });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log('ERROR', e.response?.data);
      }
    }
  }

  async deleteById(data: ITodo) {
    try {
      const response = await TodoService.deleteById({ ...data });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log('ERROR', e.response?.data);
      }
    }
  }
}
