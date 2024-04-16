import React from 'react';
import db from '../utils/db.js'; // Verifique o caminho correto para o arquivo db.js

const GerarPdf = () => {
  const empresaData = db.getData('empresa');
  const salarioBruto = empresaData ? empresaData.salarioBruto : 0;
  const cenarios = db.calcularCenarios(salarioBruto);

  const funcionarios = db.getData('funcionarios') ?? []; //p/ lista de funcionario

  return (
    <div>
      <h1>Folha de Pagamento</h1>

      <h2>Dados da Empresa:</h2>
      {empresaData && (
        <ul>
          <li>Nome da Empresa: {empresaData.nomeEmpresa}</li>
          <li>CNPJ: {empresaData.cnpj}</li>
          <li>Telefone: {empresaData.telefone}</li>
          {/* Adicione mais informações conforme necessário */}
        </ul>
      )}

      <h2>Lista de Funcionários</h2>
      <ul>
        {funcionarios.map((funcionario, index) => (
          <li key={index}>
            <p>Nome: {funcionario.nome}</p>
            <p>CPF: {funcionario.cpf}</p>
           
            // lembrar de colocar lógica de descontos

            <p>Descontos Aplicados:</p>
            <ul>
              {funcionario.descontos && Object.entries(funcionario.descontos).map(([key, value]) => (
                value && <li key={key}>{key}</li>
              ))}
            </ul>
            <p>Salário Líquido: R$ {funcionario.salarioLiquido ? Number(funcionario.salarioLiquido).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}</p>
          </li>
        ))}
      </ul>

      <h2>Cálculos de Cenários:</h2>
      <ul>
        <li>FGTS: R$ {cenarios.FGTS.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
        <li>INSS: R$ {cenarios.INSS.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
        <li>IRRF: R$ {cenarios.IRRF.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
        <li>Vale-transporte: R$ {cenarios.valeTransporte.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
        <li>Vale-alimentação: R$ {cenarios.valeAlimentacao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
        <li>Salário Bruto: R$ {salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
        <li>Salário Líquido Total: R$ {funcionarios.reduce((total, funcionario) => total + funcionario.salarioLiquido, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
      </ul>
    </div>
  );
};

export default GerarPdf;

