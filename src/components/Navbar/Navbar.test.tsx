import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Navbar', () => {
  it('renders the navbar with logo and logout button', () => {
    render(<Navbar />);

    const logoElement = screen.getByAltText(/logo/i);
    expect(logoElement).toBeInTheDocument();

    const logoutButton = screen.getByText(/sair/i);
    expect(logoutButton).toBeInTheDocument();
  });

  it('removes the userEmail cookie and navigates to login page on logout', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    const removeMock = jest.spyOn(Cookies, 'remove').mockImplementation(() => {});

    render(<Navbar />);

    fireEvent.click(screen.getByText(/sair/i));

    expect(removeMock).toHaveBeenCalledWith('userEmail');

    expect(pushMock).toHaveBeenCalledWith('/login');
  });
});
