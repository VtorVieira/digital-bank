import React from "react";
import { Transactions } from "../components/Transactions";

export function Main() {
  return (
    <div>
      <h1>Bem Vindo! Vitor</h1>
      <span>Saldo disponível: R$ 100,00</span>
      <Transactions />
    </div>
  );
}