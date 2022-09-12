import './LazyVariants.css';

import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import React, { lazy, memo, Suspense } from 'react';

import { ErrorBoundary } from '##/componets/ErrorBoundary';
import { cn } from '##/utils/bem';

const cnLazyVariants = cn('LazyVariants');

type LazyVariantsProps = { id: string };

const FallbackError = () => <div>Ошибка загрузки</div>;
const FallbackLoading = () => (
  <div className={cnLazyVariants('Loader')}>
    <ProgressSpin size="xl" />
  </div>
);

export const LazyVariantsPreseter: React.FC<LazyVariantsProps> = (props) => {
  const LazyVariants = lazy(
    () =>
      import(
        `../../stands/lazyDocs/${props.id.replace(/\W/g, '_')}_variants_tsx.tsx`
      ),
  );

  return (
    <Suspense fallback={<FallbackLoading />}>
      <LazyVariants />
    </Suspense>
  );
};

export const LazyVariants: React.FC<LazyVariantsProps> = memo(
  (props) => (
    <ErrorBoundary fallback={<FallbackError />}>
      <LazyVariantsPreseter {...props} />
    </ErrorBoundary>
  ),
  (prevProps, nextProps) => prevProps.id === nextProps.id,
);
