import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { IInputElem } from '../../types';
import { color } from '../../constants';
import InputElem from '../../UIComponents/InputElem';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

const signinBtnStyles = {
  color: color.font,
}

const SignInModal: FC = () => {
  const { userStore, formsStore } = useContext(Context);

  const handleClickOpen = () => {
    userStore.setUserExist(true);
    formsStore.openSignInForm();
  };

  const handleClose = () => {
    formsStore.closeSignInForm();
  };

  const submitForm = async () => {
    formsStore.setValidSigninFormData();

      const { login, password } = formsStore.signInFormData;
      console.log('Signin: login, password', login, password)
      console.log('Signin:formsStore.setValidSigninFormData()', formsStore.isValidSigninFormData)

    if (formsStore.isValidSigninFormData) {
      const { login, password } = formsStore.signInFormData;
      const res = await userStore.signin(login, password);
      const isSuccessResponse = res?.login === formsStore.signInFormData.login;

      if (isSuccessResponse) {
        handleClose();
      } else {
        userStore.setUserExist(false);
      }

      formsStore.showSnackBar(isSuccessResponse);
    }
  };

  const inputElems: IInputElem[] = [
    {
      name: 'login',
      type: 'text',
      label: 'Login',
      handler: (e) => formsStore.handleLogin(e),
      autofocus: true,
      errorMsg: 'Enter login, please!',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      handler: (e) => formsStore.handlePassword(e),
      autofocus: false,
      errorMsg: 'Enter password, please!',
    },
  ];

  return (
    <>
      <Button variant="text" sx={signinBtnStyles} onClick={handleClickOpen}>
        Sign in
      </Button>
      <Dialog open={formsStore.isOpen.signInForm} onClose={handleClose}>
        <DialogTitle>Sign in</DialogTitle>
        <DialogContent>
          {!userStore.isUserExist && (
            <DialogContentText color="error">
              Login or email not correct!
            </DialogContentText>
          )}
          {inputElems.map((data) => (
            <InputElem key={data.name} {...data} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitForm}>Sign in</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default observer(SignInModal);
