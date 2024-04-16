import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(usuario, senha);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Nome de usuário" />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
