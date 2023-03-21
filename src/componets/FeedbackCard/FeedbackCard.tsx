import './FeedbackCard.css';

import { IconComponent } from '@consta/icons/Icon';
import { Card } from '@consta/uikit/Card';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';

const cnFeedbackCard = cn('FeedbackCard');

type Props = {
  icon?: IconComponent;
  title: string;
  message?: React.ReactElement;
  className?: string;
  button?: {
    text: string;
    link: string;
  };
};

export const FeedbackCard = (props: Props) => {
  const { icon: Icon, title, message, className, button } = props;
  return (
    <Card
      verticalSpace="2xl"
      horizontalSpace="xl"
      shadow={false}
      border
      className={cnFeedbackCard(null, [className])}
    >
      {Icon && (
        <Icon
          size="l"
          className={cnFeedbackCard('Image', [cnMixSpace({ mB: 'xl' })])}
        />
      )}
      <Text
        className={cnFeedbackCard('Title')}
        size="m"
        weight="bold"
        lineHeight="m"
      >
        {title}
      </Text>
      {message && (
        <Text size="s" lineHeight="m" className={cnMixSpace({ mT: 'm' })}>
          {message}
        </Text>
      )}
      {button && (
        <Text
          as="a"
          size="s"
          lineHeight="m"
          href={button.link}
          view="link"
          className={cnFeedbackCard('Button', [cnMixSpace({ mT: 'xl' })])}
        >
          {button.text}
        </Text>
      )}
    </Card>
  );
};
