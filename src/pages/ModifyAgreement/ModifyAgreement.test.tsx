import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/testUtils';
import ModifyAgreement from './ModifyAgreement';

describe('ModifyAgreement', () => {
  it('renders modify agreement page', () => {
    render(<ModifyAgreement />);
    
    // Without route params, component shows error state
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows error when no agreement ID provided', () => {
    render(<ModifyAgreement />);
    
    // Should show error message and action buttons
    expect(screen.getByText(/failed to load agreement details/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back to dashboard/i })).toBeInTheDocument();
  });
});
