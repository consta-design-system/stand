import './LazyDocs.css';

import { MDXComponents } from 'mdx/types';
import React, { lazy, memo, Suspense } from 'react';

import { ErrorBoundary } from '##/componets/ErrorBoundary';
import { components } from '##/typography';
import { cn } from '##/utils/bem';

import { LazyDocsFallbackLoadError } from './LazyDocsFallbackLoadError';
import { LazyDocsFallbackLoading } from './LazyDocsFallbackLoading';
import { LazyDocsWrapper } from './LazyDocsWrapper';

const cnLazyDocs = cn('LazyDocs');

const Loader: React.FC<{ id: string }> = ({ id }) => {
  const Docs: React.FC<{
    wrapper: React.FC<{ children: React.ReactNode }>;
    components: MDXComponents;
  }> = lazy(
    () =>
      import(`../../stands/lazyDocs/${id.replace(/\W/g, '_')}_stand_mdx.tsx`),
  );

  return (
    <div className={cnLazyDocs()}>
      <Suspense fallback={<LazyDocsFallbackLoading />}>
        <Docs wrapper={LazyDocsWrapper} components={components} />
      </Suspense>
    </div>
  );
};

export const LazyDocs: React.FC<{ id: string }> = memo(
  (props) => (
    <ErrorBoundary fallback={<LazyDocsFallbackLoadError />}>
      <Loader {...props} />
    </ErrorBoundary>
  ),
  (prevProps, nextProps) => prevProps.id === nextProps.id,
);
