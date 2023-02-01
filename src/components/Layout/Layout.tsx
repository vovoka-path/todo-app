import { useState, useEffect, useContext, FC, useCallback } from 'react';
import { Context } from '../..';
import { color } from '../../constants';
import { bdSvgUrl } from './bgSvg';
import Header from '../Header';
import Footer from '../Footer';
import Loading from '../../UIComponents/Loading';
import SnackBar from '../../UIComponents/SnackBar';

import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const bgStyles = {
  backgroundColor: '#ffffff',
  backgroundImage: `url("${bdSvgUrl}")`,
  backgroundAttachment: 'fixed',
};

const bodyStyles = {
  ...bgStyles,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const mainStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  flexGrow: 1,
  color: color.font,
};

type LayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: FC<LayoutProps> = (props) => {
  const { userStore } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    await userStore.checkAuth().then(() => setIsLoading(false));
  }, [userStore]);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      checkAuth();
    } else {
      userStore.setAuth(false);
      setIsLoading(false);
    }
  }, [checkAuth, userStore]);

  const { children } = props;

  if (isLoading) return <Loading text="Checking authorization..." />;

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Box sx={bodyStyles}>
        <Header />
        <Box component="main" sx={mainStyles}>
          {children}
        </Box>
        <Footer />
        <Container>
          <SnackBar />
        </Container>
      </Box>
    </StyledEngineProvider>
  );
};

export default Layout;
