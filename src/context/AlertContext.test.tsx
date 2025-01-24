import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AlertProvider } from '@/context/AlertContext';
import { useAlert } from '@/hooks/useAlert';

describe('AlertContext and AlertProvider', () => {
  it('should render alert when showAlert is called', () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByText('Show Alert'));

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should hide alert after 3 seconds', async () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByText('Show Alert'));

    expect(screen.getByText('Test message')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText('Test message')).toBeNull(), { timeout: 3000 });
  });

  it('should close alert when close button is clicked', () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByText('Show Alert'));

    expect(screen.getByText('Test message')).toBeInTheDocument();

    const closeButton = screen.getAllByRole('button')[0];
    fireEvent.click(closeButton);

    expect(screen.queryByText('Test message')).toBeNull();
  });
});

const TestComponent = () => {
  const { showAlert } = useAlert();

  return (
    <button onClick={() => showAlert('Test message', 'success')}>Show Alert</button>
  );
};
