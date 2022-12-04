import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin, postRegister } from '../services/requests';
import { removeCPFCaracter } from '../helpers/clearCPF';

import { SignInUp } from '../components/SignInUp';

export function Form() {
  const [requestFailed, setRequestFailed] = useState({ message: '' });
  const [formType, setFormType] = useState('Sign In');
  const [form, setForm] = useState({
    name: '',
    cpf: '',
  });
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
      const clearCPF = await removeCPFCaracter(form.cpf);
      const generateToken = await postLogin(form.name, clearCPF);
      localStorage.setItem('token', JSON.stringify(generateToken));
      navigate('/main', { replace: true });
    } catch (error) {
      setRequestFailed({ message: error.response.data.code });
    }
  };

  const handleSingUp = async () => {
    try {
      const clearCPF = await removeCPFCaracter(form.cpf);
      const userCreated = await postRegister(form.name, clearCPF);
      alert(userCreated.message);
      navigate('/', { replace: true });
    } catch (error) {
      setRequestFailed({ message: error.response.data.code });
    }
  };

  const changeForm = (value) => {
    setRequestFailed({ message: '' });
    setFormType(value);
  };

  return (
    <SignInUp
      form={form}
      formType={formType}
      requestFailed={requestFailed}
      changeForm={changeForm}
      handleChange={handleChange}
      handleSignIn={handleSignIn}
      handleSingUp={handleSingUp}
    />
  );
}
