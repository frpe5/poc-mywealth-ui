import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ApolloProvider } from '@apollo/client';
import { AppProvider } from '../contexts/AppContext';
import { theme } from '../config/theme';
import { createMockApolloClient } from './mockApolloClient';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRoute?: string;
  apolloClient?: ReturnType<typeof createMockApolloClient>;
}

/**
 * Custom render function that wraps components with all necessary providers
 * @param ui - Component to render
 * @param options - Render options including initialRoute and apolloClient
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    initialRoute = '/',
    apolloClient = createMockApolloClient(),
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  // Set initial route if provided
  if (initialRoute !== '/') {
    window.history.pushState({}, 'Test page', initialRoute);
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <BrowserRouter>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <AppProvider>{children}</AppProvider>
          </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    apolloClient,
  };
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { renderWithProviders as render };
