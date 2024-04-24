import React, { useState } from 'react'
import banco from '../../utils/db'

const CadastroEmpresa = () => {
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nomeEmpresa && cnpj && telefone) {
      const empresaData = { nomeEmpresa, cnpj, telefone };
      banco.saveEmpresaData(empresaData);
      setFeedback('Cadastro realizado com sucesso!');
      setNomeEmpresa('');
      setCnpj('');
      setTelefone('');
    } else {
      setFeedback('Por favor, preencha todos os campos.');
    }
  }

  const handleCnpjChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 14) {
      setCnpj(value);
    }
  }

  const handleTelefoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setTelefone(value);
    }
  }

  return (
    <div>
      <h2>Cadastro de Empresa</h2>
      {feedback && <p>{feedback}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} placeholder="Nome da Empresa" />
        <input type="text" value={cnpj} onChange={handleCnpjChange} placeholder="CNPJ" />
        <input type="text" value={telefone} onChange={handleTelefoneChange} placeholder="Telefone" />
        <button type="submit">Cadastrar Empresa</button>
      </form>
    </div>
  )
}

export default CadastroEmpresa
