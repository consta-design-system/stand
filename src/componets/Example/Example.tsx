import './Example.css';

import { cnMixCard } from '@consta/uikit/MixCard';
import { Text } from '@consta/uikit/Text';
import {
  getLastPoint,
  useComponentBreakpoints,
} from '@consta/uikit/useComponentBreakpoints';
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
      useComponentBreakpoints(rootRef, typeof col === 'object' ? col : {}),
    ) ||
    (typeof col !== 'object' && col);

  const Root = separately ? 'div' : ExampleFrame;
  const Item = separately ? ExampleFrame : 'div';

  const examples = mapExamples(
    getItemDescription,
    getItemLabel,
    getItemNode,
    getItemStatus,
    children,
    items,
  );

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
          <div className={cnExample('Node')}>{node}</div>
          {withInfo && (
            <div
              className={cnExample('Info', { withStatus: !!status, status })}
            >
              {label && (
                <Text
                  weight="semibold"
                  view={status && mapStatusToTextView[status]}
                >
                  {label}
                </Text>
              )}
              {description && (
                <Text size="s" view="secondary">
                  {description}
                </Text>
              )}
            </div>
          )}
        </Item>
      ))}
    </Root>
  );
};

export const Example = forwardRef(ExampleRender) as ExampleComponent;
