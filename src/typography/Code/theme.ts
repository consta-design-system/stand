import { useAtom } from '@reatom/npm-react';

import { useMdxCodeContext } from '##/componets/MdxCode/context';
import { sizeAtomMapFabric } from '##/modules/adaptiveSize';

const getTheme = (
  size: string,
  inMdxCode?: boolean,
): Record<string, React.CSSProperties> => ({
  'code[class*="language-"]': {
    color: 'var(--color-typo-primary)',
    background: 'none',
    textShadow: '0 1px var(--color-bg-default)',
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    fontSize: `var(--size-text-${size})`,
    lineHeight: 'var(--line-height-text-m)',
    fontWeight: 'var(--font-weight-text-medium)',
    MozTabSize: 'var(--space-2xs)',
    OTabSize: 'var(--space-2xs)',
    tabSize: 'var(--space-2xs)',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: 'var(--color-typo-primary)',
    background: 'var(--color-bg-secondary)',
    textShadow: '0 1px var(--color-bg-default)',
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    fontSize: `var(--size-text-${size})`,
    lineHeight: 'var(--line-height-text-m)',
    fontWeight: 'var(--font-weight-text-medium)',
    MozTabSize: 'var(--space-2xs)',
    OTabSize: 'var(--space-2xs)',
    tabSize: 'var(--space-2xs)',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: inMdxCode
      ? 'var(--space-l)'
      : 'var(--space-m) calc(var(--space-m) * 2 + var(--space-xl)) var(--space-m) var(--space-m)',
    overflow: 'auto',
    borderRadius: 'var(--control-radius)',
  },
  'pre[class*="language-"]::-moz-selection': {
    textShadow: 'none',
    background: 'var(--color-bg-normal)',
  },
  'pre[class*="language-"] ::-moz-selection': {
    textShadow: 'none',
    background: 'var(--color-bg-normal)',
  },
  'code[class*="language-"]::-moz-selection': {
    textShadow: 'none',
    background: 'var(--color-bg-normal)',
  },
  'code[class*="language-"] ::-moz-selection': {
    textShadow: 'none',
    background: 'var(--color-bg-normal)',
  },
  'pre[class*="language-"]::selection': {
    textShadow: 'none',
    background: 'var(--color-bg-normal)',
  },
  'pre[class*="language-"] ::selection': {
    textShadow: 'none',
    background: 'var(--color-bg-normal)',
  },
  'code[class*="language-"]::selection': {
    textShadow: 'none',
    background: 'var(--color-bg-normal)',
  },
  'code[class*="language-"] ::selection': {
    textShadow: 'none',
    background: 'var(--color-bg-normal)',
  },
  ':not(pre) > code[class*="language-"]': {
    background: 'var(--color-bg-secondary)',
    padding: '.1em',
    borderRadius: '.3em',
    whiteSpace: 'normal',
  },
  'comment': {
    color: 'var(--color-typo-system)',
  },
  'prolog': {
    color: 'var(--color-typo-system)',
  },
  'doctype': {
    color: 'var(--color-typo-system)',
  },
  'cdata': {
    color: 'var(--color-typo-system)',
  },
  'punctuation': {
    color: 'var(--color-typo-ghost)',
  },
  'namespace': {
    opacity: '.7',
  },
  'property': {
    color: 'var(--color-typo-warning)',
  },
  'tag': {
    color: 'var(--color-typo-warning)',
  },
  'boolean': {
    color: 'var(--color-typo-warning)',
  },
  'number': {
    color: 'var(--color-typo-warning)',
  },
  'constant': {
    color: 'var(--color-typo-warning)',
  },
  'symbol': {
    color: 'var(--color-typo-warning)',
  },
  'deleted': {
    color: 'var(--color-typo-warning)',
  },
  'selector': {
    color: 'var(--color-typo-success)',
  },
  'attr-name': {
    color: 'var(--color-typo-success)',
  },
  'string': {
    color: 'var(--color-typo-success)',
  },
  'char': {
    color: 'var(--color-typo-success)',
  },
  'builtin': {
    color: 'var(--color-typo-success)',
  },
  'inserted': {
    color: 'var(--color-typo-success)',
  },
  'operator': {
    color: 'var(--color-typo-system)',
  },
  'entity': {
    color: 'var(--color-typo-system)',

    cursor: 'help',
  },
  'url': {
    color: 'var(--color-typo-system)',
  },
  '.language-css .token.string': {
    color: 'var(--color-typo-system)',
  },
  '.style .token.string': {
    color: 'var(--color-typo-system)',
  },
  'atrule': {
    color: 'var(--color-typo-link-minor)',
  },
  'attr-value': {
    color: 'var(--color-typo-link-minor)',
  },
  'keyword': {
    color: 'var(--color-typo-link-minor)',
  },
  'function': {
    color: 'var(--color-typo-alert)',
  },
  'class-name': {
    color: 'var(--color-typo-alert)',
  },
  'regex': {
    color: 'var(--color-typo-caution)',
  },
  'important': {
    color: 'var(--color-typo-caution)',
    fontWeight: 'bold',
  },
  'variable': {
    color: 'var(--color-typo-caution)',
  },
  'bold': {
    fontWeight: 'bold',
  },
  'italic': {
    fontStyle: 'italic',
  },
});

export const useTheme = () => {
  const [size] = useAtom(sizeAtomMapFabric.s);
  const inMdxCode = useMdxCodeContext();
  return getTheme(size, inMdxCode);
};
