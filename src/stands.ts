import { CreatedStand } from '../types';
import { prepareStands } from './exportFuctions';

export const standsGenerated: CreatedStand[] = [];

export const pathsGenerated: string[] = [
  '../../../../src/components/Attachment/__stand__/Attachment.stand',
  '../../../../src/components/Avatar/__stand__/Avatar.stand',
  '../../../../repos/analytic-ui/src/components/FeedbackForm/__stand__/FeedbackFormCsi.stand',
];

export const { stands, libs } = prepareStands(standsGenerated, pathsGenerated);
