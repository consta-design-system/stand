import React from 'react';

import { createStand } from '../../../stand/standConfig';

export const Stand = () => {
  return <div>Avatar</div>;
};

export default createStand({
  title: 'Avatar',
  id: 'Avatar',
  group: 'components',
  version: '3.18.0',
  status: 'stable',
  order: 9,
});
