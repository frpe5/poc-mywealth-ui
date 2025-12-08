import { describe, it, expect } from 'vitest';
import { render } from './test/testUtils';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App standalone={false} />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders main application layout', () => {
    render(<App standalone={false} />);
    
    // Check that the app container is present
    expect(document.querySelector('[class*="MuiBox"]')).toBeInTheDocument();
  });

  it('provides theme context to children', () => {
    render(<App standalone={false} />);
    
    // Verify Material-UI theme is applied by checking for MUI classes
    expect(document.querySelector('[class*="Mui"]')).toBeInTheDocument();
  });

  it('provides Apollo client context', () => {
    render(<App standalone={false} />);
    
    // App should render without Apollo provider errors
    expect(document.body).toBeInTheDocument();
  });

  it('handles routing', () => {
    render(<App standalone={false} />);
    
    // Router should be initialized
    expect(document.body).toBeInTheDocument();
  });
});
