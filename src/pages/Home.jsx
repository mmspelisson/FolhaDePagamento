import React, { useState } from 'react'
import banco from '../utils/db.jsx'

const Home = () => {
  const [empresaCadastrada, setEmpresaCadastrada] = useState(false);

  const handleEmpresaCadastro = (empresaData) => {
    console.log('Empresa cadastrada:', empresaData);
    banco.saveData('empresa', empresaData);
    setEmpresaCadastrada(true);
  }

  return (
    <div>
      <h2>Bem-vindo à nossa aplicação</h2>
      {!empresaCadastrada ? (
        <p>Cadastre sua empresa para começar</p>
      ) : (
        <p>Você já cadastrou sua empresa</p>
      )}
    </div>
  )
}

export default Home
