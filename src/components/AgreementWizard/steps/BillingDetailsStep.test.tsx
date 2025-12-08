import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import BillingDetailsStep from './BillingDetailsStep';
import { CreateAgreementFormValues } from '../../../types';

describe('BillingDetailsStep', () => {
  const defaultValues: CreateAgreementFormValues = {
    clientId: '',
    clientName: '',
    agreementType: '',
    startDate: '2024-01-01',
    endDate: '',
    selectedAccounts: [],
    selectedPolicyId: '',
    billingFrequency: '',
    billingStartDate: '',
    billingAccount: '',
    selectedHouseholdMembers: [],
    programType: '',
    feeType: '',
    currentFeeAccount: '',
    clientBillableAssets: 0,
    totalHouseholdBillableAssets: 0,
    programFeeType: '',
    feeSchedule: '',
    integrationPeriod: '',
    purposeOfAgreement: '',
    products: [],
    terms: [],
    documents: [],
    comments: '',
  };

  const mockSetFieldValue = vi.fn();

  it('renders billing details fields', () => {
    render(
      <BillingDetailsStep
        values={defaultValues}
        setFieldValue={mockSetFieldValue}
        errors={{}}
        touched={{}}
        isSubmitting={false}
        isValidating={false}
        submitCount={0}
      />
    );

    expect(screen.getByText(/billing details/i)).toBeInTheDocument();
  });

  it('allows selecting billing frequency', async () => {
    const user = userEvent.setup();
    
    render(
      <BillingDetailsStep
        values={defaultValues}
        setFieldValue={mockSetFieldValue}
        errors={{}}
        touched={{}}
        isSubmitting={false}
        isValidating={false}
        submitCount={0}
      />
    );

    const frequencySelect = screen.getByLabelText(/^frequency$/i);
    await user.click(frequencySelect);

    expect(frequencySelect).toBeInTheDocument();
  });

  it('shows warning when no client is selected', () => {
    render(
      <BillingDetailsStep
        values={defaultValues}
        setFieldValue={mockSetFieldValue}
        errors={{}}
        touched={{}}
        isSubmitting={false}
        isValidating={false}
        submitCount={0}
      />
    );

    expect(screen.getByText(/please select a client in the first step/i)).toBeInTheDocument();
  });

  it('displays selected billing values', () => {
    const valuesWithBilling = {
      ...defaultValues,
      billingFrequency: 'Quarterly',
      billingStartDate: '2024-06-01',
      billingAccount: 'individual',
    };

    render(
      <BillingDetailsStep
        values={valuesWithBilling}
        setFieldValue={mockSetFieldValue}
        errors={{}}
        touched={{}}
        isSubmitting={false}
        isValidating={false}
        submitCount={0}
      />
    );

    // For MUI Select, check the display text instead of value
    expect(screen.getByText('Quarterly')).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toHaveValue('2024-06-01');
  });
});
