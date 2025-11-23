import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Button from '../../app/components/Button';

describe('Button component', () => {
  it('renders children text', () => {
    const { getByText } = render(<Button text='Presionar' onClick={() => {}}></Button>);
    expect(getByText('Presionar')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button text='Haz click' onClick={onPress}></Button>);

    const btn = getByText('Haz click');
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button text='No activo' onClick={onPress} disabled></Button>
    );

    const btn = getByText('No activo');
    fireEvent.press(btn);
    expect(onPress).not.toHaveBeenCalled();
  });
});
