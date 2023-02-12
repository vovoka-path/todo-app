import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { IInputElem } from '../../types';
import { COLOR, InputName, InputErrorMsg, FormName } from '../../constants';
import InputElem from '../../UIComponents/InputElem';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { IUser } from '../../models/IUser';

const signinBtnStyles = {
  color: COLOR.font,
}

const SignInModal: FC = () => {
  const { userStore, formsStore } = useContext(Context);

  const handleClickOpen = () => {
    userStore.setUserExist(true);
    formsStore.openModalWindow(FormName.Signin);
  };

  const handleClose = () => {
    formsStore.closeModalWindow(FormName.Signin);
  };

  const submitForm = async () => {
    if (formsStore.checkIsValidForm(FormName.Signin)) {
      const { login, password } = formsStore.signInFormData;
      const response: IUser | null = await userStore.signin(login, password);
      const isSuccessResponse = response ? formsStore.checkSignInResponse(response) : false;

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
      name: InputName.Login,
      type: 'text',
      label: 'Login... (you can use "admin")',
      handler: (e) => formsStore.handle(InputName.Login, e.target.value),
      autofocus: true,
      errorMsg: InputErrorMsg.Login,
    },
    {
      name: InputName.Password,
      type: 'password',
      label: 'Password... (you can use "123")',
      handler: (e) => formsStore.handle(InputName.Password, e.target.value),
      autofocus: false,
      errorMsg: InputErrorMsg.Password,
    },
  ];

  return (
    <>
      <Button variant="text" sx={signinBtnStyles} onClick={handleClickOpen}>
        Sign in
      </Button>
      <Dialog open={formsStore.isOpen.signIn} onClose={handleClose}>
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
