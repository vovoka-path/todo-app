import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { IInputElem } from '../../types';
import { InputName, InputErrorMsg, FormName } from '../../constants';
import { ITodo } from '../../models/ITodo';
import InputElem from '../../UIComponents/InputElem';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

const EditTodoModal: FC = () => {
  const { todoStore, formsStore, userStore } = useContext(Context);
  const { id, title, isDone } = formsStore.todoFormData;

  const handleClose = () => {
    formsStore.closeModalWindow(FormName.EditTodo);
  };

  const submitForm = async () => {
    if (formsStore.checkIsValidForm(FormName.EditTodo)) {
      if (localStorage.getItem('accessToken')) {
        const isEditedTitle =
          formsStore.todoFormData.title !== todoStore.getTodoByIdFromStore(id as string).title;

        if (isEditedTitle) formsStore.updateTodoValue(InputName.IsEdited, true);

        const todoDataFromForm = { ...formsStore.todoFormData } as ITodo;
        const response: ITodo | undefined = await todoStore.updateById(todoDataFromForm);
        const isSuccessResponse = response ? formsStore.checkTodoResponse(response) : false;

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
      name: InputName.IsDone,
      type: 'checkbox',
      handler: (e) => formsStore.handle(InputName.IsDone, e.target.checked),
      autofocus: false,
      isDone: isDone,
    },
    {
      name: InputName.Title,
      type: 'text',
      handler: (e) => formsStore.handle(InputName.Title, e.target.value),
      autofocus: true,
      value: title,
      errorMsg: InputErrorMsg.Title,
    },
  ];

  return (
    <Dialog open={formsStore.isOpen.editTodo} onClose={handleClose}>
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
