import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Image } from '##/componets/Image';
import { LibDescription } from '##/componets/LibDescription';
import { Link } from '##/componets/Link';
import { Group, Lib } from '##/exportTypes';
import { routesNames } from '##/modules/router';

type LibCardProps = {
  title: Lib<Group>['title'];
  description: Lib<Group>['description'];
  id?: Lib<Group>['id'];
  image: Lib<Group>['image'];
};

const renderImage = (id?: Lib<Group>['id'], image?: Lib<Group>['image']) => {
  if (!image) {
    return null;
  }
  if (!id) {
    return <Image src={image} className={cnMixSpace({ mB: '3xl', mT: 'l' })} />;
  }

  return (
    <Link to={routesNames.LIBS_STAND} params={{ stand: id }}>
      <Image src={image} className={cnMixSpace({ mB: '3xl', mT: 'l' })} />
    </Link>
  );
};

export const LibCard = (props: LibCardProps) => {
  const { id, title, description, image } = props;

  return (
    <div>
      <Text
        as="h3"
        size="3xl"
        lineHeight="m"
        weight="semibold"
        className={cnMixSpace({ mB: 'l' })}
      >
        {title}
      </Text>
      <LibDescription description={description} />
      {renderImage(id, image)}
    </div>
  );
};
