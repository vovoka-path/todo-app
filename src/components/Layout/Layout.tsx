import { useEffect, useContext, FC } from 'react';
import { Context } from '../..';
import { COLOR, STORAGE } from '../../constants';
import { bdSvgUrl } from './bgSvg';
import Header from '../Header';
import Footer from '../Footer';
import Loading from '../../UIComponents/Loading';
import SnackBar from '../../UIComponents/SnackBar';

import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { observer } from 'mobx-react-lite';

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
  color: COLOR.font,
};

type LayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem(STORAGE.ACCESS_TOKEN)) {
      const checkAuth = async () => await userStore.checkAuth();
      checkAuth();
    }
    userStore.setLoading(false);
  }, [userStore]);

  if (userStore.isLoading) return <Loading text="Checking authorization..." />;

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

export default observer(Layout);
