import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { color } from '../../constants';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SignInModal from '../SignInModal';

const headerStyles = {
  position: 'static',
  backgroundColor: 'primary.main',
};

const titleStyles = {
  color: color.font,
  flexGrow: 1,
};

const btnStyles = {
  color: color.font,
};

const Header = observer(() => {
  const { userStore } = useContext(Context);

  const signout = () => {
    userStore.signout();
  };

  return (
    <AppBar color="primary" position="fixed" sx={headerStyles}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" component="h1" sx={titleStyles}>
            TODOS
          </Typography>
          {userStore.isAuth ? (
            <Button variant="outlined" sx={btnStyles} onClick={signout}>
              Sign out
            </Button>
          ) : (
            <SignInModal />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Header;
