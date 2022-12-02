import React, { useState } from "react";
import { postDeposit, postTransfer, verifyToken } from "../services/requests";

export function Transactions() {
  const [transactionType, setTransactionType] = useState('transferencia');
  const [transaction, setTransaction] = useState({
    cpf: '',
    price: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const transfer = async () => {
    try {
      const localToken = JSON.parse(localStorage.getItem('token')) || [];
      const logged = await verifyToken(localToken.token);
      const { cpf } = logged;
      await postTransfer(cpf, transaction.cpf, transaction.price);
      alert('Transferência realizada com sucesso!');
      setTransferFailed({ message: '' });
    } catch (error) {
      console.log(error);
      setTransferFailed({ message: error.response.data.code });
    }
    setTransaction({
      cpf: '',
      price: '',
    });
  };

  const deposit = async () => {
    setTransaction({ cpf: '' });
    try {
      const localToken = JSON.parse(localStorage.getItem('token')) || [];
      const logged = await verifyToken(localToken.token);
      const { cpf } = logged;
      await postDeposit(cpf, transaction.price);
      alert('Deposito realizado com sucesso!');
      setTransferFailed({ message: '' });
    } catch (error) {
      console.log(error);
      setTransferFailed({ message: error.response.data.code });
    }
    setTransaction({ price: '' });
  };

  const changeTransaction = (value) => {
    setTransactionType(value);
  };

  return (
    <div className='border-solid border-2 bg-[#6b6b6b] mt-4 ml-4 mr-4 rounded-md text-[#ffff] font-bold'>
      <div className='flex justify-center gap-4 bg-[#6b6b6b] mt-4 ml-4 mr-4 rounded-md font-bold'>
        <button
          className='border-r-2 pr-3 hover:text-[#7CF6FD]'
          type='button'
          onClick={() => changeTransaction('transferencia')}
        >
          Transferir
        </button>
        <button
          className='border-l-2 pl-3 hover:text-[#7CF6FD]'
          type='button'
          onClick={() => changeTransaction('depositar')}
        >
          Depositar
        </button>
      </div>
      <form className='flex flex-col justify-center items-center bg-[#6b6b6b] m-4 rounded-md font-bold md:flex-row md:justify-around'>
        {transactionType === 'transferencia'
          && <input
            className='rounded-md text-slate-800 placeholder-gray-500 w-48 h-8 p-3 shadow-lg focus:outline-none focus:ring focus:ring-blue-400 md:w-1/3 xl:w-1/3 2xl:w-1/3'
            id="cpf"
            name="cpf"
            type="text"
            value={transaction.cpf}
            placeholder="Informe o cpf"
            onChange={handleChange}
          />
        }
        <input
          className="rounded-md text-slate-800 placeholder-gray-500 w-48 h-8 p-3 mt-2 shadow-lg focus:outline-none focus:ring focus:ring-blue-400 md:w-1/3 xl:w-1/3 2xl:w-1/3"
          id="price"
          name="price"
          type="text"
          value={transaction.price}
          placeholder="Informe o valor"
          onChange={handleChange}
        />
        <button
          className='rounded-xl w-36 h-8 mt-2 bg-[#5e17eb] text-[#fff]'
          type="button"
          onClick={transactionType === 'transferencia' ? transfer : deposit}
        >
          {transactionType === 'transferencia' ? 'Transferir' : 'Depositar'}
        </button>
      </form>
    </div>
  );
}