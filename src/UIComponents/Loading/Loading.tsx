import { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const containerStyles = {
  height: '40vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const textStyles = {
  textAlign: 'center',
  color: '#000000',
};

interface ILoading {
  text: string;
}

const Loading: FC<ILoading> = ({ text }) => {
  return (
    <>
      <Typography variant="body2" component="div" sx={textStyles}>
        {text}
      </Typography>
      <Box sx={containerStyles}>
        <CircularProgress />
      </Box>
    </>
  );
};

export default Loading;
