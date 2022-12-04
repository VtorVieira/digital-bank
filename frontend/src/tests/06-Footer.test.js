import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import renderWithRouter from './RenderWithRouter';
import { Footer } from '../components/Footer';

describe('Testes da tela de Footer:', () => {
  beforeEach(() => {
    renderWithRouter(<Footer />);
  });
  it('Testa se existe o texto Digital Bank:', () => {
    const title = screen.getByRole('heading', {
      name: /digital bank/i
    });
    expect(title).toBeInTheDocument();
  });
  it('Testa se existe o texto Created By...:', () => {
    const title = screen.getByText(/created by © 2022/i);
    expect(title).toBeInTheDocument();
  });
  it('Testa se existe o texto Created By...:', () => {
    const created = screen.getByText(/created by © 2022/i);
    expect(created).toBeInTheDocument();
  });
  it('Testa se existe o texto com as Stacks', () => {
    const stacks = screen.getByText(/react, tailwind, nodejs, postgres, sequelize/i);
    expect(stacks).toBeInTheDocument();
  });
});
