jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    MaterialIcons: () => React.createElement(Text, { testID: 'icon' }, 'icon'),
  };
});

jest.mock('@react-native-picker/picker', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  const Item = ({ label }: { label: string }) => React.createElement(Text, null, label);

  const Picker = ({ children, testID }: any) => React.createElement(View, { testID }, children);

  Picker.Item = Item;

  return { Picker, Item };
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';

import CustomInput from '../../app/components/CustomInput';

describe('CustomInput component', () => {
  const renderWithForm = (props: any = {}) => {
    const Wrapper = () => {
      const { control } = useForm({ defaultValues: { testField: '' } });
      return (
        <CustomInput
          control={control}
          name={'testField' as any}
          placeholder="Mi placeholder"
          {...props}
        />
      );
    };
    return render(<Wrapper />);
  };

  it('renders placeholder text', () => {
    const { getByText } = renderWithForm();
    expect(getByText('Mi placeholder')).toBeTruthy();
  });

  it('renders warning icon when hasWarning is true', () => {
    const { getByTestId } = renderWithForm({ hasWarning: true });
    expect(getByTestId('icon')).toBeTruthy();
  });

  it('renders picker options when isPicker is true', () => {
    const options = [
      { label: 'Opción A', value: 'a' },
      { label: 'Opción B', value: 'b' },
    ];
    const { getByText } = renderWithForm({ isPicker: true, options, name: 'other' });
    expect(getByText('Opción A')).toBeTruthy();
    expect(getByText('Opción B')).toBeTruthy();
  });
});

