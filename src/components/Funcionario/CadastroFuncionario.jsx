import React, { useEffect, useState } from 'react'
import banco from '../../utils/db'

const CadastroFuncionario = ({ onCadastro, listaDependentes }) => {
  const [funcionarios, setFuncionarios] = useState([])
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [funcao, setFuncao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [sexo, setSexo] = useState('');
  const [tipoEmpregado, setTipoEmpregado] = useState('');
  const [dependentesSelecionados, setDependentesSelecionados] = useState([]);
  const [salarioBruto, setSalarioBruto] = useState(3000);
  const [descontoBeneficio, setDescontoBeneficio] = useState(false);
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [salarioMaternidade, setSalarioMaternidade] = useState(false);
  const [temDSR, setTemDSR] = useState(false);


  const handleAddDependente = (dependente) => {
    setDependentesSelecionados([...dependentesSelecionados, dependente]);
  };

  const handleRemoveDependente = (dependente) => {
    const updatedDependentes = dependentesSelecionados.filter(dep => dep !== dependente);
    setDependentesSelecionados(updatedDependentes);
  };
  useEffect(() => {
    const funcionariosSalvos = banco.getData('funcionarios');
    if (funcionariosSalvos) {
      setFuncionarios(funcionariosSalvos);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nome.trim() === '' ||
      cargo.trim() === '' ||
      funcao.trim() === '' ||
      telefone.trim() === '' ||
      cpf.trim() === '' ||
      sexo.trim() === '' ||
      tipoEmpregado.trim() === '' ||
      dataAdmissao.trim() === ''
    ) {
      setMensagem('Todos os campos devem ser preenchidos');
      return;
    }
    let salarioLiquido = salarioBruto;
    const comissaoFloat = parseFloat(comissao);
    if (!isNaN(comissaoFloat)) {
      salarioLiquido += comissaoFloat;
    }
    const descontoINSS = 227.40;
    salarioLiquido -= descontoINSS;

    const descontoIRRF = 61.40;
    salarioLiquido -= descontoIRRF;

    const descontoFGTS = 240;
    salarioLiquido -= descontoFGTS;

    if (descontos.sindical) {
      const descontoSindical = salarioBruto * 0.035;
      salarioLiquido -= descontoSindical;
    }

    if (descontos.valeAlimentacao) {
      const descontoValeAlimentacao = 300;
      salarioLiquido -= descontoValeAlimentacao;
    }

    if (descontos.valeTransporte) {
      const descontoValeTransporte = 180;
      salarioLiquido -= descontoValeTransporte;
    }
    const funcionarioData = {
      nome,
      cargo,
      funcao,
      telefone,
      cpf,
      sexo,
      tipoEmpregado,
      salarioBruto: 3000,
      descontos,
      salarioLiquido,
      diasTrabalhados,
      horasExtras,
      comissao,
      dependentesSelecionados,
      dataAdmissao,
      salarioMaternidade,
      temDSR
    };
    const novosFuncionarios = [...funcionarios, funcionarioData];
    setFuncionarios(novosFuncionarios);
    banco.saveData('funcionarios', novosFuncionarios);
    onCadastro(novosFuncionarios);

    setNome('');
    setCargo('');
    setFuncao('');
    setTelefone('');
    setCpf('');
    setSexo('');
    setTipoEmpregado('');
    setSalarioBruto(3000);
    setDescontoBeneficio(false);
    setDescontos({
      inss: true,
      irrf: true,
      sindical: false,
      fgts: true,
      valeAlimentacao: false,
      valeTransporte: false
    });
    setDiasTrabalhados(0);
    setHorasExtras('');
    setComissao('');
    setDependentesSelecionados([]);
    setDataAdmissao('');
    setSalarioMaternidade(false);
    setTemDSR(false);

    setMensagem('Funcionário cadastrado com sucesso!');
    setTimeout(() => {
      setMensagem('');
    }, 3000);
  };

  const handleDescontoChange = (e) => {
    const { name, checked } = e.target;
    setDescontos(prevDescontos => ({
      ...prevDescontos,
      [name]: checked
    }));
  }
  const [descontos, setDescontos] = useState({
    inss: true,
    irrf: false,
    sindical: false,
    fgts: true,
    valeAlimentacao: false,
    valeTransporte: false
  })

  const [diasTrabalhados, setDiasTrabalhados] = useState(0);
  const [horasExtras, setHorasExtras] = useState('');
  const [comissao, setComissao] = useState('');
  const [mensagem, setMensagem] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder="Cargo" />
      <input type="text" value={funcao} onChange={(e) => setFuncao(e.target.value)} placeholder="Função" />
      <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" />
      <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" />

      <label>
        Sexo:
        <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
          <option value="">Selecione o sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
      </label>
      {sexo === 'Feminino' && (
        <label>
          Salário Maternidade:
          <input
            type="checkbox"
            checked={salarioMaternidade}
            onChange={(e) => setSalarioMaternidade(e.target.checked)}
          />
        </label>
      )}
      <label>
        Tem direito a DSR:
        <input
          type="checkbox"
          checked={temDSR}
          onChange={(e) => setTemDSR(e.target.checked)}
        />
      </label>
      <label>
        Data de Admissão:
        <input type="date" value={dataAdmissao} onChange={(e) => setDataAdmissao(e.target.value)} />
      </label>

      <label>
        Salário Bruto: R$3.000
      </label>

      <select value={tipoEmpregado} onChange={(e) => setTipoEmpregado(e.target.value)}>
        <option value="">Selecione o tipo de empregado</option>
        <option value="CLT">CLT</option>
        <option value="Aprendiz">Aprendiz</option>
        <option value="Autônomo">Autônomo</option>
        <option value="Estagiario">Estagiário</option>
        <option value="Sócio">Sócio</option>
      </select>

      <label>
        Dias Trabalhados por Mês:
        <input type="number" value={diasTrabalhados} onChange={(e) => setDiasTrabalhados(e.target.value)} />
      </label>
      <label>
        Horas Extras (Horas):
        <input type="text" value={horasExtras} onChange={(e) => setHorasExtras(e.target.value)} placeholder="Ex: 10" />
      </label>
      <label>
        Comissão (Em R$):
        <input type="text" value={comissao} onChange={(e) => setComissao(e.target.value)} placeholder="Ex: 500" />
      </label>

      <div>
        <h3>Descontos</h3>
        <label>
          INSS:
          <input
            type="checkbox"
            name="inss"
            checked={descontos.inss}
            onChange={handleDescontoChange}
            disabled 
          />
        </label>
        <label>
          FGTS:
          <input
            type="checkbox"
            name="fgts"
            checked={descontos.fgts}
            onChange={handleDescontoChange}
            disabled 
          />
        </label>
        <label>
          IRRF:
          <input
            type="checkbox"
            name="irrf"
            checked={descontos.irrf}
            onChange={handleDescontoChange}
          />
        </label>
        <label>
          Sindicato:
          <input
            type="checkbox"
            name="sindical"
            checked={descontos.sindical}
            onChange={handleDescontoChange}
          />
        </label>

        <label>
          Vale Alimentação:
          <input
            type="checkbox"
            name="valeAlimentacao"
            checked={descontos.valeAlimentacao}
            onChange={handleDescontoChange}
          />
        </label>
        <label>
          Vale Transporte:
          <input
            type="checkbox"
            name="valeTransporte"
            checked={descontos.valeTransporte}
            onChange={handleDescontoChange}
          />
        </label>

        <div>
          <h3></h3>
          <ul>
            {listaDependentes && listaDependentes.map((dependente, index) => (
              <li key={index}>
                {dependente}
                {dependentesSelecionados.includes(dependente) ? (
                  <button type="button" onClick={() => handleRemoveDependente(dependente)}>
                    Remover
                  </button>
                ) : (
                  <button type="button" onClick={() => handleAddDependente(dependente)}>
                    Adicionar
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* <CadastroDependentes onSelecionarDependente={handleAddDependente} /> */}
        <button type="submit">Cadastrar Funcionário</button>
      </div>

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <h3>Lista de Funcionários:</h3>
        <ul>
          {funcionarios.map((funcionario, index) => (
            <li key={index}>
              <p>Nome: {funcionario.nome}</p>
              <p>Cargo: {funcionario.cargo}</p>
              <p>Função: {funcionario.funcao}</p>
              <p>Telefone: {funcionario.telefone}</p>
              <p>CPF: {funcionario.cpf}</p>
              <p>Sexo: {funcionario.sexo}</p>
              <p>Tipo de Empregado: {funcionario.tipoEmpregado}</p>
              <p>Salário Bruto: {funcionario.salarioBruto}</p>
              <p>Data de Admissão: {funcionario.dataAdmissao}</p>
              <p>Descontos: {JSON.stringify(funcionario.descontos)}</p>
              <p>Dias Trabalhados por Mês: {funcionario.diasTrabalhados}</p>
              <p>Horas Extras: {funcionario.horasExtras}</p>
              <p>Comissão: {funcionario.comissao}</p>
              <p>Dependentes Selecionados: {funcionario.dependentesSelecionados && funcionario.dependentesSelecionados.map((dependente, index) => (
                <span key={index}>{dependente.nome}{index !== funcionario.dependentesSelecionados.length - 1 && ', '}</span>
              ))}</p>

              <p>Salário Líquido: {funcionario.salarioLiquido}</p>
              {funcionario.sexo === 'Feminino' && (
                <p>Salário Maternidade: {funcionario.salarioMaternidade ? 'Sim' : 'Não'}</p>
              )}
              <p>Tem DSR: {funcionario.temDSR ? 'Sim' : 'Não'}</p>
            </li>
          ))}
        </ul>
      </div>

      {mensagem && <p>{mensagem}</p>}
    </form>
  )
}

export default CadastroFuncionario
