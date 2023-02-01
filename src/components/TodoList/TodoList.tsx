import { FC, SyntheticEvent, useCallback, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { TodoType } from '../../types';
import TodoItem from '../TodoItem';
import EditTodoModal from '../EditTodoModal';
import Loading from '../../UIComponents/Loading';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const flexCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const boxStyles = {
  px: { xs: 0, sm: 10 },
  py: { xs: 2, sm: 2 },
};

const sortButtonContainerStyles = {
  mx: { xs: 0, sm: 8 },
  my: { xs: 2, sm: 2 },
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  backgroundColor: '#FFFFFF',
};

const sortNameBoxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
};

const sortNameStyles = {
  ...flexCenterStyle,
  flexDirection: 'column',
};

const containerStyles = {
  ...flexCenterStyle,
  width: '100%',
  flexDirection: 'column',
};

const paginationStyles = {
  ...flexCenterStyle,
  px: { xs: 0, sm: 10 },
  py: { xs: 2, sm: 2 },
};

const notFoundStyles = {
  ...flexCenterStyle,
};

const TodoList: FC = () => {
  const { todoStore, formsStore, userStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentPageFromStorage = useCallback(() => {
    let currentPage = parseInt(localStorage.getItem('currentPage') as string) || 1;
    todoStore.setCurrentPage(currentPage > todoStore.pages.total ? 1 : currentPage);
  }, [todoStore]);

  const getAllTodos = useCallback(async () => {
    await todoStore.getAllTodos().then(() => setIsLoading(false));
    getCurrentPageFromStorage();
  }, [getCurrentPageFromStorage, todoStore]);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  const isAuth = userStore.getAuth();

  const handlePagination = (_: React.ChangeEvent<unknown>, currentPage: number) => {
    todoStore.setCurrentPage(currentPage);
  };

  const handleSort = (e: SyntheticEvent) => {
    const attrData = e.currentTarget?.attributes.getNamedItem('aria-label')?.value;

    if (attrData) {
      const arr: string[] = attrData?.split('-');
      const name = arr[0] as keyof TodoType;
      const direction = arr[1] as string;

      todoStore.sort(name, direction);
    }
  };

  if (isLoading) return <Loading text="Todos is downloading..." />;

  return (
    <Box sx={boxStyles}>
      <Stack direction="row" spacing={2} sx={sortButtonContainerStyles}>
        <Box sx={sortNameBoxStyles}>
          <IconButton color="primary" aria-label="userName-asc" onClick={handleSort}>
            <KeyboardArrowUpOutlinedIcon />
          </IconButton>
          <Typography variant="button" color="primary" sx={sortNameStyles}>
            user
          </Typography>
          <IconButton color="primary" aria-label="userName-desc" onClick={handleSort}>
            <KeyboardArrowDownOutlinedIcon />
          </IconButton>
        </Box>
        <Box sx={sortNameBoxStyles}>
          <IconButton color="primary" aria-label="email-asc" onClick={handleSort}>
            <KeyboardArrowUpOutlinedIcon />
          </IconButton>
          <Typography variant="button" color="primary" sx={sortNameStyles}>
            email
          </Typography>
          <IconButton color="primary" aria-label="email-desc" onClick={handleSort}>
            <KeyboardArrowDownOutlinedIcon />
          </IconButton>
        </Box>
        <Box sx={sortNameBoxStyles}>
          <IconButton color="primary" aria-label="isDone-asc" onClick={handleSort}>
            <KeyboardArrowUpOutlinedIcon />
          </IconButton>
          <Typography variant="button" color="primary" sx={sortNameStyles}>
            status
          </Typography>
          <IconButton color="primary" aria-label="isDone-desc" onClick={handleSort}>
            <KeyboardArrowDownOutlinedIcon />
          </IconButton>
        </Box>
      </Stack>
      <Pagination
        count={todoStore.pages.total}
        page={todoStore.pages.current}
        onChange={handlePagination}
        sx={paginationStyles}
      />
      <Container maxWidth="lg" sx={containerStyles}>
        {todoStore.pages.todosOnPage.length ? (
          todoStore.pages.todosOnPage.map((todo) => (
            <TodoItem key={todo.id} isAuth={isAuth} {...todo} />
          ))
        ) : (
          <Typography variant="button" color="primary" sx={notFoundStyles}>
            Todos not found!
          </Typography>
        )}
      </Container>
      {formsStore.isOpen.editTodoForm && <EditTodoModal />}
    </Box>
  );
};

export default observer(TodoList);
