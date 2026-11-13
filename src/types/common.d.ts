declare module '*.docs.mdx' {
  const MDXComponent: (props: {
    components?: MDXComponents;
  }) => React.JSX.Element;

  export default MDXComponent;
}

declare module '*.stand.mdx' {
  const MDXComponent: (props: {
    components?: MDXComponents;
  }) => React.JSX.Element;

  export default MDXComponent;
}

declare module '*.jpeg' {
  const content: string;

  export default content;
}

declare module '*.jpg' {
  const content: string;

  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.image.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.icon.svg' {
  import { IconComponent } from '@consta/icons/Icon';

  const content: IconComponent;
  export default content;
}
