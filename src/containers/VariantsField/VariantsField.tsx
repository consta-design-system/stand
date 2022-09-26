import './VariantsField.css';

import { DatePicker } from '@consta/uikit/DatePickerCanary';
import { Select } from '@consta/uikit/Select';
import { Switch } from '@consta/uikit/Switch';
import { TextField } from '@consta/uikit/TextField';
import { useAction, useAtom } from '@reatom/react';
import React, { memo } from 'react';

import { useZIndex } from '##/containers/Variants/helpers';
import { Variant, variantsAtom, VariantType } from '##/exportAtoms/variants';
import { cn } from '##/utils/bem';

const cnVariantsField = cn('VariantsField');

type CreateMemoField = <T extends React.FC<any>>(commponent: T) => T;

const createMemoField: CreateMemoField = (component) =>
  memo(
    (props) => {
      const Component = component as typeof component;
      // @ts-ignore: исползуеся только тут и только с компонентами Field
      return <Component {...props} />;
    },
    (prevProps, nextProps) =>
      // @ts-ignore: исползуеся только тут и только с компонентами Field
      prevProps?.value === nextProps?.value &&
      // @ts-ignore: исползуеся только тут и только с компонентами Field
      prevProps?.isActive === nextProps?.isActive &&
      // @ts-ignore: исползуеся только тут и только с компонентами Field
      prevProps?.style === nextProps?.style,
  ) as unknown as typeof component;

const createMemoFieldForSwitch: CreateMemoField = (component) =>
  memo(
    (props) => {
      const Component = component as typeof component;
      // @ts-ignore: исползуеся только тут и только с компонентами Field
      return <Component {...props} />;
    },
    (prevProps, nextProps) =>
      // @ts-ignore: исползуеся только тут и только с компонентами Field
      prevProps?.checked === nextProps?.checked &&
      // @ts-ignore: исползуеся только тут и только с компонентами Field
      prevProps?.isActive === nextProps?.isActive &&
      // @ts-ignore: исползуеся только тут и только с компонентами Field
      prevProps?.style === nextProps?.style,
  ) as unknown as typeof component;

const TextFieldMemo = createMemoField(TextField);
const DatePickerMemo = createMemoField(DatePicker);
const SwitchMemo = createMemoFieldForSwitch(Switch);
const SelectMemo = createMemoField(Select);

const VariantsFieldText: React.FC<Variant<'text'>> = ({
  type,
  name,
  value,
  isActive,
}) => {
  const onChange = useAction(({ value }: { value: string | null }) =>
    variantsAtom.set({ type, value: value || undefined, name, isActive }),
  );

  return (
    <TextFieldMemo
      className={cnVariantsField()}
      value={value}
      type="text"
      onChange={onChange}
      label={name}
      size="s"
    />
  );
};

const VariantsFieldNumber: React.FC<Variant<'number'>> = ({
  type,
  name,
  value,
  isActive,
}) => {
  const onChange = useAction(({ value }: { value: string | null }) =>
    variantsAtom.set({
      type,
      value: value !== undefined ? Number(value) : undefined,
      name,
      isActive,
    }),
  );

  return (
    <TextFieldMemo
      className={cnVariantsField()}
      value={value?.toString()}
      type="number"
      onChange={onChange}
      label={name}
      size="s"
    />
  );
};

const VariantsFieldDate: React.FC<Variant<'date'>> = ({
  type,
  name,
  value,
  isActive,
}) => {
  const onChange = useAction(({ value }: { value: Date | null }) =>
    variantsAtom.set({ type, value: value || undefined, name, isActive }),
  );

  return (
    <DatePickerMemo
      className={cnVariantsField()}
      value={value}
      type="date"
      onChange={onChange}
      label={name}
      size="s"
      style={{ zIndex: useZIndex() }}
    />
  );
};

const VariantsFieldDateTime: React.FC<Variant<'date-time'>> = ({
  type,
  name,
  value,
  isActive,
}) => {
  const onChange = useAction(({ value }: { value: Date | null }) =>
    variantsAtom.set({ type, value: value || undefined, name, isActive }),
  );

  return (
    <DatePickerMemo
      className={cnVariantsField()}
      value={value}
      type="date"
      onChange={onChange}
      label={name}
      size="s"
      style={{ zIndex: useZIndex() }}
    />
  );
};

const VariantsFieldBoolean: React.FC<Variant<'boolean'>> = ({
  type,
  name,
  value,
  isActive,
}) => {
  const onChange = useAction(({ checked: value }: { checked: boolean }) =>
    variantsAtom.set({ type, value, name, isActive }),
  );

  return (
    <SwitchMemo
      className={cnVariantsField({ type })}
      checked={Boolean(value)}
      onChange={onChange}
      label={name}
    />
  );
};

const getItem = (item: string) => item;

const VariantsFieldSelect: React.FC<Variant<'select'>> = ({
  type,
  name,
  value,
  options = [],
  isActive,
}) => {
  const onChange = useAction(({ value }: { value: string | null }) =>
    variantsAtom.set({
      type,
      value: value || undefined,
      name,
      options,
      isActive,
    }),
  );

  return (
    <SelectMemo
      className={cnVariantsField()}
      getItemKey={getItem}
      getItemLabel={getItem}
      value={value}
      onChange={onChange}
      items={options as string[]}
      label={name}
      size="s"
      style={{ zIndex: useZIndex() }}
    />
  );
};

const map = {
  'text': VariantsFieldText,
  'number': VariantsFieldNumber,
  'boolean': VariantsFieldBoolean,
  'date': VariantsFieldDate,
  'date-time': VariantsFieldDateTime,
  'select': VariantsFieldSelect,
} as Record<VariantType, React.FC<Variant>>;

export const VariantsField: React.FC<{ name: string }> = ({ name }) => {
  const [variants] = useAtom(variantsAtom);

  const Component = map[variants[name].type];

  if (variants[name].isActive) {
    return <Component {...variants[name]} />;
  }

  return null;
};
