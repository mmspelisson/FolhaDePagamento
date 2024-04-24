import React, { useState } from 'react'
// import banco from '../utils/db'
import funcionariosPDF from '../Reports/Funcionarios/funcionarios'

const GerarPdf = ({ empresaData, funcionarios }) => {
  const salarioBruto = empresaData ? empresaData.salarioBruto : 0;
  const [funcionariosSelecionados, setFuncionariosSelecionados] = useState([]);

  const funcionariosArray = Array.isArray(funcionarios) ? funcionarios : [];


  const handleSelectAll = () => {
    const allFuncionarioIds = funcionariosArray.map(funcionario => funcionario.id);
    setFuncionariosSelecionados(allFuncionarioIds);
  }

  const handleClearSelection = () => {
    setFuncionariosSelecionados([]);
  }

  const oldToggleFuncionarioSelecionado = (funcionarioId) => {
    setFuncionariosSelecionados(prevState => {
      if (prevState.includes(funcionarioId)) {
        return prevState.filter(id => id !== funcionarioId);
      } else {
        return [...prevState, funcionarioId];
      }
    })
  }

  /*
   * @param funcionarioId {string[] | string}
   */
  const toggleFuncionarioSelecionado = (funcionarioId) => {
    if (Array.isArray(funcionarioId)) { // verifica se é um array
      const listOfSelectedFuncionarios = []
      funcionarioId.forEach(element => { // verifica se a lista de funcionarios possui o funcionario
        // se o elemento existe na lista, não readiciono ele
        if (funcionarios.includes(element)) {
          const index = funcionarios.findIndex(e => e === element)
          
          // se existe, remove o elemento
          const oldFuncionarios = funcionarios
          oldFuncionarios.slice(index, 1)
          setFuncionariosSelecionados(oldFuncionarios)
        } else {
          // se não existe na lista, adiciono
          listOfSelectedFuncionarios.push(element)
          setFuncionariosSelecionados(listOfSelectedFuncionarios)
        }
      });
    }else {
      // se não for array, define o valor
      const oldFuncionarios = funcionarios
      oldFuncionarios.push(funcionarioId)
      setFuncionariosSelecionados(oldFuncionarios)
    }
  }
  
  return (
    <div>
      <h1>Folha de Pagamento</h1>

      <div>
        <button onClick={(e) => funcionariosPDF(funcionarios, empresaData)} className="btn btn-danger" type="button" id="button-addon2"><i className="far fa-file-pdf"></i> Gerar PDF</button>
        <button onClick={handleSelectAll}>Selecionar Todos</button>
        <button onClick={handleClearSelection}>Limpar Seleção</button>
      </div>

      <h2>Lista de Funcionários</h2>
      <ul>
        {funcionariosArray.map((funcionario, index) => {
          console.log({funcionario})
          return (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={funcionariosSelecionados.includes(funcionario.cpf)}
                  onChange={() => toggleFuncionarioSelecionado(funcionario.cpf)}
                />
                {funcionario.nome}
              </label>
              <p>Cargo: {funcionario.cargo}</p>
              <p>Função: {funcionario.funcao}</p>
              <p>Telefone: {funcionario.telefone}</p>
              <p>CPF: {funcionario.cpf}</p>
              <p>Sexo: {funcionario.sexo}</p>
              <p>Tipo de Empregado: {funcionario.tipoEmpregado}</p>
              <p>Salário Bruto: {funcionario.salarioBruto}</p>
              <p>Data de Admissão: {funcionario.dataAdmissao}</p>
              <p>Dias Trabalhados por Mês: {funcionario.diasTrabalhados}</p>
              <p>Horas Extras: {funcionario.horasExtras}</p>
              <p>Comissão: {funcionario.comissao}</p>
              <p>Descontos Aplicados:</p>
              <ul>
                {funcionario.descontos && Object.entries(funcionario.descontos).map(([key, value]) => (
                  value && <li key={key}>{key}</li>
                ))}
              </ul>
              <p>Salário Líquido: R$ {funcionario.salarioLiquido ? Number(funcionario.salarioLiquido).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}</p>
              <p></p>
            </li>
          )
        })}
      </ul>
      {empresaData && (
        <div>
          <h2>Dados da Empresa Cadastrada:</h2>
          <p>Nome da Empresa: {empresaData.nomeEmpresa}</p>
          <p>CNPJ: {empresaData.cnpj}</p>
          <p>Telefone: {empresaData.telefone}</p>
        </div>
      )}
    </div>
  )
}

export default GerarPdf
