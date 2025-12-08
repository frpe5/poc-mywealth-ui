import { expect } from 'vitest';

/**
 * Custom test matchers and helper functions
 */

/**
 * Wait for a condition to be true with timeout
 */
export async function waitForCondition(
  condition: () => boolean,
  timeout = 3000,
  interval = 100
): Promise<void> {
  const startTime = Date.now();
  
  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
}

/**
 * Helper to fill a Formik form field
 */
export async function fillFormField(
  input: HTMLElement,
  value: string,
  user: any
) {
  await user.clear(input);
  await user.type(input, value);
}

/**
 * Helper to select a dropdown option in Material-UI Select
 */
export async function selectDropdownOption(
  labelText: string | RegExp,
  optionText: string | RegExp,
  user: any,
  screen: any
) {
  const selectElement = screen.getByLabelText(labelText);
  await user.click(selectElement);
  
  const option = screen.getByText(optionText);
  await user.click(option);
}

/**
 * Helper to check if an element has a specific attribute value
 */
export function expectAttribute(
  element: HTMLElement,
  attribute: string,
  value: string
) {
  expect(element.getAttribute(attribute)).toBe(value);
}

/**
 * Helper to verify that an element contains specific text
 */
export function expectTextContent(element: HTMLElement, text: string | RegExp) {
  if (typeof text === 'string') {
    expect(element.textContent).toContain(text);
  } else {
    expect(element.textContent).toMatch(text);
  }
}

/**
 * Helper to verify form validation errors
 */
export function expectValidationError(container: HTMLElement, errorMessage: string | RegExp) {
  const errorElement = container.querySelector('.MuiFormHelperText-root.Mui-error');
  if (errorElement) {
    if (typeof errorMessage === 'string') {
      expect(errorElement.textContent).toContain(errorMessage);
    } else {
      expect(errorElement.textContent).toMatch(errorMessage);
    }
  } else {
    throw new Error('No validation error found');
  }
}

/**
 * Helper to get all table rows (excluding header)
 */
export function getTableDataRows(container: HTMLElement): HTMLElement[] {
  const rows = Array.from(container.querySelectorAll('tbody tr'));
  return rows as HTMLElement[];
}

/**
 * Helper to get specific cell from a table row
 */
export function getCellValue(row: HTMLElement, cellIndex: number): string {
  const cells = row.querySelectorAll('td');
  return cells[cellIndex]?.textContent || '';
}

/**
 * Helper to verify currency formatting
 */
export function expectCurrencyFormat(value: string, expectedAmount: number) {
  // Remove $ and , and convert to number
  const cleanValue = value.replace(/[$,]/g, '');
  const numericValue = parseFloat(cleanValue);
  expect(numericValue).toBe(expectedAmount);
}

/**
 * Helper to verify date formatting
 */
export function expectDateFormat(dateString: string, format: 'MM/DD/YYYY' | 'YYYY-MM-DD' = 'MM/DD/YYYY') {
  if (format === 'MM/DD/YYYY') {
    expect(dateString).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  } else {
    expect(dateString).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
}

/**
 * Mock localStorage for testing
 */
export function mockLocalStorage() {
  const storage: { [key: string]: string } = {};
  
  return {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach(key => delete storage[key]);
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: (index: number) => {
      const keys = Object.keys(storage);
      return keys[index] || null;
    },
  };
}

/**
 * Helper to simulate file upload
 */
export async function uploadFile(
  input: HTMLInputElement,
  file: File,
  user: any
) {
  await user.upload(input, file);
}

/**
 * Helper to create a mock file
 */
export function createMockFile(
  name: string,
  size: number,
  type: string
): File {
  const blob = new Blob(['a'.repeat(size)], { type });
  return new File([blob], name, { type });
}

/**
 * Helper to check if element is visible
 */
export function isVisible(element: HTMLElement): boolean {
  return element.offsetParent !== null && 
         getComputedStyle(element).visibility !== 'hidden' &&
         getComputedStyle(element).display !== 'none';
}

/**
 * Helper to check if button is disabled
 */
export function isButtonDisabled(button: HTMLElement): boolean {
  return button.hasAttribute('disabled') || 
         button.getAttribute('aria-disabled') === 'true';
}

/**
 * Test data generators
 */
export const testDataGenerators = {
  createAgreementFormValues: (overrides = {}) => ({
    clientName: 'Test Client',
    accountType: 'Individual',
    status: 'Draft',
    startDate: new Date('2024-01-01'),
    investmentObjective: 'Growth',
    riskTolerance: 'Moderate',
    totalAssets: 500000,
    product: 'Managed Account',
    billingFrequency: 'Quarterly',
    paymentMethod: 'Direct Debit',
    terms: 'Standard Terms',
    notes: '',
    feeSchedule: 'UMOB',
    clientBillableAssets: 250000,
    totalHouseholdBillableAssets: 250000,
    wealthPlanningServices: false,
    estatePlanningServices: false,
    taxPlanningServices: false,
    ...overrides,
  }),

  createMockAgreement: (overrides = {}) => ({
    id: 'AGR-001',
    clientName: 'John Doe',
    accountType: 'Individual',
    status: 'Active',
    startDate: new Date('2024-01-01'),
    totalAssets: 500000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    ...overrides,
  }),
};

/**
 * Async helpers
 */
export const asyncHelpers = {
  /**
   * Wait for element to appear
   */
  waitForElement: async (
    getElement: () => HTMLElement | null,
    timeout = 3000
  ): Promise<HTMLElement> => {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const element = getElement();
      if (element) return element;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error('Element not found within timeout');
  },

  /**
   * Wait for element to disappear
   */
  waitForElementToDisappear: async (
    getElement: () => HTMLElement | null,
    timeout = 3000
  ): Promise<void> => {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const element = getElement();
      if (!element) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error('Element still present after timeout');
  },
};
