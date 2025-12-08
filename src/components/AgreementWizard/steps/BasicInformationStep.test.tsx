import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import BasicInformationStep from './BasicInformationStep';
import { CreateAgreementFormValues } from '../../../types';

describe('BasicInformationStep', () => {
  const defaultValues: CreateAgreementFormValues = {
    clientId: '',
    clientName: '',
    agreementType: '',
    startDate: '2024-01-01',
    endDate: '',
    selectedAccounts: [],
    selectedPolicyId: '',
    billingFrequency: 'Quarterly',
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

  const mockFormikHelpers = {
    values: defaultValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValidating: false,
    submitCount: 0,
    setFieldValue: vi.fn(),
    setFieldTouched: vi.fn(),
    setFieldError: vi.fn(),
    setStatus: vi.fn(),
    setErrors: vi.fn(),
    setSubmitting: vi.fn(),
    setTouched: vi.fn(),
    setValues: vi.fn(),
    setFormikState: vi.fn(),
    validateForm: vi.fn().mockResolvedValue({}),
    validateField: vi.fn(),
    resetForm: vi.fn(),
    submitForm: vi.fn(),
    setFieldHelpers: vi.fn(),
    handleSubmit: vi.fn(),
    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    handleReset: vi.fn(),
    getFieldProps: vi.fn(),
    getFieldMeta: vi.fn(),
    getFieldHelpers: vi.fn(),
    registerField: vi.fn(),
    unregisterField: vi.fn(),
    dirty: false,
    isValid: true,
    initialValues: defaultValues,
    initialErrors: {},
    initialTouched: {},
    initialStatus: undefined,
    status: undefined,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: false,
  };

  it('renders all basic information fields', () => {
    render(
      <BasicInformationStep
        {...mockFormikHelpers}
      />
    );

    expect(screen.getByText(/client details/i)).toBeInTheDocument();
    expect(screen.getByText(/search client/i)).toBeInTheDocument();
    expect(screen.getByText(/select a program/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by name or email/i)).toBeInTheDocument();
  });

  it('allows entering client search text', async () => {
    const user = userEvent.setup();
    
    render(
      <BasicInformationStep
        {...mockFormikHelpers}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search by name or email/i);
    await user.type(searchInput, 'John');

    expect(searchInput).toHaveValue('John');
  }, 10000);

  it('allows selecting agreement type', async () => {
    const user = userEvent.setup();
    
    render(
      <BasicInformationStep
        {...mockFormikHelpers}
      />
    );

    const wealthManagementOption = screen.getByText('Wealth Management');
    await user.click(wealthManagementOption);

    expect(mockFormikHelpers.setFieldValue).toHaveBeenCalledWith('agreementType', 'Wealth Management');
  });

  it('displays search button as disabled when no client selected', () => {
    render(
      <BasicInformationStep
        {...mockFormikHelpers}
      />
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeDisabled();
  });

  it('enables search button when client is selected', () => {
    const valuesWithClient = {
      ...defaultValues,
      clientId: '123',
      clientName: 'Jane Smith',
    };

    render(
      <BasicInformationStep
        {...mockFormikHelpers}
        values={valuesWithClient}
      />
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).not.toBeDisabled();
  });
});
