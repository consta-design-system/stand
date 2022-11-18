import { atom } from '@reatom/core';
import React from 'react';

export const menuMdxAtom = atom<React.ReactNode | undefined>(undefined);

type AnchordItem = {
  label: string;
  href: string;
};

export const activeItemAtom = atom<AnchordItem | undefined>(undefined);
