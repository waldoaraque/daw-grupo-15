import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/routes/Login';
import { AuthProvider } from '../src/auth/AuthProvider';

// Mock para AuthProvider
jest.mock('../src/auth/AuthProvider', () => ({
  useAuth: jest.fn().mockReturnValue({ token: null }), // Simula que no hay token autenticado
}));

describe('Login Component', () => {
  it('renders login form correctly', async () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Contraseña');
    const loginButton = getByText('Login');

    // Verificar que los elementos del formulario estén presentes
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    // Simular el envío del formulario
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Esperar a que se complete la consulta
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com', contrasena: 'password123' }),
      });
    });
  });
});
