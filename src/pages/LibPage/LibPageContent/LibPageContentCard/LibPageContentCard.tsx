import React from 'react';
import { Stand } from '##/exportTypes';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import { Image } from '##/componets/Image';
import NoImage from './NoImage';
import './LibPageContentCard.css';

type Props = {
    stand: Stand;
    onClick?: (stand: Stand) => void;
}

const cnLibPageContentCard = cn('LibPageContentCard');

export const LibPageContentCard = (props: Props) => {
    const { stand, onClick} = props;
    const { title, description, image  } = stand;
    return (
        <div className={cnLibPageContentCard()}>
            <Image src={image ?? NoImage} className={cnLibPageContentCard('Image')} />
            <Text 
                className={cnLibPageContentCard('Title')}
                size="l"
                as="a"
                view="link"
                decoration="underline"
                onClick={() => onClick?.(stand)}
                lineHeight="m"
            >
                {title}
            </Text>
            {description && <Text size="s">{description}</Text>}
        </div>
    )
}