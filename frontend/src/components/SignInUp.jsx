import React from 'react';
import dgbank from '../images/dgbank.svg';

export function SignInUp({ formType, handleChange, handleSignIn, handleSingUp, changeForm, form, requestFailed }) {

  return (
    <div className='flex justify-center items-center h-screen bg-[#919191] font-bold text-lg'>
      <form className=' bg-[#6b6b6b] rounded-lg border-spacing-0 border-solid border-2 h-4/5 w-96 md:h-2/3 md:w-2/4 xl:w-1/3 2xl:w-1/4'>
        <div className='flex justify-center items-center w-96 mt-6 md:w-full'>
          <img
            className='rounded-lg w-28'
            src={dgbank}
            alt="Logo" />
        </div>
        <div className='flex justify-center items-center mt-10 text-2xl text-[#fff]'>
          {formType === 'Sign In' ? 'Login' : 'Cadastro'}
        </div>
        <div className='flex flex-col gap-8 justify-center items-center mt-12'>
          {
            formType === 'Sign Up'
            && <div>
              <input
                className='rounded-md text-slate-800 placeholder-gray-500 w-80 h-10 p-3 shadow-lg focus:outline-none focus:ring focus:ring-blue-400 md:w-96'
                id="name"
                name="name"
                value={form.name}
                type="text"
                placeholder={formType === 'Sign In' ? 'Informe o seu nome completo' : 'Cadastre o seu nome completo'}
                onChange={handleChange}
              />
            </div>
          }
          <div>
            <input
              className='rounded-md text-slate-800 placeholder-gray-500 w-80 h-10 p-3 shadow-lg focus:outline-none focus:ring focus:ring-blue-400 md:w-96'
              id="cpf"
              name="cpf"
              value={form.cpf}
              type="text"
              placeholder={formType === 'Sign In' ? 'Informe o seu CPF' : 'Cadastre o seu CPF'}
              onChange={handleChange}
            />
          </div>
          <div className='w-96 border-red-500 border-l-4'>
            <p className=' text-[#ffff] ml-2'>{requestFailed.message}</p>
          </div>
        </div>
        <div className='flex justify-center items-center mt-8'>
          <button
            className='rounded-xl w-96 h-11 bg-[#5e17eb] text-[#fff]'
            type='button'
            onClick={formType === 'Sign In' ? handleSignIn : handleSingUp}
          >
            {formType === 'Sign In' ? 'Entrar' : 'Cadastrar'}
          </button>
        </div>
        {formType === 'Sign In'
          ? <div className='flex justify-center items-center mt-8'>
            <button
              className='rounded-xl w-96 h-11 bg-[#5e17eb] text-[#fff]'
              type='button'
              onClick={() => changeForm('Sign Up')}
            >
              {formType === 'Sign In' && 'Ainda não tem conta? Cadastre-se'}
            </button>
          </div>
          : <div className='flex justify-center items-center mt-8'>
            <button
              className='rounded-xl w-96 h-11 bg-[#5e17eb] text-[#fff]'
              type='button'
              onClick={() => changeForm('Sign In')}
            >
              {formType === 'Sign Up' && 'Volta para Login'}
            </button>
          </div>
        }
      </form>
    </div>
  );
}
