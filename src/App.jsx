import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import GerarPdf from './pages/GerarPdf.jsx'
import CadastroEmpresa from './components/Empresa/CadastroEmpresa.jsx'
import CadastroFuncionario from './components/Funcionario/CadastroFuncionario.jsx'
import CadastroDependentes from './components/Funcionario/CadastroDependentes.jsx'
import banco from './utils/db'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'


function App() {
  const [empresaData, setEmpresaData] = useState(null)
  const [funcionarios, setFuncionarios] = useState([])

  useEffect(() => {
    const data = banco.getData('empresaData');
    setEmpresaData(data);
  }, [])

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/cadastrar-empresa">Cadastrar Empresa</Link>
            </li>
            <li>
              <Link to="/cadastrar-funcionario">Cadastrar Funcionário</Link>
            </li>
            <li>
              <Link to="/gerar-pdf">Gerar Folha</Link>
            </li>
            <li>
              <Link to="/cadastrar-dependentes">Cadastrar Dependentes</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/cadastrar-empresa" element={<CadastroEmpresa />} />
          <Route path="/cadastrar-funcionario" element={<CadastroFuncionario onCadastro={setFuncionarios} />} />
          <Route path="/gerar-pdf" element={<GerarPdf empresaData={empresaData} funcionarios={funcionarios} />} />
          <Route path="/cadastrar-dependentes" element={<CadastroDependentes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
