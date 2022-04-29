import { CreatedStand } from '../types';
import { prepareStands } from './exportFuctions';

import stand_0 from '../../../../src/components/Attachment/__stand__/Attachment.stand';
import stand_1 from '../../../../src/components/Avatar/__stand__/Avatar.stand';
import stand_2 from '../../../../repos/analytic-ui/src/components/FeedbackForm/__stand__/FeedbackFormCsi.stand';

export const standsGenerated: CreatedStand[] = [stand_0, stand_1, stand_2];

export const pathsGenerated: string[] = [
  '../../../../src/components/Attachment/__stand__/Attachment.stand',
  '../../../../src/components/Avatar/__stand__/Avatar.stand',
  '../../../../repos/analytic-ui/src/components/FeedbackForm/__stand__/FeedbackFormCsi.stand',
];

export const { stands, libs } = prepareStands(standsGenerated, pathsGenerated);
