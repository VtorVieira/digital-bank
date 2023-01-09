import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { History } from "../components/History";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Transactions } from "../components/Transactions";

import { checkBalance } from "../services/requests";
import { verifyUserLogged } from "../helpers/verifyUserLogged";

import { GrUpdate } from 'react-icons/gr';

import DigitalBankContext from "../context/digitalContext";

export function Main() {
  const [user, setUser] = useState([]);
  const [balance, setBalance] = useState(0);
  const [updatedBalance, setUpdatedBalance] = useState(false);
  const { updateValue } = useContext(DigitalBankContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const logged = await verifyUserLogged();
      const { name } = logged;
      setUser(name);
      if (logged) {
        const balanceUser = await checkBalance(logged);
        setBalance(balanceUser.toString().replace('.', ','));
      } else {
        navigate('/form');
      }
    })();
  }, [updatedBalance, updateValue]);

  const handleClick = () => setUpdatedBalance(!updatedBalance);

  return (
    <div className='flex flex-col h-screen bg-[#919191] xl:flex xl:items-center 2xl:flex 2xl:items-center md:text-xl'>
      <div className='xl:w-11/12 2xl:w-4/5'>
        <Header />
        <div className='flex gap-2 flex-col border-solid border-2 bg-[#6b6b6b] mt-4 ml-4 mr-4 rounded-md text-[#ffff] font-bold'>
          <h1 className='mt-2 ml-4'>Bem Vindo, {user}</h1>
          <div className="flex items-center">
            <span className='mb-2 ml-4 mt-2'>Saldo disponível: R$ {balance}</span>
            <button type="button" onClick={handleClick}>
              <GrUpdate className="fill-[#ffff] ml-4" />
            </button>
          </div>
        </div>
        <Transactions />
        <History />
        <Footer />
      </div>
    </div>
  );
}