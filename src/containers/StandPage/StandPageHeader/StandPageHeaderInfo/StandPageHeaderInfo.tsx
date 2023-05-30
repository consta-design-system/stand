import './StandPageHeaderInfo.css';

import { IconAlert } from '@consta/icons/IconAlert';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { Link } from '##/componets/Link';
import { gapAtomMapFabric, sizeAtomMapFabric } from '##/modules/adaptiveSize';
import { standHeaderIconViewAtom, standHeaderInfoAtom } from '##/modules/stand';
import { cn } from '##/utils/bem';

type Props = {
  className?: string;
};

const cnStandPageHeaderInfo = cn('StandPageHeaderInfo');

export const StandPageHeaderInfo = (props: Props) => {
  const { className } = props;

  const [gapXs] = useAtom(gapAtomMapFabric.xs);
  const [sizeS] = useAtom(sizeAtomMapFabric.s);
  const [info] = useAtom(standHeaderInfoAtom);
  const [view] = useAtom(standHeaderIconViewAtom);

  if (!info) {
    return null;
  }

  const { title, description, link, linkLabel } = info;

  console.log(info);

  return (
    <div
      className={cnStandPageHeaderInfo(
        { withDescription: !!info.description },
        [className, cnMixSpace({ p: 's' })],
      )}
    >
      <IconAlert
        size="s"
        view={view}
        className={cnStandPageHeaderInfo('Icon', [
          cnMixSpace({ mR: 's', mT: description ? '3xs' : undefined }),
        ])}
      />
      <div className={cnStandPageHeaderInfo('Content')}>
        <Text weight="bold" size={sizeS} lineHeight="xs">
          {title}
        </Text>
        {description && (
          <Text
            size={sizeS}
            lineHeight="m"
            className={cnStandPageHeaderInfo('Description', [
              cnMixSpace({ mT: gapXs }),
            ])}
          >
            {description}{' '}
            {link && linkLabel && (
              <Link to={link.name} params={link.params}>
                {linkLabel}
              </Link>
            )}
          </Text>
        )}
      </div>
    </div>
  );
};
