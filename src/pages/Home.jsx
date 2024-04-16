import React, { useState } from 'react';
import CadastroEmpresa from '../components/Empresa/CadastroEmpresa';
import CadastroFuncionario from '../components/Funcionario/CadastroFuncionario';
import Login from '../components/Funcionario/Login.jsx';
import db from '../utils/db.js'; 

const Home = () => {
  const [empresaCadastrada, setEmpresaCadastrada] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEmpresaCadastro = (empresaData) => {
   
    //cadastro de empresass
    console.log('Empresa cadastrada:', empresaData);
    db.saveData('empresa', empresaData); // Salvar dados da empresa no banco de dados
    setEmpresaCadastrada(true);
    setLoggedIn(true); 
  };

  const handleFuncionarioCadastro = (funcionarioData) => {
    //cadastro de func
    console.log('Funcionário cadastrado:', funcionarioData);
  };

  const handleLogin = (usuario, senha) => {
    // Lógica para verificar o login
    console.log('Usuário logado:', usuario);
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn && <Login onLogin={handleLogin} />}
      {loggedIn && !empresaCadastrada && <CadastroEmpresa onCadastro={handleEmpresaCadastro} />}
      {loggedIn && empresaCadastrada && <CadastroFuncionario onCadastro={handleFuncionarioCadastro} />}
    </div>
  );
};

export default Home;
