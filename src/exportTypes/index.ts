import { ThemePreset } from '@consta/uikit/Theme';
import { MDXComponents } from 'mdx/types';

export type Group = {
  id: string;
  title: string;
  order?: number;
  initialOpen?: boolean;
  view?: 'lib-card' | 'card' | 'list-item';
};

export type StandStatus = 'deprecated' | 'canary' | 'stable' | 'inWork';

export type Stand<Group extends string = string> = {
  id: string;
  title: string;
  group: Group;
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
  visibleOnLibPage?: boolean;
  visibleOnHeader?: boolean;
};

export type StandTab = {
  id: string;
  label: string;
  sandbox?: boolean;
  figma?: boolean;
};

export type Lib<GROUP extends Group> = {
  groups: readonly GROUP[];
  title: string;
  id: string;
  logo?: (() => React.ReactElement | null) | string | React.FC;
  image?: (() => React.ReactElement | null) | string | React.FC;
  group?: string;
  status?: 'deprecated' | 'stable' | 'inWork';
  description?:
    | ((props: { components?: MDXComponents }) => JSX.Element)
    | string;
  shortDescription?:
    | ((props: { components?: MDXComponents }) => JSX.Element)
    | string;
  standPageDecoration?: (props: {
    theme: ThemePreset;
    children: React.ReactChild;
  }) => React.ReactElement;
  standTabs?: StandTab[];
  repositoryUrl?: string;
  order?: number;
};

export type CreatedStand = {
  stand: Stand;
  lib: Lib<Group>;
};

export type PreparedStand = { stand: Stand; lib: LibWithStands } & {
  id: string;
  path: string;
  lazyAccess: Record<string, boolean>;
  componentDir?: string;
};

export type LibWithStands = Lib<Group> & {
  stands: PreparedStand[];
};
