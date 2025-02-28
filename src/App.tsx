import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import theme from './theme.ts';
import ShoppingList from './components/ShoppingList.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <ErrorBoundary>
            <ShoppingList />
          </ErrorBoundary>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
