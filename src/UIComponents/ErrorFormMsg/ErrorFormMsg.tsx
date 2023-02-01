import { FC } from 'react';
import Chip from '@mui/material/Chip';

interface IErrorFormMsg {
  message: string | undefined;
}

const ErrorFormMsg: FC<IErrorFormMsg> = ({ message }) => {
  return <Chip label={message} variant="outlined" color="error" size="small" />;
};

export default ErrorFormMsg;
