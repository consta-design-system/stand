import './StandPageSandbox.css';

import { Loader } from '@consta/uikit/Loader';
import { useFlag } from '@consta/uikit/useFlag';
import React from 'react';

import { cn } from '##/utils/bem';

const DEFAULT_SANDBOX_LINK = 'https://codesandbox.io/embed';

type Props = {
  id?: string;
  className?: string;
};

const cnStandPageSandbox = cn('StandPageSandbox');

export const StandPageSandbox = (props: Props) => {
  const { id, className } = props;
  const [isLoading, setIsLoading] = useFlag(true);

  if (!id) {
    return null;
  }

  return (
    <div className={cnStandPageSandbox(null, [className])}>
      <iframe
        onLoad={setIsLoading.off}
        className={cnStandPageSandbox('Frame')}
        src={`${DEFAULT_SANDBOX_LINK}/${id}`}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
      {isLoading && <Loader className={cnStandPageSandbox('Loader')} />}
    </div>
  );
};
