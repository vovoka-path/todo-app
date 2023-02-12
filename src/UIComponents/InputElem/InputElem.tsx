import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { IInputElem } from '../../types';
import { InputName } from '../../constants';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const formControlLabelStyles = { minWidth: '160px' };

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

  if (name === InputName.IsDone) {
    return (
      <FormControlLabel
        sx={formControlLabelStyles}
        control={
          <Checkbox
            checked={formsStore.todoFormData.isDone}
            onChange={handler}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={formsStore.todoFormData.isDone ? 'Done!' : 'Not done...'}
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
      multiline={name === InputName.Title}
    />
  );
};

export default observer(InputElem);
