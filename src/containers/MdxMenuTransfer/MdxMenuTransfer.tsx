import './MdxMenuTransfer.css';

import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/react';
import React, { useMemo } from 'react';
import { useRoute } from 'react-router5';

import { menuMdxAtom } from '##/modules/menuMdx';
import { cn } from '##/utils/bem';

const cnMdxMenuTransfer = cn('MdxMenuTransfer');

export const MdxMenuTransfer = () => {
  const [menuMdx] = useAtom(menuMdxAtom);

  const { route } = useRoute();

  const activeLinkStyle = useMemo(() => {
    return route.params?.hash
      ? `.${cnMdxMenuTransfer('Menu')} a[href$="${encodeURI(
          route.params?.hash,
        )}"] {
        color: var(--color-typo-link);
      }`
      : undefined;
  }, [route.params?.hash]);

  if (!menuMdx) {
    return null;
  }

  return (
    <div className={cnMdxMenuTransfer()}>
      {activeLinkStyle && <style>{activeLinkStyle}</style>}
      <Text
        size="xs"
        lineHeight="s"
        view="ghost"
        transform="uppercase"
        weight="semibold"
        className={cnMdxMenuTransfer('Header')}
      >
        Содержание
      </Text>
      <div className={cnMdxMenuTransfer('Menu')}>{menuMdx}</div>
    </div>
  );
};
