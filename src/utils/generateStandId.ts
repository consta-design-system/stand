import { isNotNil } from '##/utils/types/type-guards';

export const generateStandId = (...arr: (string | undefined)[]) =>
  arr.filter(isNotNil).join('-').replace(/\W|_/g, '-').toLowerCase();
