import './LazyDocsFallbackLoading.css';

import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import React from 'react';

import { cn } from '##/utils/bem';

const cnLazyDocsFallbackLoading = cn('LazyDocsFallbackLoading');

export const LazyDocsFallbackLoading = () => (
  <div className={cnLazyDocsFallbackLoading()}>
    <ProgressSpin size="xl" />
  </div>
);
