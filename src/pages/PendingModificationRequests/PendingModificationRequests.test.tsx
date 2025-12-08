import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test/testUtils';
import PendingModificationRequests from './PendingModificationRequests';

describe('PendingModificationRequests', () => {
  it('renders pending modification requests page', () => {
    render(<PendingModificationRequests />);
    
    expect(screen.getByText(/pending modification requests/i)).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<PendingModificationRequests />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays table after loading', async () => {
    render(<PendingModificationRequests />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/pending modification requests/i)).toBeInTheDocument();
  });
});
