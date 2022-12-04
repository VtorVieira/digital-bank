import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import renderWithRouter from './RenderWithRouter';
import { History } from '../components/History';

describe('Testes da tela de History:', () => {
  beforeEach(() => {
    renderWithRouter(<History />);
  });
  it('Teste se a página History tem o titlo Histórico.', () => {
    const title = screen.getByRole('heading', { name: /Histórico/i });
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página History tem o botão filtrar.', () => {
    const filtrar = screen.getByRole('button', { name: /filtrar/i });
    expect(filtrar).toBeInTheDocument();
  });

  it('Teste se a página History tem uma tabela.', () => {
    const tabela = screen.getByRole('rowgroup');
    expect(tabela).toBeInTheDocument();

    const columnTableData = screen.getByRole('columnheader', { name: /data/i });
    const columnTableTransacao = screen.getByRole('columnheader', { name: /transação/i });
    const columnTableNome = screen.getByRole('columnheader', { name: /nome/i });
    const columnTableValor = screen.getByRole('columnheader', { name: /valor/i });

    expect(columnTableData).toBeInTheDocument();
    expect(columnTableTransacao).toBeInTheDocument();
    expect(columnTableNome).toBeInTheDocument();
    expect(columnTableValor).toBeInTheDocument();
  });
});