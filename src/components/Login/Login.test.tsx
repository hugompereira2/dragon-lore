import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Login } from './Login';
import { useAlert } from '@/hooks/useAlert';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('js-cookie', () => ({
  set: jest.fn(),
}));
jest.mock('@/hooks/useAlert');

describe('Login Component', () => {
  const showAlertMock = jest.fn();
  const pushMock = jest.fn();

  beforeEach(() => {
    (useAlert as jest.Mock).mockReturnValue({ showAlert: showAlertMock });
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it('renders the login form correctly', () => {
    render(<Login />);

    expect(screen.getByAltText('Logo Dragão')).toBeInTheDocument();
    expect(screen.getByText('Bem-vindo de volta')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it('shows an error when email is invalid', async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Digite seu email'), {
      target: { value: 'invalidemail' },
    });

    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), {
      target: { value: 'validpassword' },
    });

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(screen.getByText('Digite um email válido.')).toBeInTheDocument();
    });
  });

  it('shows an error when password is too short', async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Digite seu email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(screen.getByText('A senha deve ter no mínimo 6 caracteres.')).toBeInTheDocument();
    });
  });

  it('calls showAlert when email or password is incorrect', async () => {
    process.env.NEXT_PUBLIC_EMAIL = 'user@example.com';
    process.env.NEXT_PUBLIC_PASSWORD = 'correctpassword';

    const showAlert = jest.fn();

    (useAlert as jest.Mock).mockReturnValue({ showAlert });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Digite seu email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(showAlert).toHaveBeenCalledWith('Email ou senha inválidos.', 'error');
    }, { timeout: 3000 });
  });

  it('saves email to cookies and redirects on successful login', async () => {
    process.env.NEXT_PUBLIC_EMAIL = 'user@example.com';
    process.env.NEXT_PUBLIC_PASSWORD = 'correctpassword';

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Digite seu email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), {
      target: { value: 'correctpassword' },
    });

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith('userEmail', 'user@example.com', { expires: 1 });
      expect(pushMock).toHaveBeenCalledWith('/');
    }, { timeout: 3000 });
  });

  it('toggles password visibility', () => {
    render(<Login />);

    const toggleButton = screen.getByRole('button', { name: 'Mostrar senha' });
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(toggleButton).toHaveAttribute('aria-label', 'Esconder senha');
  });
});
