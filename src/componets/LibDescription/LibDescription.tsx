import { Text } from '@consta/uikit/Text';
import { MDXComponents } from 'mdx/types';
import React from 'react';

import { components } from '##/containers/MDXProvider';

type LibDescriptionProps = {
  description?:
    | ((props: { components?: MDXComponents }) => JSX.Element)
    | string;
};

export const LibDescription = (props: LibDescriptionProps) => {
  const { description } = props;

  if (!description) {
    return null;
  }

  if (typeof description === 'string') {
    return (
      <Text size="m" lineHeight="m">
        {description}
      </Text>
    );
  }

  const Description = description;
  return <Description components={components} />;
};
