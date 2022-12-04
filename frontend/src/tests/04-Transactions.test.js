import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/dom';
import renderWithRouter from './RenderWithRouter';
import { Transactions } from '../components/Transactions';

const CPF = '01234567890';
const VALOR = '10';

describe('Testes da tela de Transactions:', () => {
  beforeEach(() => {
    renderWithRouter(<Transactions />);
  });
  it('Teste se a página Transactions tem o botão transferir e os inputs cpf e valor.', () => {
    const transferir = screen.getAllByRole('button', { name: /transferir/i });
    expect(transferir[1]).toBeInTheDocument();

    const inputCPF = screen.getByPlaceholderText(/informe o cpf/i);
    const inputValor = screen.getByPlaceholderText(/informe o valor/i);
    expect(inputCPF).toBeInTheDocument();
    expect(inputValor).toBeInTheDocument();

    fireEvent.change(inputCPF, { target: { value: CPF } });
    fireEvent.change(inputValor, { target: { value: VALOR } });
    expect(inputCPF.value).toEqual(CPF);
    expect(inputValor.value).toEqual(VALOR);
  });

  it('Teste se a página Transactions tem o botão depositar e aprensenta o input valor.', () => {
    const depositar = screen.getAllByRole('button', { name: /depositar/i });
    expect(depositar[0]).toBeInTheDocument();

    const inputValor = screen.getByPlaceholderText(/informe o valor/i);
    expect(inputValor).toBeInTheDocument();

    fireEvent.change(inputValor, { target: { value: VALOR } });
    expect(inputValor.value).toEqual(VALOR);
  });
});