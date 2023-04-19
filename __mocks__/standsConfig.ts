import { libsPageConfig } from '../src';
import { ListCardBanner } from '../src/index';
import description from './description.mdx';

libsPageConfig({
  title: 'Обзор',
  description,
  extractLibs: ['portal'],
  groups: [
    {
      label: 'О дизайн-системе',
      renderList: ListCardBanner,
      maxCount: 0,
      sortOrder: 1,
      hiddenLabel: true,
    },
    {
      label: 'Основные библиотеки',
      maxCount: 2,
      buttonMore: true,
      initialOpen: true,
      sortOrder: 3,
    },
    {
      label: 'Как работать с Consta',
      maxCount: 2,
      buttonMore: true,
      sortOrder: 4,
    },
    {
      label: 'Портал',
      sortOrder: 4000,
    },
  ],
});
