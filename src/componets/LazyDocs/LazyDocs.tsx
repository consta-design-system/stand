import './LazyDocs.css';

import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import React, { lazy, memo, Suspense } from 'react';

import { ErrorBoundary } from '##/componets/ErrorBoundary';
import { cn } from '##/utils/bem';

const cnLazyDocs = cn('LazyDocs');

type LazyDocsProps = { id: string };

const FallbackError = () => <div>раздел в разработке</div>;
const FallbackLoading = () => (
  <div className={cnLazyDocs('Loader')}>
    <ProgressSpin size="xl" />
  </div>
);

export const LazyDocsPreseter: React.FC<LazyDocsProps> = ({ id }) => {
  const Docs = lazy(
    () =>
      import(`../../stands/lazyDocs/${id.replace(/\W/g, '_')}_stand_mdx.tsx`),
  );

  return (
    <div className={cnLazyDocs()}>
      <Suspense fallback={<FallbackLoading />}>
        <Docs />
      </Suspense>
    </div>
  );
};

export const LazyDocs: React.FC<LazyDocsProps> = memo(
  (props) => (
    <ErrorBoundary fallback={<FallbackError />}>
      <LazyDocsPreseter {...props} />
    </ErrorBoundary>
  ),
  (prevProps: LazyDocsProps, nextProps: LazyDocsProps) =>
    prevProps.id === nextProps.id,
);
