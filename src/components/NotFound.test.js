import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFoundComponent from './NotFoundComponent';

describe('NotFoundComponent', () => {
  it('renders correctly', () => {
    render(
      <Router>
        <NotFoundComponent />
      </Router>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Página no encontrada.')).toBeInTheDocument();
    expect(screen.getByText('Ir al Inicio')).toBeInTheDocument();
  });

  it('link redirects to home page', () => {
    render(
      <Router>
        <NotFoundComponent />
      </Router>
    );

    expect(screen.getByText('Ir al Inicio')).toHaveAttribute('href', '/');
  });
});