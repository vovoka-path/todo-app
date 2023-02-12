export enum InputName {
  Id = 'id',
  Title = 'title',
  UserName = 'userName',
  Email = 'email',
  IsDone = 'isDone',
  IsEdited = 'isEdited',
  Login = 'login',
  Password = 'password',
}

export enum InputErrorMsg {
  Title = 'Text your todo, please!',
  UserName = 'Enter your name, please!',
  Email = 'Email is not correct!',
  Login = `Enter login, please!`,
  Password = `Enter password, please!`,
}

export enum FormName {
  NewTodo = 'newTodo',
  EditTodo = 'editTodo',
  Signin = 'signIn',
  SnackBar = 'snackBar',
}

export const COLOR = {
  font: '#FFFFFF',
};

export const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
