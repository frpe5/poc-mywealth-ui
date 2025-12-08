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
  
  const mockFormikProps = {
    values: defaultValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValidating: false,
    submitCount: 0,
    setFieldValue: mockSetFieldValue,
    setFieldTouched: vi.fn(),
    setFieldError: vi.fn(),
    setErrors: vi.fn(),
    setTouched: vi.fn(),
    setValues: vi.fn(),
    setStatus: vi.fn(),
    setSubmitting: vi.fn(),
    validateForm: vi.fn(),
    validateField: vi.fn(),
    resetForm: vi.fn(),
    submitForm: vi.fn(),
    setFormikState: vi.fn(),
    handleSubmit: vi.fn(),
    handleReset: vi.fn(),
    handleBlur: vi.fn(),
    handleChange: vi.fn(),
    getFieldProps: vi.fn(),
    getFieldMeta: vi.fn(),
    getFieldHelpers: vi.fn(),
    dirty: false,
    isValid: true,
    initialValues: defaultValues,
    initialErrors: {},
    initialTouched: {},
    initialStatus: undefined,
    registerField: vi.fn(),
    unregisterField: vi.fn(),
  };

  it('renders billing details fields', () => {
    render(
      <BillingDetailsStep {...mockFormikProps} />
    );

    expect(screen.getByText(/billing details/i)).toBeInTheDocument();
  });

  it('allows selecting billing frequency', async () => {
    const user = userEvent.setup();
    
    render(
      <BillingDetailsStep {...mockFormikProps} />
    );

    const frequencySelect = screen.getByLabelText(/^frequency$/i);
    await user.click(frequencySelect);

    expect(frequencySelect).toBeInTheDocument();
  });

  it('shows warning when no client is selected', () => {
    render(
      <BillingDetailsStep {...mockFormikProps} />
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
      <BillingDetailsStep {...mockFormikProps} values={valuesWithBilling} />
    );

    // For MUI Select, check the display text instead of value
    expect(screen.getByText('Quarterly')).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toHaveValue('2024-06-01');
  });
});
