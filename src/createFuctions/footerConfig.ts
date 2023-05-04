import { ctx } from '##/modules/app';
import { footerAtom } from '##/modules/standsConfigs';

export const footerConfig = (props: {
  copmonent: () => JSX.Element | null;
}) => {
  footerAtom(ctx, props);
};
