import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { IInputElem } from '../../types';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const InputElem: FC<IInputElem> = ({
  name,
  type,
  label,
  handler,
  autofocus,
  value = '',
  errorMsg = '',
}) => {
  const { formsStore } = useContext(Context);

  if (name === 'isDone') {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={formsStore.todoFormData.isDone}
            onChange={handler}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={formsStore.todoFormData.isDone ? 'Done!' : 'Have to do!'}
      />
    );
  }

  return (
    <TextField
      fullWidth
      variant="standard"
      margin="dense"
      color="success"
      autoFocus={autofocus}
      id={name}
      label={label}
      type={type}
      onChange={handler}
      defaultValue={value}
      error={!formsStore.isValid[name]}
      helperText={!formsStore.isValid[name] && errorMsg}
    />
  );
};

export default observer(InputElem);
