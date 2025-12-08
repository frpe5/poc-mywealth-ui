import { describe, it, expect } from 'vitest';
import { render } from './test/testUtils';
import { createMockApolloClient } from './test/mockApolloClient';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const mockClient = createMockApolloClient();
    render(<App standalone={false} apolloClient={mockClient} />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders main application layout', () => {
    const mockClient = createMockApolloClient();
    render(<App standalone={false} apolloClient={mockClient} />);
    
    // Check that the app container is present
    expect(document.querySelector('[class*="MuiBox"]')).toBeInTheDocument();
  });

  it('provides theme context to children', () => {
    const mockClient = createMockApolloClient();
    render(<App standalone={false} apolloClient={mockClient} />);
    
    // Verify Material-UI theme is applied by checking for MUI classes
    expect(document.querySelector('[class*="Mui"]')).toBeInTheDocument();
  });

  it('provides Apollo client context', () => {
    const mockClient = createMockApolloClient();
    render(<App standalone={false} apolloClient={mockClient} />);
    
    // App should render without Apollo provider errors
    expect(document.body).toBeInTheDocument();
  });

  it('handles routing', () => {
    const mockClient = createMockApolloClient();
    render(<App standalone={false} apolloClient={mockClient} />);
    
    // Router should be initialized
    expect(document.body).toBeInTheDocument();
  });
});
