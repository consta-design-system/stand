import { footerAtom } from '##/modules/standsConfigs';

export const footerConfig = (props: {
  component: () => JSX.Element | null;
}) => {
  footerAtom.set(props);
};
