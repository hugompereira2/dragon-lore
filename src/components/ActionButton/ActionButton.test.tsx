import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ActionButton } from './ActionButton';

describe('ActionButton Component', () => {
  const onClickMock = jest.fn();

  it('renders the button with the correct label', () => {
    render(<ActionButton label="Click Me" onClick={onClickMock} />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    render(<ActionButton label="Click Me" onClick={onClickMock} />);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('applies the primary variant by default', () => {
    render(<ActionButton label="Primary Button" onClick={onClickMock} />);
    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toHaveClass('action-button-component primary');
  });

  it('applies the secondary variant when specified', () => {
    render(
      <ActionButton label="Secondary Button" onClick={onClickMock} variant="secondary" />
    );
    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toHaveClass('action-button-component secondary');
  });

describe('ActionButton Component', () => {
  it('does not call onClick when the button is disabled', () => {
    const onClickMock = jest.fn();

    const { getByRole } = render(
      <ActionButton
        label="Click Me"
        onClick={onClickMock}
        disabled={true}
      />
    );

    const button = getByRole('button', { name: 'Click Me' });

    fireEvent.click(button);

    expect(onClickMock).not.toHaveBeenCalled();
  });
});

  it('applies the disabled class when the button is disabled', () => {
    render(
      <ActionButton label="Disabled Button" onClick={onClickMock} disabled={true} />
    );
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toHaveClass('disabled');
  });
});
