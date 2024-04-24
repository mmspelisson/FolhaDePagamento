import React, { useState, useEffect } from 'react'
import banco from '../../utils/db.jsx'

const CadastroDependentes = ({ onSelecionarDependente }) => {
  const [dependentes, setDependentes] = useState([])
  const [nome, setNome] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [dependentesSelecionados, setDependentesSelecionados] = useState([])

  useEffect(() => {
    const dependentesSalvos = banco.getData('dependentes');
    if (dependentesSalvos) {
      setDependentes(dependentesSalvos);
    }
  }, [])

  const handleAddDependente = () => {
    if (nome.trim() !== '' && dataNascimento.trim() !== '') {
      const novoDependente = { nome, dataNascimento };
      const novosDependentes = [...dependentes, novoDependente];
      setDependentes(novosDependentes);
      banco.saveData('dependentes', novosDependentes);
      setNome('');
      setDataNascimento('');
    }
  }

  const handleSelecionarDependente = (dependente) => {
    const dependenteIndex = dependentesSelecionados.findIndex((dep) => dep.nome === dependente.nome);
    if (dependenteIndex === -1) {
      setDependentesSelecionados([...dependentesSelecionados, dependente]);
    } else {
      const novosDependentesSelecionados = [...dependentesSelecionados];
      novosDependentesSelecionados.splice(dependenteIndex, 1);
      setDependentesSelecionados(novosDependentesSelecionados);
    }
  }

  const calcularSalarioFamilia = (dataNascimento) => {
    const dataNascimentoArray = dataNascimento.split('-');
    const anoNascimento = parseInt(dataNascimentoArray[0]);
    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - anoNascimento;

    if (idade <= 14) {
      const salarioMinimo = 1410;
      const percentual = 0.05;
      const valorSalarioFamilia = salarioMinimo * percentual;

      return valorSalarioFamilia;
    }

    return null
  }

  return (
    <div>
      <h2>Cadastro de Dependentes</h2>
      <div>
        <label>
          Nome do Dependente:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Data de Nascimento:
          <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
        </label>
        <button onClick={handleAddDependente}>Adicionar Dependente</button>
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <h3>Lista de Dependentes:</h3>
        <ul>
          {dependentes.map((dependente, index) => (
            <li key={index}>
              Nome: {dependente.nome}, Data de Nascimento: {dependente.dataNascimento}
              <input
                type="checkbox"
                checked={dependentesSelecionados.some((dep) => dep.nome === dependente.nome)}
                onChange={() => handleSelecionarDependente(dependente)}
              />
              {calcularSalarioFamilia(dependente.dataNascimento) !== null ? (
                <span> - Salário-Família: R$ {calcularSalarioFamilia(dependente.dataNascimento)}</span>
              ) : (
                <span> - Não concede benefício</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CadastroDependentes

