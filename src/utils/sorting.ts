import { Group, LibWithStands, PreparedStand } from '##/exportTypes';

export const sortStands = (a: PreparedStand, b: PreparedStand) =>
  a.stand.title > b.stand.title ? 1 : -1;

export const sortGroups = (a: Group, b: Group) => (a.title > b.title ? 1 : -1);

export const sortLibs = (a: LibWithStands, b: LibWithStands) =>
  a.title > b.title ? 1 : -1;
