import React from "react";
import { useFlag } from '@consta/uikit/useFlag';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { cn } from '##/utils/bem';
import './StandPageFigma.css';

type Props = {
    link?: string;
    className?: string;
}

const cnStandPageFigma = cn('StandPageFigma');

export const StandPageFigma = (props: Props) => {
    const { link, className } = props;
    const [isPreview, setIsPreview] = useFlag(true);

    return (
        <div className={cnStandPageFigma(null, [className])}>
            {(!isPreview && link) ? (
                <iframe className={cnStandPageFigma('Frame')} src={link}/>
            ): (
                <>
                    <Text
                        className={cnStandPageFigma('Title')}
                        size="3xl"
                        lineHeight="m"
                        weight="semibold"
                    >
                        Превью компонента в Figma
                    </Text>
                    <Text
                        className={cnStandPageFigma('Title')}
                        size="m"
                        view="secondary"
                        lineHeight="m"
                    >
                        По умолчанию эта функция отключена чтобы не нагружать ваш браузер
                    </Text>
                    {link && (
                        <Button
                            className={cnStandPageFigma('Button')}
                            label="Я хочу увидеть компонент"
                            onClick={setIsPreview.off}
                            size="m"
                            view="secondary"
                        />
                    )}
                </>
            )}
        </div>
    )
}