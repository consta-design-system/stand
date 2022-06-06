export type Group = {
  id: string;
  title: string;
  order?: number;
};

export type Stand<Group extends string = string> = {
  id: string;
  title: string;
  group: Group;
  order?: number;
  status: 'depricated' | 'canary' | 'stable' | 'inWork';
  version: string;
  standId?: string;
  docs?: React.FC;
  figma?: string;
  sandbox?: string;
  playground?: React.FC;
  description?: string;
};

export type Lib<GROUP extends Group> = {
  groups: readonly GROUP[];
  title: string;
  id: string;
  logo?: (() => React.ReactElement | null) | string;
  image?: (() => React.ReactElement | null) | string;
  group?: string;
  description?: string;
};

export type CreatedStand = {
  stand: Stand;
  lib: Lib<Group>;
};

export type PreparedStand = CreatedStand & {
  id: string;
  path: string;
};

export type LibWithStands = Lib<Group> & {
  stands: Stand[];
};
