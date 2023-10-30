import './Code.css';

import { cnMixFocus } from '@consta/uikit/MixFocus';
import { useFlag } from '@consta/uikit/useFlag';
import React from 'react';
import { PrismLight as Highlight } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';

import { AnimateCopyButton } from '##/componets/AnimateCopyButton';
import { useMdxCodeContext } from '##/componets/MdxCode/context';
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
  const [copied, setCopied] = useFlag();

  const inMdxCode = useMdxCodeContext();

  const handleClick = () => {
    if (children) {
      navigator.clipboard.writeText(children?.toString());
    }
    setCopied.on();
    setTimeout(setCopied.off, 2000);
  };

  const style = useTheme();

  if (className) {
    return (
      <div className={cnCode(null, [className])}>
        <Highlight
          {...otherProps}
          style={style}
          language={getLanguage(className)}
          className={className}
        >
          {children?.toString() ?? ''}
        </Highlight>
        {!inMdxCode && (
          <div className={cnCode('Copy')}>
            <AnimateCopyButton
              copied={copied}
              onClick={handleClick}
              className={cnCode('CopyButton', [cnMixFocus()])}
            />
          </div>
        )}
      </div>
    );
  }
  return <code className={cnCode('Param')}>{children}</code>;
};
