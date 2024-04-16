import React, { useState } from 'react';

const CadastroFuncionario = ({ onCadastro }) => {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [funcao, setFuncao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [sexo, setSexo] = useState('');
  const [tipoEmpregado, setTipoEmpregado] = useState('');
  const [temFilhos, setTemFilhos] = useState(false);
  const [quantidadeFilhos, setQuantidadeFilhos] = useState(0);
  const [salarioBruto, setSalarioBruto] = useState(3000);

  const [descontos, setDescontos] = useState({
    inss: false,
    sindical: false,
    fgts: true,
    valeAlimentacao: false,
    valeTransporte: false
  });

  const [diasTrabalhados, setDiasTrabalhados] = useState(0);
  const [horasExtras, setHorasExtras] = useState('');
  const [comissao, setComissao] = useState('');

  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const funcionarioData = {
      nome,
      cargo,
      funcao,
      telefone,
      cpf,
      sexo,
      tipoEmpregado,
      temFilhos,
      quantidadeFilhos,
      salarioBruto,
      descontos,
      diasTrabalhados,
      horasExtras,
      comissao
    };
    onCadastro(funcionarioData);
    setMensagem('Funcionário cadastrado com sucesso!');

    setNome('');
    setCargo('');
    setFuncao('');
    setTelefone('');
    setCpf('');
    setSexo('');
    setTipoEmpregado('');
    setTemFilhos(false);
    setQuantidadeFilhos(0);
    setSalarioBruto(3000);
    setDescontos({
      inss: false,
      sindical: false,
      fgts: false,
      valeAlimentacao: false,
      valeTransporte: false
    });

    setDiasTrabalhados(0);
    setHorasExtras('');
    setComissao('');

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
  };

  return (
    <form onSubmit={handleSubmit}>

      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder="Cargo" />
      <input type="text" value={funcao} onChange={(e) => setFuncao(e.target.value)} placeholder="Função" />
      <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" />
      <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" />
      <select value={sexo} onChange={(e) => setSexo(e.target.value)}>

        <option value="">Selecione o sexo</option>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
      </select>
      {sexo === 'Feminino' && (
        <div>
          <label>
            Se tiver filhos menores que 14 anos, selecione quantos:
            <input type="number" value={quantidadeFilhos} onChange={(e) => setQuantidadeFilhos(e.target.value)} />
          </label>
        </div>
      )}

      <select value={tipoEmpregado} onChange={(e) => setTipoEmpregado(e.target.value)}>
        <option value="">Selecione o tipo de empregado</option>
        <option value="CLT">CLT</option>
        <option value="Aprendiz">Aprendiz</option>
        <option value="Autômomo">Autônomo</option>
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
          <autoinp
            type="checkbox"
            name="inss"
            checked={descontos.inss}
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
          FGTS:
          <input
            type="checkbox"
            name="fgts"
            checked={descontos.fgts}
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
        <button type="submit">Cadastrar Funcionário</button>
      </div>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default CadastroFuncionario;
