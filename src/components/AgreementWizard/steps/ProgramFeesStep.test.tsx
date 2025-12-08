import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/testUtils';
import ProgramFeesStep from './ProgramFeesStep';
import { CreateAgreementFormValues } from '../../../types';

describe('ProgramFeesStep', () => {
  const defaultValues: CreateAgreementFormValues = {
    clientId: '',
    clientName: 'Test Client',
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

  it('renders all program fees fields', () => {
    render(
      <ProgramFeesStep
        {...mockFormikHelpers}
      />
    );

    expect(screen.getByText(/program fees/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fee schedule/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/program fee type/i)).toBeInTheDocument();
  });

  it('does not show "0" when client billable assets is empty', () => {
    render(
      <ProgramFeesStep
        {...mockFormikHelpers}
      />
    );

    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('displays fee schedule options correctly', () => {
    render(
      <ProgramFeesStep
        {...mockFormikHelpers}
      />
    );

    expect(screen.getByLabelText(/fee schedule/i)).toBeInTheDocument();
  });
});

