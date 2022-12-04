import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './RenderWithRouter';
import { Form } from '../pages/Form';

const NAME = 'Vitor';
const CPF = '01234567890';

describe('Testes da tela de Login/Cadastro:', () => {
  beforeEach(() => {
    renderWithRouter(<Form />);
  });
  describe('Teste da parte de Login', () => {
    it('Testa se existe a imagem do logo na tela de Login:', () => {
      const alt = 'Logo';
      const src = 'dgbank.svg';
      const img = screen.getByAltText(alt);
      expect(img.getAttribute('src')).toBe(src);
    });
    it('Teste se a página title Login.', () => {
      const title = screen.getByText(/login/i);
      expect(title).toBeInTheDocument();
    });
    it('Testa se existe o input do CPF":', () => {
      const inputCPF = screen.getByRole('textbox');
      expect(inputCPF).toBeInTheDocument();
      fireEvent.change(inputCPF, { target: { value: CPF } });
      expect(inputCPF.value).toEqual(CPF);
    });
    it('Testa se existe o botão  "Entrar":', async () => {
      const buttonEntrar = screen.getByRole('button', { name: /Entrar/i });
      expect(buttonEntrar).toBeInTheDocument();
    });
    it('Testa se existe o botão  "Cadastre-se":', () => {
      const buttonEsqueceu = screen.getByRole('button', { name: /Ainda não tem conta?/i });
      expect(buttonEsqueceu).toBeInTheDocument();
      fireEvent.click(buttonEsqueceu);
      const title = screen.getByText(/Cadastro/i);
      expect(title).toBeInTheDocument();
    });
  });

  describe('Teste da parte de Cadastro', () => {
    it('Testa se existe a imagem do logo na tela de Cadastro:', () => {
      const alt = 'Logo';
      const src = 'dgbank.svg';
      const img = screen.getByAltText(alt);
      expect(img.getAttribute('src')).toBe(src);
    });
    it('Teste se a página title Cadastro.', () => {
      const buttonEsqueceu = screen.getByRole('button', { name: /Ainda não tem conta?/i });
      expect(buttonEsqueceu).toBeInTheDocument();
      fireEvent.click(buttonEsqueceu);

      const title = screen.getByText(/Cadastro/i);
      expect(title).toBeInTheDocument();
    });
    it('Testa se existe o input do Nome e CPF e se consegue digitar":', () => {
      const buttonEsqueceu = screen.getByRole('button', { name: /Ainda não tem conta?/i });
      expect(buttonEsqueceu).toBeInTheDocument();
      fireEvent.click(buttonEsqueceu);

      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toBeInTheDocument();
      expect(inputs[1]).toBeInTheDocument();

      fireEvent.change(inputs[0], { target: { value: NAME } });
      expect(inputs[0].value).toEqual(NAME);

      fireEvent.change(inputs[1], { target: { value: CPF } });
      expect(inputs[1].value).toEqual(CPF);
    });
    it('Testa se existe o botão  "Cadastrar":', () => {
      const buttonEsqueceu = screen.getByRole('button', { name: /Ainda não tem conta?/i });
      expect(buttonEsqueceu).toBeInTheDocument();
      fireEvent.click(buttonEsqueceu);

      const buttonEntrar = screen.getByRole('button', { name: /Cadastrar/i });
      expect(buttonEntrar).toBeInTheDocument();
    });
    it('Testa se existe o botão  "Cadastre-se":', () => {
      const buttonEsqueceu = screen.getByRole('button', { name: /Ainda não tem conta?/i });
      expect(buttonEsqueceu).toBeInTheDocument();
      fireEvent.click(buttonEsqueceu);

      const voltar = screen.getByRole('button', { name: /Volta para login/i });
      expect(voltar).toBeInTheDocument();
      fireEvent.click(voltar);
      const title = screen.getByText(/Login/i);
      expect(title).toBeInTheDocument();
    });
  });
});
