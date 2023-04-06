import { atom } from '@reatom/core';
import { useAtom } from '@reatom/npm-react';
import { MDXComponents } from 'mdx/types';

export const mdxComponentsAtom = atom<MDXComponents>({});

export const useMdxComponents = () => useAtom(mdxComponentsAtom)[0];
