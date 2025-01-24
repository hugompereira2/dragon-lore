import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from './Alert';

jest.useFakeTimers();

describe('Alert Component', () => {
  it('renders the alert with the correct message and type', () => {
    const onCloseMock = jest.fn();
    render(<Alert message="Test message" type="success" onClose={onCloseMock} />);

  const alertElement = screen.getByText('Test message');
  expect(alertElement).not.toBeNull();

  const alertContainer = screen.getByTestId('alert-toast');
  expect(alertContainer).toHaveClass('alert success');
  });

  it('calls onClose after 2 seconds', () => {
    const onCloseMock = jest.fn();
    render(<Alert message="Test message" type="info" onClose={onCloseMock} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);

    expect(screen.queryByText('Test message')).toBeNull();
  });

  it('calls onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<Alert message="Test message" type="error" onClose={onCloseMock} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render when visible is false', () => {
    const onCloseMock = jest.fn();
    render(<Alert message="Test message" type="info" onClose={onCloseMock} />);

    act(() => {
      jest.advanceTimersByTime(2100);
    });

    expect(screen.queryByText('Test message')).toBeNull();
  });
});
