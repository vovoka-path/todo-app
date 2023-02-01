import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { IInputElem } from '../../types';
import InputElem from '../../UIComponents/InputElem';
import { ITodo } from '../../models/ITodo';

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
    formsStore.openNewTodoForm();
  };

  const handleClose = () => {
    formsStore.closeNewTodoForm();
  };

  const submitForm = async () => {
    if (formsStore.checkIsValidAddTodoForm()) {
      const updatedTodo = { ...formsStore.todoFormData, id: null, isEdited: false } as ITodo;
      const res = await todoStore.create(updatedTodo);
      const isSuccessResponse = res?.email === formsStore.todoFormData.email;

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
      name: 'title',
      type: 'text',
      label: 'What to do?',
      handler: (e) => formsStore.handleTitle(e),
      autofocus: true,
      errorMsg: 'Enter todo description, please!',
    },
    {
      name: 'userName',
      type: 'text',
      label: 'Your name',
      handler: (e) => formsStore.handleUsername(e),
      autofocus: false,
      errorMsg: 'Enter your name, please!',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Your email',
      handler: (e) => formsStore.handleEmail(e),
      autofocus: false,
      errorMsg: 'Email is not correct!',
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
        <Dialog open={formsStore.isOpen.newTodoForm} onClose={handleClose}>
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
