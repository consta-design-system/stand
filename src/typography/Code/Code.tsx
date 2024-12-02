import './Code.css';

import { classnames } from '@bem-react/classnames';
import { cnMixFocus } from '@consta/uikit/MixFocus';
import { cnMixScrollBar } from '@consta/uikit/MixScrollBar';
import React from 'react';
import { PrismLight as Highlight } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';

import { AnimateCopyButton } from '##/componets/AnimateCopyButton';
import { cn } from '##/utils/bem';

import { useTheme } from './theme';

Highlight.registerLanguage('css', css);
Highlight.registerLanguage('json', json);
Highlight.registerLanguage('tsx', tsx);
Highlight.registerLanguage('typescript', typescript);

const map: Record<string, boolean> = {
  css: true,
  json: true,
  tsx: true,
  typescript: true,
};

const getLanguage = (className: string | undefined) => {
  if (!className) {
    return 'tsx';
  }

  const language = className.replace('language-', '');

  if (map[language]) {
    return language;
  }

  return 'tsx';
};

const cnCode = cn('Code');

export const Code = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  const { children, className, ...otherProps } = props;

  const style = useTheme();
  const value = children?.toString() || '';

  if (className) {
    return (
      <div className={cnCode(null, [, className])}>
        <Highlight
          {...otherProps}
          style={style}
          language={getLanguage(className)}
          className={classnames(className, cnMixScrollBar())}
        >
          {value}
        </Highlight>
        {children && (
          <div className={cnCode('Copy')}>
            <AnimateCopyButton
              value={value}
              className={cnCode('CopyButton', [cnMixFocus()])}
            />
          </div>
        )}
      </div>
    );
  }
  return <code className={cnCode('Param')}>{children}</code>;
};
