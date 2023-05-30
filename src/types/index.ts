import { IconComponent } from '@consta/icons/Icon';
import { ThemePreset } from '@consta/uikit/Theme';
import { MDXComponents } from 'mdx/types';

export type Group = {
  id: string;
  title: string;
  order?: number;
  initialOpen?: boolean;
  description?: string;
  renderList?: ListCardComponent;
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
  otherVersion?: PreparedStandNopreparedLibs[];
  alias?: string[];
  type?: 'docs' | 'component';
  icon?: IconComponent;
  visibleOnLibPage?: boolean;
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
  description?: string;
  fullDescription?:
    | ((props: { components?: MDXComponents }) => JSX.Element)
    | string;
  standPageDecoration?: (props: {
    theme: ThemePreset;
    children: React.ReactNode;
  }) => React.ReactElement;
  standTabs?: StandTab[];
  repositoryUrl?: string;
  order?: number;
  figmaUrl?: string;
};

export type CreatedStand = {
  stand: Stand;
  lib: Lib<Group>;
  type: 'stand';
};

export type PreparedStand = { stand: Stand; lib: LibWithStands } & {
  id: string;
  path: string;
  repositoryPath: string;
  lazyAccess: Record<string, boolean>;
  componentDir?: string;
  type: string;
};

export type PreparedStandNopreparedLibs = Omit<PreparedStand, 'lib'> & {
  lib: Lib<Group>;
};

export type LibWithStands = Lib<Group> & {
  stands: PreparedStand[];
};

export type PageConfig = {
  routeName: string;
  mainPage?: boolean;
};

export type CreatedPage = PageConfig & { type: 'page' };

export type LibsPageConfigGroup = {
  label: string;
  description?: string;
  renderList?: ListCardComponent;
  maxCount?: number;
  buttonMore?: boolean;
  hiddenLabel?: boolean;
  initialOpen?: boolean;
  sortOrder?: number;
};

export type LibsPageConfig = {
  title: string;
  description?:
    | ((props: { components?: MDXComponents }) => JSX.Element)
    | string;
  extractLibs?: string[];
  groups?: LibsPageConfigGroup[];
};

export type ListCardItem = {
  label: string;
  routeName: string;
  routeParams: {};
  description?: string;
  repositoryUrl?: string;
  figmaUrl?: string;
  status?: 'deprecated' | 'stable' | 'inWork' | 'canary';
  icon?: IconComponent;
  lazyImage?: string;
};

export type ListCardComponent = (props: {
  items: ListCardItem[];
  className?: string;
  maxCount?: number;
  buttonMore?: boolean;
}) => JSX.Element | null;
