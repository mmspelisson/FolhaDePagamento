import React from 'react';

const Modal = ({ funcionario, onClose }) => {
  return (
    <div className="modal">
      
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Detalhes do Funcionário</h2>
        <p>Nome: {funcionario.nome}</p>
        <p>Cargo: {funcionario.cargo}</p>
        <p>Função: {funcionario.funcao}</p>
        <p>Telefone: {funcionario.telefone}</p>
        <p>CPF: {funcionario.cpf}</p>
        <p>Sexo: {funcionario.sexo}</p>

        {funcionario.sexo === 'Feminino' && (
          <p>Quantidade de filhos menores de 14 anos: {funcionario.quantidadeFilhos}</p>
        )}

        <p>Tipo de Empregado: {funcionario.tipoEmpregado}</p>
        <p>Dias Trabalhados por Mês: {funcionario.diasTrabalhados}</p>
        <p>Horas Extras: {funcionario.horasExtras} horas</p>
        {funcionario.comissao && (
          <p>Comissão: R$ {funcionario.comissao}</p>
        )};
        <button onClick={onClose}> Fechar </button>
      </div>
    </div>
  );
};

export default Modal;
