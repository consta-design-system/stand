import './LazyPage.css';

import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import React, { lazy, memo, Suspense } from 'react';

import { ErrorBoundary } from '##/componets/ErrorBoundary';
import { cn } from '##/utils/bem';

const cnLazyPage = cn('LazyPage');

type LazyPageProps = { id: string };

const FallbackError = () => <div>раздел в разработке</div>;
const FallbackLoading = () => (
  <div className={cnLazyPage('Loader')}>
    <ProgressSpin size="xl" />
  </div>
);

export const LazyPagePreseter: React.FC<LazyPageProps> = ({ id }) => {
  console.log(`../../stands/lazyDocs/${id.replace(/\W/g, '_')}_page_tsx.tsx`);

  const Page = lazy(
    () =>
      import(`../../stands/lazyDocs/${id.replace(/\W/g, '_')}_page_tsx.tsx`),
  );

  return (
    <div className={cnLazyPage()}>
      <Suspense fallback={<FallbackLoading />}>
        <Page />
      </Suspense>
    </div>
  );
};

export const LazyPage: React.FC<LazyPageProps> = memo(
  (props) => (
    <ErrorBoundary fallback={<FallbackError />}>
      <LazyPagePreseter {...props} />
    </ErrorBoundary>
  ),
  (prevProps: LazyPageProps, nextProps: LazyPageProps) =>
    prevProps.id === nextProps.id,
);
