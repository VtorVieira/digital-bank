import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { typeFilter } from '../helpers/typeFilter';

import { getHistoryUser, verifyToken } from '../services/requests';

function History() {
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const localToken = JSON.parse(localStorage.getItem('token')) || [];
      const logged = await verifyToken(localToken.token);
      if (logged) {
        const { cpf } = logged;
        const historyUser = await getHistoryUser(cpf);
        setHistory(historyUser);
      } else {
        navigate('/');
      }
    })();
  }, [navigate]);

  const handleSearch = (e) => {
    setSearch('');
    const { value } = e.target;
    setSearch(value);
  };

  const handleSelect = (e) => {
    setSearch('');
    const { value } = e.target;
    setSearch(value);
  };

  const filterHistory = () => {
    setFilter(search);
    setSearch('');
  };

  return (
    <div className='border-solid border-2 bg-[#6b6b6b] m-4 rounded-md font-bold'>
      <div className='flex justify-center mt-4 text-[#ffff]'>
        <h3>Histórico</h3>
      </div>
      <div className='flex flex-col justify-center items-center bg-[#6b6b6b] m-4 rounded-md font-bold md:flex-row md:justify-around'>
        <input
          className='rounded-md text-gray-500 w-48 h-11 p-3 shadow-lg focus:outline-none focus:ring focus:ring-blue-400 md:w-1/3 xl:w-1/3 2xl:w-1/3'
          type="date"
          onChange={handleSearch}
        />
        <select
          className='rounded-md text-gray-500 w-48 h-11 p-3 mt-2 shadow-lg focus:outline-none focus:ring focus:ring-blue-400 md:w-1/3 xl:w-1/3 2xl:w-1/3'
          onChange={handleSelect}
        >
          <option
            value="selecione"
          >
            Filtre por tipo
          </option>
          {
            typeFilter.map((item, index) => (
              <option key={index} value={item.type}>{item.type}</option>
            ))
          }
        </select>
        <button
          className='rounded-xl w-36 h-11 mt-2 bg-[#5e17eb] text-[#ffff]'
          type="button"
          onClick={filterHistory}
        >
          Filtrar
        </button>
      </div>
      <table className='flex justify-around bg-[#6b6b6b] m-4 rounded-md font-bold'>
        <tbody className='w-full'>
          <tr className='flex justify-around border-solid border-2 text-[#6b6b6b] bg-[#ffff] md:mt-2'>
            <th className="border-solid border-2 border-[#6b6b6b] w-full">Data</th>
            <th className="border-solid border-2 border-[#6b6b6b] w-full">Transação</th>
            <th className="border-solid border-2 border-[#6b6b6b] w-full">Nome</th>
            <th className="border-solid border-2 border-[#6b6b6b] w-full">Valor</th>
          </tr>
          {history.length > 0 && history.filter((item) => {
            return filter === 'selecione'
              ? item
              : item.date.includes(filter) || item.type.includes(filter);
          }).map((transfer) => (
            <tr
              className='flex justify-around border-solid border-2  text-[#ffff]'
              key={transfer.id}
            >
              <td className="border-solid border-2 w-full text-center">{transfer.date}</td>
              <td className="border-solid border-2 w-full text-center">{transfer.type}</td>
              <td className="border-solid border-2 w-full text-center">{transfer.name}</td>
              <td className="border-solid border-2 w-full text-center">R$ {transfer.price.replace('.', ',')}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default History;
