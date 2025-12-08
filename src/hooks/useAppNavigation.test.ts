import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppNavigation } from './useAppNavigation';
import { BrowserRouter } from 'react-router-dom';
import { createElement } from 'react';

describe('useAppNavigation', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => 
    createElement(BrowserRouter, null, children);

  it('returns navigation functions', () => {
    const { result } = renderHook(() => useAppNavigation(), { wrapper });
    
    expect(result.current.goToDashboard).toBeDefined();
    expect(result.current.goToCreateAgreement).toBeDefined();
    expect(result.current.goToAgreementDetails).toBeDefined();
    expect(result.current.goToModifyAgreement).toBeDefined();
    expect(result.current.goToPendingModifications).toBeDefined();
    expect(result.current.goBack).toBeDefined();
    expect(result.current.navigateTo).toBeDefined();
  });

  it('navigateTo changes route', () => {
    const { result } = renderHook(() => useAppNavigation(), { wrapper });
    
    act(() => {
      result.current.navigateTo('/dashboard');
    });
    
    expect(window.location.pathname).toBe('/dashboard');
  });

  it('goBack is defined', () => {
    const { result } = renderHook(() => useAppNavigation(), { wrapper });
    
    expect(result.current.goBack).toBeDefined();
    expect(typeof result.current.goBack).toBe('function');
  });

  it('goToAgreementDetails navigates with id', () => {
    const { result } = renderHook(() => useAppNavigation(), { wrapper });
    
    act(() => {
      result.current.goToAgreementDetails('123');
    });
    
    expect(window.location.pathname).toContain('123');
  });

  it('supports basePath parameter', () => {
    const { result } = renderHook(() => useAppNavigation('/app'), { wrapper });
    
    expect(result.current.navigateTo).toBeDefined();
  });
});
