import React, { useState } from 'react';

const CadastroEmpresa = ({ onCadastro }) => {
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const empresaData = { nomeEmpresa, cnpj, telefone, usuario, senha };
    onCadastro(empresaData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} placeholder="Nome da Empresa" />
      <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="CNPJ" />
      <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" />
      <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Nome de usuário" />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
      <button type="submit">Cadastrar Empresa</button>
    </form>
  );
};

export default CadastroEmpresa;
