import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/testUtils';
import CreateAgreement from './CreateAgreement';

describe('CreateAgreement - Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the agreement wizard with all steps', () => {
    render(<CreateAgreement />);

    expect(screen.getByText(/create a new agreement/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /client details/i, level: 5 })).toBeInTheDocument();
  });

  it('renders basic form elements', async () => {
    render(<CreateAgreement />);

    // Check for search input
    expect(screen.getByPlaceholderText(/search by name or email/i)).toBeInTheDocument();
    
    // Check for agreement type selection - use getAllByText since there are multiple matches
    const wealthManagementOptions = screen.getAllByText(/wealth management/i);
    expect(wealthManagementOptions.length).toBeGreaterThan(0);
  });

  it('has action buttons', () => {
    render(<CreateAgreement />);

    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save draft/i })).toBeInTheDocument();
  });

  it('displays step indicators', () => {
    render(<CreateAgreement />);

    // Verify multiple step names are present in the stepper
    const clientDetailsElements = screen.getAllByText(/client details/i);
    expect(clientDetailsElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText(/investing account/i)).toBeInTheDocument();
    expect(screen.getByText(/billing details/i)).toBeInTheDocument();
  });
});
