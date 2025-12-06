import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('renders with default primary variant', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-slate-900');
    expect(buttonElement).toHaveClass('text-white');
  });

  test('renders with secondary variant', () => {
    render(<Button variant="secondary">Submit</Button>);
    const buttonElement = screen.getByText(/submit/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-orange-500');
  });

  test('renders with outline variant', () => {
    render(<Button variant="outline">Cancel</Button>);
    const buttonElement = screen.getByText(/cancel/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-transparent');
    expect(buttonElement).toHaveClass('border');
  });

  test('renders with fullWidth prop', () => {
    render(<Button fullWidth>Expand</Button>);
    const buttonElement = screen.getByText(/expand/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('w-full');
  });

  test('forwards additional props', () => {
    render(<Button type="submit">Form Button</Button>);
    const buttonElement = screen.getByText(/form button/i);
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});