import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { IMainStore } from './types';
import App from './App';
import UserStore from './store/UserStore';
import TodoStore from './store/TodoStore';
import FormsStore from './store/FormsStore';

const store = {
  userStore: new UserStore(),
  todoStore: new TodoStore(),
  formsStore: new FormsStore(),
};

export const Context = createContext<IMainStore>(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Context.Provider value={store}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
