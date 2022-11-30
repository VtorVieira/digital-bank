import React, { useState } from "react";

export function Transactions() {
  const [transactionType, setTransactionType] = useState('transferencia');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const transfer = () => {
    console.log('transfer');
  };

  const deposit = () => {
    console.log('deposit');
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
            placeholder="Informe o cpf"
            onChange={handleChange}
          />
        }
        <input
          id="price"
          name="price"
          type="text"
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