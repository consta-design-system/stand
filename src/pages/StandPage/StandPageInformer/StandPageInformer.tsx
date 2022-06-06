import React from "react";
import { Stand } from '##/exportTypes';
import { Informer } from '@consta/uikit/Informer';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './StandPageInformer.css';

type Props = {
    status?: Stand['status'];
    depricated?: string;
    canary?: string;
    className?: string;
}

const cnStandPageInformer = cn('StandPageInformer');

export const StandPageInformer = (props: Props) => {
    const { status = 'inWork', depricated, canary, className } = props;

    if (status === 'inWork' || (status === 'stable' && !(depricated || canary))) {
        return null;
    }

    const getStatus = () => {
        if (status === 'stable') {
            return 'system';
        }
        if (status === 'canary') {
            return 'success';
        }
        if (status === 'depricated') {
            return 'alert';
        }
    }

    const getTitle = () => {
        if (status === 'depricated') {
            return 'Этот компонент больше не поддерживается!';
        }
        if (status === 'stable') {
            return 'У этого компонента есть другие версии';
        }
        if (status === 'canary') {
            return 'Это экспериментальный компонент';
        }
    }

    const getContent = () => {
        if (status === 'canary') {
            return <>Компонент имеет нестабильный API. Вы можете внести предложения <Text view="link" size="m" lineHeight="xs" as="a" href="https://github.com/consta-design-system/uikit/issues/new/choose">в обсуждении на GitHub</Text></>
        }
        if (status === 'depricated') {
            return <>
                <Text size="m" lineHeight="xs">Начиная с версии библиотеки <b>{depricated}</b> от 12.02.2021 компонент больше не поддерживается командой.</Text>
                <Text size="m" lineHeight="xs">Не рекомендуем использовать его в проектах.</Text>
            </>
        }
        if (status === 'stable') {
            return <> 
                {depricated && <Text size="m" lineHeight="xs">Устаревшие (deprecated): <Text as="a" href={`https://github.com/consta-design-system/uikit/releases/tag/${depricated}`}>{depricated}</Text></Text>}
                {canary && <Text size="m" lineHeight="xs">Обновленные (canary): <Text as="a" href={`https://github.com/consta-design-system/uikit/releases/tag/${canary}`}>{canary}</Text></Text>}
            </>
        }
    }

    return (
        <Informer
            title={getTitle()}
            className={cnStandPageInformer(null, [className])}
            view={status === 'depricated' ? 'filled' : 'bordered'}
            label={getContent()}
            status={getStatus()}
            size="s"
        />
    )
}