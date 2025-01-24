import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import '@testing-library/jest-dom';

describe('Loader', () => {
  it('renders the loader correctly', () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();

    const elements = loaderElement.querySelectorAll('.element');
    expect(elements).toHaveLength(3);
  });
});
