import React from "react";
import { Transactions } from "../components/Transactions";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Main() {
  return (
    <div>
      <Header />
      <h1>Bem Vindo! Vitor</h1>
      <span>Saldo disponível: R$ 100,00</span>
      <Transactions />
      <Footer />
    </div>
  );
}