interface ITodo {
  id: string;
  userName: string;
  email: string;
  title: string;
  isDone: boolean;
  isEdited: boolean;
}

export type TodoResponse = ITodo[];
