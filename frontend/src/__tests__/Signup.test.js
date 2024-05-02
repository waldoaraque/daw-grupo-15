import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../src/routes/Signup';
import { AuthProvider } from '../src/auth/AuthProvider';

// Mock para useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock para AuthProvider
jest.mock('../src/auth/AuthProvider', () => ({
  useAuth: jest.fn().mockReturnValue({ token: null }), // Simula que no hay token autenticado
}));

describe('Signup Component', () => {
  it('renders signup form correctly', async () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Signup />
      </AuthProvider>
    );

    const nameInput = getByPlaceholderText('Name');
    const apellidoInput = getByPlaceholderText('Apellido');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByText('Register');

    // Verificar que los elementos del formulario estén presentes
    expect(nameInput).toBeInTheDocument();
    expect(apellidoInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();

    // Simular el envío del formulario
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(apellidoInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    // Esperar a que se complete la consulta
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: 'John',
          apellido_usuario: 'Doe',
          email: 'test@example.com',
          contrasena: 'password123',
        }),
      });
    });
  });
});