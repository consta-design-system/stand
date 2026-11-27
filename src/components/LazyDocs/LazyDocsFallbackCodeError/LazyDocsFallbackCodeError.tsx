import React from 'react';

import Image from '##/images/PageBug.image.svg';

import { LazyDocsFallbackError } from '../LazyDocsFallbackError';

export const LazyDocsFallbackCodeError = () => (
  <LazyDocsFallbackError
    image={Image}
    title="Что-то сломалось"
    description="Вероятно в код закралась ошибка. Сообщите нам о неполадках, создав в GitHub issue на Bug report."
  />
);
