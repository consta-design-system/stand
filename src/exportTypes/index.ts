import { ThemePreset } from '@consta/uikit/Theme';

export type Group = {
  id: string;
  title: string;
  order?: number;
};

export type StandStatus = 'deprecated' | 'canary' | 'stable' | 'inWork';

export type Stand<Group extends string = string> = {
  id: string;
  title: string;
  group: Group;
  image?: (() => React.ReactElement | null) | string | React.FC;
  logo?: (() => React.ReactElement | null) | string | React.FC;
  order?: number;
  status?: 'deprecated' | 'canary' | 'stable' | 'inWork';
  version?: string;
  docs?: React.FC;
  figma?: string;
  github?: string;
  sandbox?: string;
  playground?: React.FC;
  description?: string;
  otherVersion?: Stand<Group>[];
  alias?: string[];
};

export type Lib<GROUP extends Group> = {
  groups: readonly GROUP[];
  title: string;
  id: string;
  logo?: (() => React.ReactElement | null) | string;
  image?: (() => React.ReactElement | null) | string;
  group?: string;
  description?: string;
  standPageDecoration?: (props: {
    theme: ThemePreset;
    children: React.ReactChild;
  }) => React.ReactElement;
};

export type CreatedStand = {
  stand: Stand;
  lib: Lib<Group>;
};

export type PreparedStand = { stand: Stand; lib: LibWithStands } & {
  id: string;
  path: string;
  pathAccess: {
    stand: boolean;
    dev: boolean;
    design: boolean;
  };
};

export type LibWithStands = Lib<Group> & {
  stands: PreparedStand[];
};
