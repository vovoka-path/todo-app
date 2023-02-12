import { FC } from 'react';
import Copyright from '../Copyright';

import MuiLink from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const boxStyles = {
  px: { xs: 4, sm: 10 },
  py: { xs: 4, sm: 6 },
};

const textStyles = {
  my: 2,
  mx: 'auto',
  color: 'gray',
  textShadow: '1px 1px 0 #ffffff, -1px -1px 0 #ffffff',
};

const Footer: FC = () => {
  const author = {
    name: 'Vladimir Polansky',
    link: 'https://vovoka.space',
    githubUrl: 'https://github.com/vovoka-path/todo-app',
  };
  const authorNoWrap = author.name.split(' ').join(' ');

  return (
    <footer>
      <Box sx={boxStyles}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={textStyles}>
            Created using React, Typescript, Mobx, Material UI.{' '}
            <MuiLink color="inherit" href={author.githubUrl} target="_blank">
              <strong>Github</strong>
            </MuiLink>
          </Typography>
          <Copyright author={authorNoWrap} authorLink={author.link} />
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
