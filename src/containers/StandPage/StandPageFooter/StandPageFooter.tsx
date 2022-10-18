import './StandPageFooter.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';

import { useFooter } from './helpers';

type Props = {
  className?: string;
};

const cnStandPageFooter = cn('StandPageFooter');

export const StandPageFooter = (props: Props) => {
  const { className } = props;
  const { componentUrl, docsUrl } = useFooter();

  return (
    <div className={cnStandPageFooter(null, [className])}>
      {/* {onSPAClick && (
        <div className={cnStandPageFooter('SPA')}>
          <Text size="2xl" lineHeight="m" weight="semibold">
            Полезная информация?
          </Text>
          <div className={cnStandPageFooter('Buttons')}>
            <Button
              label="Нет"
              size="l"
              view="ghost"
              onClick={() => onSPAClick('cancel')}
            />
            <Button
              label="Да"
              size="l"
              view="ghost"
              onClick={() => onSPAClick('success')}
            />
          </div>
        </div>
      )} */}
      <div className={cnStandPageFooter('Container')}>
        <Text size="l" lineHeight="l" weight="bold">
          Открытая дизайн-система
        </Text>
        <div className={cnStandPageFooter('Links')}>
          <Text size="m" lineHeight="m">
            Предлагайте доработки — будем рады контрибьюторам.
          </Text>
          {(componentUrl || docsUrl) && (
            <div>
              {componentUrl && (
                <Text
                  as="a"
                  view="link"
                  href={componentUrl}
                  size="m"
                  lineHeight="m"
                  display="block"
                >
                  Этот компонент на GitHub
                </Text>
              )}
              {docsUrl && (
                <Text
                  display="block"
                  as="a"
                  view="link"
                  href={docsUrl}
                  size="m"
                  lineHeight="m"
                >
                  Эта страница на GitHub
                </Text>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
