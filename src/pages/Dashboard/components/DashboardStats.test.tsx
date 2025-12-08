import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../../test/testUtils';
import DashboardStats from './DashboardStats';

describe('DashboardStats', () => {
  const mockData = {
    totalAgreements: 100,
    activeAgreements: 75,
    pendingApprovals: 15,
    expiringSoon: 10,
    totalValue: 5000000,
  };

  it('renders all statistics', () => {
    render(<DashboardStats data={mockData} loading={false} />);

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('displays stat labels', () => {
    render(<DashboardStats data={mockData} loading={false} />);

    expect(screen.getByText(/total agreements/i)).toBeInTheDocument();
    expect(screen.getByText(/active agreements/i)).toBeInTheDocument();
    expect(screen.getByText(/pending approvals/i)).toBeInTheDocument();
    expect(screen.getByText(/expiring soon/i)).toBeInTheDocument();
  });

  it('handles zero values', () => {
    const zeroData = {
      totalAgreements: 0,
      activeAgreements: 0,
      pendingApprovals: 0,
      expiringSoon: 0,
      totalValue: 0,
    };

    render(<DashboardStats data={zeroData} loading={false} />);

    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThan(0);
  });

  it('formats large numbers correctly', () => {
    const largeData = {
      totalAgreements: 1000,
      activeAgreements: 750,
      pendingApprovals: 150,
      expiringSoon: 100,
      totalValue: 10000000,
    };

    render(<DashboardStats data={largeData} loading={false} />);

    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('750')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DashboardStats loading={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with Material-UI styling', () => {
    const { container } = render(<DashboardStats data={mockData} loading={false} />);

    // Check for MUI classes
    expect(container.querySelector('[class*="MuiGrid"]')).toBeInTheDocument();
  });
});
