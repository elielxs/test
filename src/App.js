import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';

import { isLoggedIn } from './utils/authBoy';
import 'react-perfect-scrollbar/dist/css/styles.css';
import routes from './routes';
import { SnackbarProvider } from 'notistack';
const App = () => {
  const routing = useRoutes(routes(isLoggedIn()));
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SnackbarProvider maxSnack={3}>


        {routing}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
