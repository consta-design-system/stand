import { act, render } from '@testing-library/react';
import * as React from 'react';

import { dateTimePropView } from '../../DateTimeCanary/DateTimeCanary';
import { DatePicker, datePickerPropType } from '../DatePickerCanary';
import {
  animateDelay,
  getDropdown,
  getRender,
  inputFocus,
  outsideClick,
  outsideId,
  testId,
} from './helpers';

type DateTimeProps = React.ComponentProps<typeof DatePicker>;

const renderComponent = (props: DateTimeProps = {}) => {
  return render(
    <>
      <div data-testid={outsideId} />
      <DatePicker {...props} data-testid={testId} />
    </>,
  );
};

describe('Компонент DatePicker', () => {
  describe('рендериться без ошибок', () => {
    it('должен рендериться без ошибок', () => {
      expect(renderComponent).not.toThrow();
    });

    datePickerPropType.forEach((type) => {
      dateTimePropView.forEach((dateTimeView) => {
        it(`должен рендериться без ошибок при type="${type}" dateTimeView="${dateTimeView}"`, () => {
          expect(() => renderComponent({ type, dateTimeView })).not.toThrow();
        });
      });
    });
  });

  describe('проверка className', () => {
    datePickerPropType.forEach((type) => {
      dateTimePropView.forEach((dateTimeView) => {
        it(`className присваевается при type="${type}" dateTimeView="${dateTimeView}"`, () => {
          const className = 'className';

          renderComponent({ className });
          expect(getRender()).toHaveClass(className);
        });
      });
    });
  });

  describe('проверка dropDown', () => {
    datePickerPropType.forEach((type) => {
      dateTimePropView.forEach((dateTimeView) => {
        it(`открываеся и закрывается при type="${type}" dateTimeView="${dateTimeView}"`, () => {
          jest.useFakeTimers();
          act(() => {
            renderComponent();
          });

          inputFocus();
          animateDelay();

          const dropdown = getDropdown();

          expect(dropdown).toBeInTheDocument();
          outsideClick();
          animateDelay();

          expect(dropdown).not.toBeInTheDocument();
        });
      });
    });
  });
});
