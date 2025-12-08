import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockLink } from '../mocks/MockLink';
import { mockResolvers } from '../mocks/mockResolvers';

/**
 * Creates a mock Apollo Client for testing
 * Uses the same MockLink and resolvers as the main application
 */
export function createMockApolloClient() {
  const mockLink = new MockLink(mockResolvers);

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
 * Helper to create a custom Apollo Client with specific mock data or resolvers
 */
export function createCustomMockApolloClient(customResolvers?: any) {
  const resolvers = customResolvers || mockResolvers;
  const mockLink = new MockLink(resolvers);

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
