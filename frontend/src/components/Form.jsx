import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ formType }) {
  const [login, setLogin] = useState();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = () => {
    console.log('Sing In');
    navigate('/main');
  };

  const handleSingUp = () => {
    console.log('sign up');
  };

  return (
    <div className='bg-gray-800 flex flex-col justify-center'>
      <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'>
        <div className='flex justify-around text-white text-4x1 font-bold text-center'>
          <div>
            <button
              type='button'
              onClick={() => navigate('/signin', { replace: true })}
            >
              Login
            </button>
          </div>
          <div>
            <button
              type='button'
              onClick={() => navigate('/signup', { replace: true })}
            >
              Cadastre-se
            </button>
          </div>
        </div>
        <div className=' flex flex-col text-gray-400 py-2'>
          <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            id="name"
            name="name"
            // value={login.name}
            type="text"
            placeholder={formType === 'Sing In' ? 'Informe o seu nome completo' : 'Cadastre o seu nome completo'}
            onChange={handleChange}
          />
        </div>
        <div className=' flex flex-col text-gray-400 py-2'>
          <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            id="cpf"
            name="cpf"
            // value={login.cpf}
            type="text"
            placeholder={formType === 'Sing In' ? 'Informe o seu CPF' : 'Cadastre o seu CPF'}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
            type='button'
            onClick={formType === 'Sing In' ? handleSignIn : handleSingUp}
          >
            {formType === 'Sing In' ? 'Sing In' : 'Sing Up'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
