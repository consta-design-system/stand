import { libsPageConfig } from '../src';
import { libsMenuConfig, ListCardBanner } from '../src/index';
import description from './description.mdx';

libsMenuConfig({
  groups: [
    {
      label: 'Отдельные компоненты',
      initialOpen: true,
    },
  ],
});

libsPageConfig({
  title: 'Обзор',
  description,
  extractLibs: ['portal'],
  groups: [
    {
      label: 'О дизайн-системе',
      renderList: ListCardBanner,
      maxCount: 1,
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
