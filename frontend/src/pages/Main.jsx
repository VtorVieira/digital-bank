import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Transactions } from "../components/Transactions";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import { checkBalance, verifyToken } from "../services/requests";
import History from "../components/History";

export function Main() {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const localToken = JSON.parse(localStorage.getItem('token')) || [];
      const logged = await verifyToken(localToken.token);
      const { name } = logged;
      setUser(name);
      if (logged) {
        const balanceUser = await checkBalance(logged);
        setBalance(balanceUser);
      } else {
        navigate('/');
      }
    })();
  },);

  return (
    <div className='flex flex-col h-screen bg-[#919191] xl:flex xl:items-center 2xl:flex 2xl:items-center md:text-xl'>
      <div className='xl:w-11/12 2xl:w-4/5'>
        <Header />
        <div className='flex gap-2 flex-col border-solid border-2 bg-[#6b6b6b] mt-4 ml-4 mr-4 rounded-md text-[#ffff] font-bold'>
          <h1 className='mt-2 ml-4'>Bem Vindo, {user}</h1>
          <span className='mb-2 ml-4'>Saldo disponível: R$ {balance}</span>
        </div>
        <Transactions />
        <History />
        <Footer />
      </div>
    </div>
  );
}