import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('LoginForm', () => {
    it('renders login form', () => {
        render(<LoginForm />);
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('shows error message on invalid login', async () => {
        render(<LoginForm />);
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'invalid' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalid' } });
        fireEvent.click(screen.getByText('Login'));
        expect(await screen.findByText('Username or password is wrong')).toBeInTheDocument();
    });
});