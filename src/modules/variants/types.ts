import { AtomLike } from '@reatom/core';

export type VariantType =
  | 'select'
  | 'boolean'
  | 'text'
  | 'date'
  | 'date-time'
  | 'number';

export type Value<TYPE extends VariantType, OPTION extends string | number> =
  | (TYPE extends 'boolean'
      ? boolean
      : TYPE extends 'date' | 'date-time'
        ? Date
        : TYPE extends 'number'
          ? number
          : TYPE extends 'select'
            ? OPTION
            : string)
  | undefined;

export type Variant<
  TYPE extends VariantType = VariantType,
  OPTION extends string | number = string,
> = {
  type: TYPE;
  name: string;
  value: Value<TYPE, OPTION>;
  options?: OPTION[] | readonly OPTION[];
  isActive: boolean;
};

export type VariantAtom<
  TYPE extends VariantType = VariantType,
  OPTION extends string | number = string,
> = {
  type: TYPE;
  name: string;
  value: AtomLike<Value<TYPE, OPTION>>;
  options?: OPTION[] | readonly OPTION[];
  isActive: boolean;
};

export type VariantWithId<
  TYPE extends VariantType = VariantType,
  OPTION extends string | number = string,
> = {
  type: TYPE;
  name: string;
  value: Value<TYPE, OPTION>;
  options?: OPTION[] | readonly OPTION[];
  isActive: boolean;
  id: string;
};
