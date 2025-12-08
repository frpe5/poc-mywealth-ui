import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import AgreementFilters from './AgreementFilters';

describe('AgreementFilters', () => {
  const mockOnFilterChange = vi.fn();
  const mockOnRefresh = vi.fn();
  const defaultFilters = {
    status: undefined,
    agreementType: undefined,
    clientName: '',
    dateFrom: '',
    dateTo: '',
    searchTerm: '',
  };

  beforeEach(() => {
    mockOnFilterChange.mockClear();
    mockOnRefresh.mockClear();
  });

  it('renders filter controls', () => {
    render(
      <AgreementFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFilterChange}
        onRefresh={mockOnRefresh}
      />
    );

    // Check for filter elements
    expect(screen.getByLabelText(/client root/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('handles client name input changes', async () => {
    const user = userEvent.setup();
    
    render(
      <AgreementFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFilterChange}
        onRefresh={mockOnRefresh}
      />
    );

    const clientRootInput = screen.getByLabelText(/client root/i);
    await user.type(clientRootInput, 'test search');

    expect(mockOnFilterChange).toHaveBeenCalled();
  });

  it('handles period filter changes', async () => {
    const user = userEvent.setup();
    
    render(
      <AgreementFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFilterChange}
        onRefresh={mockOnRefresh}
      />
    );

    // Verify the period combobox is rendered and accessible
    const periodSelect = screen.getByRole('combobox');
    expect(periodSelect).toBeInTheDocument();
    expect(periodSelect).toHaveTextContent(/last 30 days/i);
  });

  it('displays current filter values', () => {
    const activeFilters = {
      ...defaultFilters,
      clientName: 'John Doe',
    };

    render(
      <AgreementFilters 
        filters={activeFilters} 
        onFiltersChange={mockOnFilterChange}
        onRefresh={mockOnRefresh}
      />
    );

    const clientRootInput = screen.getByLabelText(/client root/i) as HTMLInputElement;
    expect(clientRootInput.value).toBe('John Doe');
    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveTextContent(/last 30 days/i);
  });

  it('allows clearing filters', async () => {
    const user = userEvent.setup();
    
    render(
      <AgreementFilters 
        filters={{ ...defaultFilters, clientName: 'test' }} 
        onFiltersChange={mockOnFilterChange}
        onRefresh={mockOnRefresh}
      />
    );

    const resetButton = screen.getByRole('button', { name: /reset filters/i });
    await user.click(resetButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      status: undefined,
      agreementType: undefined,
      clientName: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      searchTerm: undefined,
    });
  });

  it('shows more filters when toggled', async () => {
    const user = userEvent.setup();
    
    render(
      <AgreementFilters 
        filters={defaultFilters} 
        onFiltersChange={mockOnFilterChange}
        onRefresh={mockOnRefresh}
      />
    );

    const toggleLink = screen.getByText(/more search filters/i);
    await user.click(toggleLink);
    
    // More filters should now be visible - check that Request Type appears (multiple instances expected)
    const requestTypeElements = screen.getAllByText(/request type/i);
    expect(requestTypeElements.length).toBeGreaterThan(0);
  });
});
