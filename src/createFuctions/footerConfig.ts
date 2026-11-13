import { footerAtom } from '##/modules/standsConfigs';

export const footerConfig = (props: {
  component: () => React.JSX.Element | null;
}) => {
  footerAtom.set(props);
};
