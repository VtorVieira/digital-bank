import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/dom';
import renderWithRouter from './RenderWithRouter';
import { Header } from '../components/Header';

describe('Testes da tela de Header:', () => {
  beforeEach(() => {
    renderWithRouter(<Header />);
  });

  it('Testa se existe a imagem do logo na tela de Header:', () => {
    const alt = 'Logo';
    const src = 'dgbank.svg';
    const img = screen.getByAltText(alt);
    expect(img.getAttribute('src')).toBe(src);
  });
});
