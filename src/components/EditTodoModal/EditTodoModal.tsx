import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { ITodo } from '../../models/ITodo';
import { IInputElem } from '../../types';
import InputElem from '../../UIComponents/InputElem';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

const EditTodoModal: FC = () => {
  const { todoStore, formsStore, userStore } = useContext(Context);
  const todo = formsStore.todoFormData;
  const { id, title, isDone } = todo;

  const getTodoById = (id: string): ITodo => {
    const [todo] = todoStore.todos.filter((todo) => {
      return todo.id ? todo.id === id : false;
    });

    return todo;
  };

  const handleClose = () => {
    formsStore.closeEditTodoForm();
  };

  const submitForm = async () => {
    if (formsStore.checkIsValidEditForm()) {
      if (localStorage.getItem('accessToken')) {
        const isEditedTitle = id ? formsStore.todoFormData.title !== getTodoById(id).title : false;

        if (isEditedTitle) formsStore.updateTodoValue('isEdited', true);

        const updatedTodo = { ...formsStore.todoFormData } as ITodo;
        const res = await todoStore.updateById(updatedTodo);

        const { title, isDone, isEdited } = formsStore.todoFormData;
        const isSuccessResponse =
          res?.isDone === isDone && res?.title === title && res?.isEdited === isEdited;

        if (isSuccessResponse) {
          todoStore.updateTodo({ ...formsStore.todoFormData });
          handleClose();
        }

        formsStore.showSnackBar(isSuccessResponse);
      } else {
        userStore.setAuth(false);
      }
    }
  };

  const inputElems: IInputElem[] = [
    {
      name: 'isDone',
      type: 'checkbox',
      handler: (e) => formsStore.handleIsDone(e),
      autofocus: false,
      isDone: isDone,
    },
    {
      name: 'title',
      type: 'text',
      handler: (e) => formsStore.handleTitle(e),
      autofocus: true,
      value: title,
      errorMsg: 'Enter todo description, please!',
    },
  ];

  return (
    <Dialog open={formsStore.isOpen.editTodoForm} onClose={handleClose}>
      <DialogTitle>New todo</DialogTitle>
      <DialogContent>
        {!userStore.isAuth && (
          <DialogContentText color="error">
            You are not authorized. Please, close the window and sign in!
          </DialogContentText>
        )}
        {inputElems.map((data) => (
          <InputElem key={data.name} {...data} />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={submitForm}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(EditTodoModal);
