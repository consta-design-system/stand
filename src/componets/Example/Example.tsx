import './Example.css';

import { cnMixCard } from '@consta/uikit/MixCard';
import { Text } from '@consta/uikit/Text';
import { getLastPoint, useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useForkRef } from '@consta/uikit/useForkRef';
import React, { forwardRef, useRef } from 'react';

import { ExampleFrame } from '##/componets/ExampleFrame';
import { cn } from '##/utils/bem';

import {
  getCol,
  getDisplay,
  isWithInfo,
  mapExamples,
  mapStatusToTextView,
  withDefaultGetters,
} from './helpers';
import { ExampleComponent, ExampleProps } from './types';

export const cnExample = cn('Example');

const ExampleRender = (rest: ExampleProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    className,
    col,
    style,
    separately,
    items,
    getItemDescription,
    getItemLabel,
    getItemNode,
    getItemStatus,
    ...otherProps
  } = withDefaultGetters(rest);

  const rootRef = useRef(null);

  const lastPoint =
    getLastPoint(
      useBreakpoints({
        ref: rootRef,
        map: typeof col === 'object' ? col : {},
        isActive: true,
      }),
    ) ||
    (typeof col !== 'object' && col);

  const examples = mapExamples(
    getItemDescription,
    getItemLabel,
    getItemNode,
    getItemStatus,
    children,
    items,
  );

  const Frame = examples.find((item) => !!item.node) ? ExampleFrame : 'div';
  const Root = separately ? 'div' : Frame;
  const Item = separately ? Frame : 'div';

  const withInfo = isWithInfo(examples);

  return (
    <Root
      {...otherProps}
      className={cnExample({ display: getDisplay(lastPoint), separately }, [
        className,
        separately ? undefined : cnMixCard({ border: true }),
        separately ? undefined : cnExample('Frame'),
      ])}
      style={{
        ['--example-col' as string]: getCol(lastPoint),
        ...style,
      }}
      ref={useForkRef([ref, rootRef])}
    >
      {examples.map(({ node, label, description, status }, index) => (
        <Item
          key={index}
          className={cnExample(
            'Item',
            {
              withInfo,
            },
            [
              separately ? cnMixCard({ border: true }) : undefined,
              separately ? cnExample('Frame') : undefined,
            ],
          )}
        >
          {node && <div className={cnExample('Node')}>{node}</div>}
          {withInfo && (
            <div
              className={cnExample('Info', {
                withStatus: status && typeof node !== 'undefined',
                status,
              })}
            >
              {label && (
                <Text
                  weight="semibold"
                  view={status && mapStatusToTextView[status]}
                  size="m"
                  lineHeight="m"
                >
                  {label}
                </Text>
              )}
              {typeof description === 'string' && (
                <Text size="s" view="secondary" lineHeight="m">
                  {description}
                </Text>
              )}
              {typeof description !== 'string' && description}
            </div>
          )}
        </Item>
      ))}
    </Root>
  );
};

export const Example = forwardRef(ExampleRender) as ExampleComponent;
