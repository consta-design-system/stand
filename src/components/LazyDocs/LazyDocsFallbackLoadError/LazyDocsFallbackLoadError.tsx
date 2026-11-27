import React from 'react';

import Image from '##/images/PageNotFound.image.svg';

import { LazyDocsFallbackError } from '../LazyDocsFallbackError';

export const LazyDocsFallbackLoadError = () => (
  <LazyDocsFallbackError
    image={Image}
    title="Страница не найдена"
    description="Информация была изменена или удалена. Обновите, пожалуйста, страницу."
  />
);
