import './Code.css';

import { IconAllDone } from '@consta/icons/IconAllDone';
import { IconCopy } from '@consta/icons/IconCopy';
import { cnMixFocus } from '@consta/uikit/MixFocus';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useRef } from 'react';
import { PrismLight as Highlight } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import { CSSTransition } from 'react-transition-group';

import { cn } from '##/utils/bem';
import { cnForCssTransition } from '##/utils/cnForCssTransition';

import { theme } from './theme';

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
const cssTransitionClassNames = cnForCssTransition(cnCode, 'Icon');
const animateTimeout = 300;

const CopyButton = (props: {
  copied?: boolean;
  onClick: React.MouseEventHandler;
}) => {
  const { copied, onClick } = props;
  const iconRef = useRef<HTMLSpanElement>(null);
  const copiedRef = useRef<HTMLSpanElement>(null);

  return (
    <div className={cnCode('Copy')}>
      <button
        type="button"
        onClick={onClick}
        className={cnCode('CopyButton', [cnMixFocus()])}
      >
        <CSSTransition
          in={!copied}
          unmountOnExit
          classNames={cssTransitionClassNames}
          timeout={animateTimeout}
          nodeRef={iconRef}
        >
          <IconCopy
            className={cnCode('Icon', { withCloseIcon: true })}
            size="xs"
            ref={iconRef}
          />
        </CSSTransition>
        <CSSTransition
          in={copied}
          unmountOnExit
          classNames={cssTransitionClassNames}
          timeout={animateTimeout}
          nodeRef={copiedRef}
        >
          <IconAllDone
            className={cnCode('Icon', { withCloseIcon: true })}
            size="xs"
            ref={copiedRef}
          />
        </CSSTransition>
      </button>
    </div>
  );
};

export const Code = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  const { children, className, ...otherProps } = props;
  const [copied, setCopied] = useFlag();

  const handleClick = () => {
    if (children) {
      navigator.clipboard.writeText(children?.toString());
    }
    setCopied.on();
    setTimeout(setCopied.off, 2000);
  };

  if (className) {
    return (
      <div className={cnCode(null, [className])}>
        <Highlight
          {...otherProps}
          style={theme}
          language={getLanguage(className)}
          className={className}
        >
          {children?.toString() ?? ''}
        </Highlight>
        <CopyButton copied={copied} onClick={handleClick} />
      </div>
    );
  }
  return <code className={cnCode('Param')}>{children}</code>;
};
