import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatFileSize,
  truncateString,
  generateAgreementNumber,
  calculatePercentage,
  isValidEmail,
  isValidPhone,
  capitalizeFirstLetter,
  getInitials,
} from './helpers';

describe('helpers utilities', () => {
  describe('formatCurrency', () => {
    it('formats number as USD currency', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(500000)).toBe('$500,000.00');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('handles decimal values', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(99.99)).toBe('$99.99');
    });

    it('handles negative values', () => {
      expect(formatCurrency(-1000)).toBe('-$1,000.00');
    });

    it('handles very large numbers', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('supports different currencies', () => {
      expect(formatCurrency(1000, 'EUR')).toContain('1,000.00');
    });
  });

  describe('formatDate', () => {
    it('formats date string', () => {
      const result = formatDate('2024-01-15T12:00:00');
      expect(result).toContain('2024');
      expect(result).toContain('Jan');
    });

    it('handles empty string', () => {
      expect(formatDate('')).toBe('-');
    });

    it('returns original string for invalid dates', () => {
      const invalid = 'not-a-date';
      const result = formatDate(invalid);
      expect(result).toBe(invalid);
    });
  });

  describe('formatDateTime', () => {
    it('formats date and time string', () => {
      const result = formatDateTime('2024-01-15T10:30:00');
      expect(result).toContain('Jan 15, 2024');
      expect(result).toContain('10:30');
    });

    it('handles empty string', () => {
      expect(formatDateTime('')).toBe('-');
    });
  });

  describe('formatFileSize', () => {
    it('formats bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });

    it('formats partial sizes', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB');
      expect(formatFileSize(2621440)).toBe('2.5 MB');
    });
  });

  describe('truncateString', () => {
    it('truncates long strings', () => {
      expect(truncateString('This is a long string', 10)).toBe('This is a ...');
    });

    it('does not truncate short strings', () => {
      expect(truncateString('Short', 10)).toBe('Short');
    });

    it('handles exact length', () => {
      expect(truncateString('Exact', 5)).toBe('Exact');
    });
  });

  describe('generateAgreementNumber', () => {
    it('generates unique agreement numbers', () => {
      const num1 = generateAgreementNumber();
      const num2 = generateAgreementNumber();
      
      expect(num1).toMatch(/^AGR-/);
      expect(num2).toMatch(/^AGR-/);
      expect(num1).not.toBe(num2);
    });
  });

  describe('calculatePercentage', () => {
    it('calculates percentage correctly', () => {
      expect(calculatePercentage(50, 100)).toBe(50);
      expect(calculatePercentage(25, 200)).toBe(13);
      expect(calculatePercentage(75, 150)).toBe(50);
    });

    it('handles zero total', () => {
      expect(calculatePercentage(50, 0)).toBe(0);
    });

    it('rounds to nearest integer', () => {
      expect(calculatePercentage(1, 3)).toBe(33);
      expect(calculatePercentage(2, 3)).toBe(67);
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });

    it('handles empty strings', () => {
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('validates correct phone numbers', () => {
      expect(isValidPhone('514-555-0101')).toBe(true);
      expect(isValidPhone('(514) 555-0101')).toBe(true);
      expect(isValidPhone('+1 514 555 0101')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('abc')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('capitalizes first letter', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('WORLD')).toBe('World');
    });

    it('handles single character', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
    });

    it('handles empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });
  });

  describe('getInitials', () => {
    it('gets initials from name', () => {
      expect(getInitials('John Smith')).toBe('JS');
      expect(getInitials('Mary Jane Watson')).toBe('MJ');
    });

    it('handles single name', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('handles multiple names', () => {
      expect(getInitials('John Paul George Ringo')).toBe('JP');
    });
  });
});
