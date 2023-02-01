import { FC, MouseEvent, useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { ITodo } from '../../models/ITodo';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const cardtStyles = {
  minWidth: 275,
  my: { xs: 1, sm: 1 },
  display: 'flex',
  flexWrap: 'wrap',
};

const cardContentStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
  gap: 1,
};

const cardActionsStyles = {
  px: { xs: 1, sm: 4 },
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
};

const chipStyles = {
  width: '5rem',
};

const checkboxStyles = {
  display: 'flex',
  justifyContent: 'center',
  flexGrow: '0',
};

const titleStyles = {
  flexGrow: '6',
};

interface ITodoItem extends ITodo {
  isAuth: boolean;
}

const TodoItem: FC<ITodoItem> = ({ id, title, userName, email, isDone, isEdited, isAuth }) => {
  const { userStore, todoStore, formsStore } = useContext(Context);

  const getTodoByEvent = useCallback(
    (e: MouseEvent<HTMLButtonElement>): ITodo => {
      const curretnId = e.currentTarget?.id.split('-')[0];

      const [todo] = todoStore.todos.filter((todo) => {
        return todo.id?.toString() === curretnId;
      });

      return todo;
    },
    [todoStore]
  );

  const handleEdit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const todo = getTodoByEvent(e);
      formsStore.setFormData(todo);
      formsStore.openEditTodoForm();
    },
    [formsStore, getTodoByEvent]
  );

  const handleDelete = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      const todo = getTodoByEvent(e);
      const deletedId = await todoStore.deleteById(todo);

      const isSuccessResponse = deletedId === todo?.id;

      if (isSuccessResponse) {
        await todoStore.getAllTodos();
        todoStore.deleteTodo();
        formsStore.showSnackBar(isSuccessResponse);
      }
    },
    [todoStore, formsStore, getTodoByEvent]
  );

  return (
    <Card sx={cardtStyles}>
      <CardContent sx={cardContentStyles}>
        <Stack direction="row" spacing={2} sx={checkboxStyles}>
          <Chip
            label={isDone ? 'Done' : 'Not done'}
            color={isDone ? 'success' : 'error'}
            size="small"
            sx={chipStyles}
          />
          <Box sx={titleStyles}> {title}</Box>
        </Stack>
        <Stack direction="row" spacing={2} sx={checkboxStyles}>
          <Chip label={userName} variant="outlined" color="secondary" size="small" />
          <Chip label={email} variant="outlined" color="secondary" size="small" />
        </Stack>
      </CardContent>
      {userStore.isAuth && (
        <CardActions sx={cardActionsStyles}>
          <Stack direction="row" spacing={2} sx={checkboxStyles}>
            {isEdited && (
              <Chip
                label={isEdited ? 'Edited by admin' : 'Not edited by admin'}
                color="success"
                size="small"
                variant="outlined"
              />
            )}
          </Stack>
          <Stack direction="row" spacing={2} sx={checkboxStyles}>
            <Button id={`${id}-edit`} size="small" onClick={handleEdit}>
              Edit
            </Button>
            <Button id={`${id}-delete`} size="small" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </CardActions>
      )}
    </Card>
  );
};

export default observer(TodoItem);
