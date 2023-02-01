import { FC } from 'react';
import TodoTitle from '../AddTodoModal';
import TodoList from '../TodoList';

const Main: FC = () => {
  return (
    <>
      <TodoTitle />
      <TodoList />
    </>
  );
};

export default Main;
