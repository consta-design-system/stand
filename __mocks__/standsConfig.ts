import { libsPageConfig } from '../src';
import { ListCardList } from '../src/index';
import description from './description.mdx';

libsPageConfig({
  title: 'Обзор',
  description,
  extractLibs: ['portal'],
  groups: [
    {
      label: 'Портал',
      renderList: ListCardList,
      maxCount: 2,
      buttonMore: true,
    },
    {
      label: 'О дизайн-системе',
      maxCount: 1,
      buttonMore: false,
      hiddenLabel: true,
    },
    {
      label: 'Основные библиотеки',
      maxCount: 2,
      buttonMore: true,
    },
    {
      label: 'Как работать с Consta',
      maxCount: 2,
      buttonMore: true,
    },
  ],
});
