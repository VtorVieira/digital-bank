import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin, postRegister } from '../services/requests';

import dgbank from '../images/dgbank.svg';

function Form({ formType }) {
  const [form, setForm] = useState({
    name: '',
    cpf: '',
  });
  const [requestFailed, setRequestFailed] = useState({ message: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = async () => {
    try {
      const generateToken = await postLogin(form.name, form.cpf);
      localStorage.setItem('token', JSON.stringify(generateToken));
      navigate('/main', { replace: true });
    } catch (error) {
      console.log(error.response.data);
      setRequestFailed({ message: error.response.data.code });
    }
  };

  const handleSingUp = async () => {
    try {
      const userCreated = await postRegister(form.name, form.cpf);
      alert(userCreated.message);
      navigate('/', { replace: true });
    } catch (error) {
      setRequestFailed({ message: error.response.data.code });
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-[#919191] font-bold text-lg'>
      <form className=' bg-[#6b6b6b] rounded-lg border-spacing-0 border-solid border-2 h-3/4 w-96 md:h-2/3 md:w-1/4'>
        <div className='flex justify-center items-center w-96 mt-6 md:w-full'>
          <img
            className='rounded-lg w-28'
            src={dgbank}
            alt="Logo" />
        </div>
        <div className='flex justify-around mt-8'>
          <div className='border-r-4 border-b-4 w-3/6 text-center '>
            <button
              className='text-[#ffff] hover:text-[#7CF6FD]'
              type='button'
              onClick={() => navigate('/signin', { replace: true })}
            >
              Login
            </button>
          </div>
          <div className='border-b-4 w-3/6 text-center'>
            <button
              className='text-[#ffff] hover:text-[#7CF6FD]'
              type='button'
              onClick={() => navigate('/signup', { replace: true })}
            >
              Cadastre-se
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-8 justify-center items-center mt-12'>
          <div>
            <input
              className='rounded-md text-slate-800 placeholder-gray-500 w-80 h-10 p-3 shadow-lg focus:outline-none focus:ring focus:ring-blue-400'
              id="name"
              name="name"
              value={form.name}
              type="text"
              placeholder={formType === 'Sing In' ? 'Informe o seu nome completo' : 'Cadastre o seu nome completo'}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className='rounded-md text-slate-800 placeholder-gray-500 w-80 h-10 p-3 shadow-lg focus:outline-none focus:ring focus:ring-blue-400'
              id="cpf"
              name="cpf"
              value={form.cpf}
              type="text"
              placeholder={formType === 'Sing In' ? 'Informe o seu CPF' : 'Cadastre o seu CPF'}
              onChange={handleChange}
            />
          </div>
          <div className='w-80 border-red-500 border-l-4'>
            <p className=' text-[#ffff] ml-2'>{requestFailed.message}</p>
          </div>
        </div>
        <div className='flex justify-center items-center mt-8'>
          <button
            className='rounded-xl w-80 h-8 bg-[#5e17eb] text-[#fff]'
            type='button'
            onClick={formType === 'Sing In' ? handleSignIn : handleSingUp}
          >
            {formType === 'Sing In' ? 'Entrar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
