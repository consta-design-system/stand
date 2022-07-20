import { createPrimitiveAtom } from '@reatom/core/primitives';

type AnchordItem = {
  label: string;
  href: string;
};

export const activeItemAtom = createPrimitiveAtom<AnchordItem | undefined>(undefined);
