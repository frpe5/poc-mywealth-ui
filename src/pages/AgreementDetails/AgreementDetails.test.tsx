import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test/testUtils';
import AgreementDetails from './AgreementDetails';

describe('AgreementDetails', () => {
  it('renders agreement details page', () => {
    render(<AgreementDetails />);
    
    // Without route params, component shows error state
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows error when no agreement ID provided', () => {
    render(<AgreementDetails />);
    
    // Should show error message and back button
    expect(screen.getByText(/failed to load agreement details/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back to dashboard/i })).toBeInTheDocument();
  });
});
