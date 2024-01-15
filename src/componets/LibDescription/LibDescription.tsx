import { Text } from '@consta/uikit/Text';
import { MDXComponents } from 'mdx/types';
import React from 'react';

import { components } from '##/typography';

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
      <Text size="s" lineHeight="m" as="p" view="primary">
        {description}
      </Text>
    );
  }

  const Description = description;
  return <Description components={components} />;
};
