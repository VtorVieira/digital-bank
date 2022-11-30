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
  };

  const handleSingUp = () => {
    console.log('sign up');
  };

  console.log('to aqui', formType);

  return (
    <div>
      <form>
        <div>
          <button
            type='button'
            onClick={() => navigate('/signin', { replace: true })}
          >
            Sing In
          </button>
          <button
            type='button'
            onClick={() => navigate('/signup', { replace: true })}
          >
            Sing Up
          </button>
        </div>
        <input
          id="name"
          name="name"
          // value={login.name}
          type="text"
          placeholder={formType === 'Sing In' ? 'Informe o seu nome completo' : 'Cadastre o seu nome completo'}
          onChange={handleChange}
        />
        <input
          id="cpf"
          name="cpf"
          // value={login.cpf}
          type="text"
          placeholder={formType === 'Sing In' ? 'Informe o seu CPF' : 'Cadastre o seu CPF'}
          onChange={handleChange}
        />
        <input
          id="password"
          name="password"
          // value={login.password}
          type="password"
          placeholder={formType === 'Sing In' ? 'Informe o sua senha' : 'Cadastre a sua senha'}
          onChange={handleChange}
        />
        <div>
          <button
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
