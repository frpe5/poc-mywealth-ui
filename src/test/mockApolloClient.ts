import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockLink } from '../mocks/MockLink';

/**
 * Creates a mock Apollo Client for testing
 * Uses the MockLink with zero delay for fast test execution
 */
export function createMockApolloClient() {
  // Ensure no delay in tests for fast execution
  const mockLink = new MockLink({ delay: 0 });

  return new ApolloClient({
    link: mockLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });
}

/**
 * Helper to create a custom Apollo Client for specific test scenarios
 */
export function createCustomMockApolloClient() {
  // Ensure no delay in tests for fast execution
  const mockLink = new MockLink({ delay: 0 });

  return new ApolloClient({
    link: mockLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });
}
