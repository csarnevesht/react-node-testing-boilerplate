import { render, screen } from '@testing-library/react';
import App from './App';

test('renders loading text', () => {
  render(<App />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
