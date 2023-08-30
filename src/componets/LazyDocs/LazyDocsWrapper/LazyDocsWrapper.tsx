import React from 'react';

import { ErrorBoundary } from '##/componets/ErrorBoundary';

import { LazyDocsFallbackCodeError } from '../LazyDocsFallbackCodeError';

export const LazyDocsWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <ErrorBoundary fallback={<LazyDocsFallbackCodeError />}>
    {children}
  </ErrorBoundary>
);
