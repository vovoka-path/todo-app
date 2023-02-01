import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Context } from '../..';

const message = {
  success: 'Successfully!',
  error: 'There is something wrong!',
};

const snackBarStyles = {
  marginTop: '3.2rem',
};

const alertStyles = {
  width: '100%',
};

const SnackBar: FC = () => {
  const { formsStore } = useContext(Context);

  const handleClose = () => {
    formsStore.closeSnackBar();
  };

  return (
    <Snackbar
      key="todo-is-created"
      open={formsStore.snackBar.isShow}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={2000}
      transitionDuration={{ appear: 700, enter: 1000, exit: 700 }}
      onClose={handleClose}
      sx={snackBarStyles}
    >
      <Alert
        onClose={handleClose}
        severity={formsStore.isSuccessResponse ? 'success' : 'error'}
        sx={alertStyles}
      >
        {formsStore.isSuccessResponse ? message.success : message.error}
      </Alert>
    </Snackbar>
  );
};

export default observer(SnackBar);
