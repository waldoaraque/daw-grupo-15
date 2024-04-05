import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Importa para tener acceso a los métodos de jest-dom
import { MemoryRouter } from 'react-router-dom';
import Login from '../src/routes/Login';
import { AuthProvider } from '../src/auth/AuthProvider';

// Mock de useAuth
jest.mock('../src/auth/AuthProvider');

describe('Login Component', () => {
  it('renders login form correctly', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(getByText('Login')).toBeInTheDocument();
    expect(getByLabelText('User Name')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should update username and password fields when typing', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    const usernameInput = getByLabelText('User Name');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

  it('should redirect to dashboard if user is authenticated', () => {
    // Mock isAuthenticated to true
    AuthProvider.mockReturnValueOnce({ isAuthenticated: true });

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    // Expect that there is no login form present
    expect(queryByText('Login')).toBeNull();
  });
});