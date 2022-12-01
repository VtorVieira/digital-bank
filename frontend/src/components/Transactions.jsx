import React, { useState } from "react";

export function Transactions() {
  const [transaction, setTransaction] = useState({
    cpf: '',
    price: '',
  });
  const [transactionType, setTransactionType] = useState('transferencia');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const transfer = () => {
    console.log('transfer', transaction);
    setTransaction({
      cpf: '',
      price: '',
    });
  };

  const deposit = () => {
    setTransaction({ cpf: '' });
    console.log('deposit', transaction);
    setTransaction({ price: '' });
  };

  const changeTransaction = (value) => {
    setTransactionType(value);
  };

  return (
    <div>
      <div>
        <button
          type='button'
          onClick={() => changeTransaction('transferencia')}
        >
          Transferência
        </button>
        <button
          type='button'
          onClick={() => changeTransaction('depositar')}
        >
          Depositar
        </button>
      </div>
      <form>
        {transactionType === 'transferencia'
          && <input
            id="cpf"
            name="cpf"
            type="text"
            value={transaction.cpf}
            placeholder="Informe o cpf"
            onChange={handleChange}
          />
        }
        <input
          id="price"
          name="price"
          type="text"
          value={transaction.price}
          placeholder="Informe o valor"
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={transactionType === 'transferencia' ? transfer : deposit}
        >
          {transactionType === 'transferencia' ? 'Transferir' : 'Depositar'}
        </button>
      </form>
    </div>
  );
}