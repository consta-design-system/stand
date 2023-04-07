import React, { lazy, memo, Suspense } from 'react';

import { ErrorBoundary } from '##/componets/ErrorBoundary';
import { Image } from '##/componets/Image';
import NoImage from '##/images/NoImage.image.svg';

type LazyImageProps = { id: string; className?: string };

const Fallback = (props: { className?: string }) => (
  <Image src={NoImage} className={props.className} />
);

export const LazyImagePreseter: React.FC<LazyImageProps> = ({
  id,
  className,
}) => {
  const LazyImage = lazy(
    () => import(`../../stands/lazyDocs/${id.replace(/\W/g, '_')}.tsx`),
  );

  return (
    <Suspense fallback={<Fallback className={className} />}>
      <Image src={LazyImage} className={className} />
    </Suspense>
  );
};

export const LazyImage: React.FC<LazyImageProps> = memo(
  (props) => (
    <ErrorBoundary fallback={<Fallback className={props.className} />}>
      <LazyImagePreseter {...props} />
    </ErrorBoundary>
  ),
  (prevProps, nextProps) => prevProps.id === nextProps.id,
);
