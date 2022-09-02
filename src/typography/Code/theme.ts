export const theme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: 'var(--color-typo-primary)',
    fontFamily:
      '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    fontSize: 'var(--size-text-m)',
    lineHeight: 'var(--line-height-text-m)',
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
    fontFamily:
      '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    fontSize: 'var(--size-text-m)',
    lineHeight: 'var(--line-height-text-m)',
    MozTabSize: 'var(--space-2xs)',
    OTabSize: 'var(--space-2xs)',
    tabSize: 'var(--space-2xs)',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
    borderRadius: 'var(--control-radius)',
    backgroundColor: 'var(--color-bg-default)',
  },
  'pre > code[class*="language-"]': {
    fontSize: 'var(--size-text-m)',
  },
  'pre[class*="language-"]::-moz-selection': {
    background: 'var(--color-typo-ghost)',
  },
  'pre[class*="language-"] ::-moz-selection': {
    background: 'var(--color-typo-ghost)',
  },
  'code[class*="language-"]::-moz-selection': {
    background: 'var(--color-typo-ghost)',
  },
  'code[class*="language-"] ::-moz-selection': {
    background: 'var(--color-typo-ghost)',
  },
  'pre[class*="language-"]::selection': {
    background: 'var(--color-typo-ghost)',
  },
  'pre[class*="language-"] ::selection': {
    background: 'var(--color-typo-ghost)',
  },
  'code[class*="language-"]::selection': {
    background: 'var(--color-typo-ghost)',
  },
  'code[class*="language-"] ::selection': {
    background: 'var(--color-typo-ghost)',
  },
  ':not(pre) > code[class*="language-"]': {
    padding: 'var(--space-3xs)',
    paddingTop: '1px',
    paddingBottom: '1px',
    background: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-control-bg-border-default)',
  },
  'comment': {
    color: 'var(--color-typo-success)',
    fontStyle: 'italic',
  },
  'prolog': {
    color: 'var(--color-typo-success)',
    fontStyle: 'italic',
  },
  'doctype': {
    color: 'var(--color-typo-success)',
    fontStyle: 'italic',
  },
  'cdata': {
    color: 'var(--color-typo-success)',
    fontStyle: 'italic',
  },
  'namespace': {
    opacity: '.7',
  },
  'string': {
    color: 'var(--color-typo-alert)',
  },
  'punctuation': {
    color: 'var(--color-typo-secondary)',
  },
  'operator': {
    color: 'var(--color-typo-secondary)',
  },
  'url': {
    color: 'var(--color-typo-link-minor)',
  },
  'symbol': {
    color: 'var(--color-typo-link-minor)',
  },
  'number': {
    color: 'var(--color-typo-link-minor)',
  },
  'boolean': {
    color: 'var(--color-typo-link-minor)',
  },
  'variable': {
    color: 'var(--color-typo-link-minor)',
  },
  'constant': {
    color: 'var(--color-typo-link-minor)',
  },
  'inserted': {
    color: 'var(--color-typo-link-minor)',
  },
  'atrule': {
    color: 'var(--color-typo-link)',
  },
  'keyword': {
    color: 'var(--color-typo-link)',
  },
  'attr-value': {
    color: 'var(--color-typo-link)',
  },
  '.language-autohotkey .token.selector': {
    color: 'var(--color-typo-link)',
  },
  '.language-json .token.boolean': {
    color: 'var(--color-typo-link)',
  },
  '.language-json .token.number': {
    color: 'var(--color-typo-link)',
  },
  'code[class*="language-css"]': {
    color: 'var(--color-typo-link)',
  },
  'function': {
    color: 'var(--color-typo-secondary)',
  },
  'deleted': {
    color: 'var(--color-typo-primary)',
  },
  '.language-autohotkey .token.tag': {
    color: 'var(--color-typo-primary)',
  },
  'selector': {
    color: 'var(--color-typo-primary)',
  },
  '.language-autohotkey .token.keyword': {
    color: 'var(--color-typo-secondary)',
  },
  'important': {
    color: 'var(--color-typo-warning)',
    fontWeight: 'bold',
  },
  'bold': {
    fontWeight: 'bold',
  },
  'italic': {
    fontStyle: 'italic',
  },
  'class-name': {
    color: 'var(--color-typo-normal)',
  },
  '.language-json .token.property': {
    color: 'var(--color-typo-normal)',
  },
  'tag': {
    color: 'var(--color-typo-primary)',
  },
  'attr-name': {
    color: 'var(--color-typo-alert)',
  },
  'property': {
    color: 'var(--color-typo-alert)',
  },
  'regex': {
    color: 'var(--color-typo-alert)',
  },
  'entity': {
    color: 'var(--color-typo-alert)',
  },
  'directive.tag.tag': {
    background: 'var(--color-typo-caution)',
    color: 'var(--color-typo-secondary)',
  },
  '.line-numbers.line-numbers .line-numbers-rows': {
    borderRightColor: 'var(--color-typo-ghost)',
  },
  '.line-numbers .line-numbers-rows > span:before': {
    color: 'var(--color-typo-normal)',
  },
  '.line-highlight.line-highlight': {
    background:
      'linear-gradient(to right, rgba(193, 222, 241, 0.2) 70%, rgba(221, 222, 241, 0))',
  },
};
