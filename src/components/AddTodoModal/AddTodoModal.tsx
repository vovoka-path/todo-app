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
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const boxStyles = {
  px: { xs: 4, sm: 10 },
  py: { xs: 3, sm: 5 },
};

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
};

const AddTodoModal: FC = () => {
  const { todoStore, formsStore } = useContext(Context);

  const handleClickOpen = () => {
    formsStore.openModalWindow(FormName.NewTodo);
  };

  const handleClose = () => {
    formsStore.closeModalWindow(FormName.NewTodo);
  };

  const submitForm = async () => {
    if (formsStore.checkIsValidForm(FormName.NewTodo)) {
      const todoData: ITodo = { ...formsStore.todoFormData, id: null, isEdited: false };
      const response: ITodo | undefined = await todoStore.create(todoData);
      const isSuccessResponse = response ? formsStore.checkTodoResponse(response) : false;

      if (isSuccessResponse) {
        todoStore.updateTodo({ ...formsStore.todoFormData });
        todoStore.setCurrentPage(todoStore.pages.total);
        handleClose();
      }
      formsStore.showSnackBar(isSuccessResponse);
    }
  };

  const inputElems: IInputElem[] = [
    {
      name: InputName.Title,
      type: 'text',
      label: 'What to do?',
      handler: (e) => formsStore.handle(InputName.Title, e.target.value),
      autofocus: true,
      errorMsg: InputErrorMsg.Title,
    },
    {
      name: InputName.UserName,
      type: 'text',
      label: 'Your name',
      handler: (e) => formsStore.handle(InputName.UserName, e.target.value),
      autofocus: false,
      errorMsg: InputErrorMsg.UserName,
    },
    {
      name: InputName.Email,
      type: 'email',
      label: 'Your email',
      handler: (e) => formsStore.handle(InputName.Email, e.target.value),
      autofocus: false,
      errorMsg: InputErrorMsg.Email,
    },
  ];

  return (
    <Box sx={boxStyles}>
      <Container maxWidth="lg" sx={containerStyles}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          color="success"
          onClick={handleClickOpen}
        >
          New todo
        </Button>
        <Dialog open={formsStore.isOpen.newTodo} onClose={handleClose}>
          <DialogTitle>New todo</DialogTitle>
          <DialogContent>
            {inputElems.map((data) => (
              <InputElem key={data.name} {...data} />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitForm}>Add todo</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default observer(AddTodoModal);
