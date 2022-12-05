import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import renderWithRouter from './RenderWithRouter';
import { Main } from '../pages/Main';

describe('Testes da tela de Main:', () => {
  beforeEach(() => {
    renderWithRouter(<Main />);
  });

  it('Teste se a página Main tem a mensagem Bem Vindo.', () => {
    const title = screen.getByRole('heading', { name: /bem vindo/i });
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página Main tem a mensagem saldo disponível.', () => {
    const balance = screen.getByText(/saldo disponível: r\$ 0/i);
    expect(balance).toBeInTheDocument();
  });
});
