import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import GerarPDF from './pages/GerarPdf.jsx';
import CadastroEmpresa from './components/Empresa/CadastroEmpresa.jsx';
import CadastroFuncionario from './components/Funcionario/CadastroFuncionario.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Entrar</Link>
            </li>
            <li>
              <Link to="/cadastrar-empresa">Cadastrar Empresa</Link>
            </li>
            <li>
              <Link to="/cadastrar-funcionario">Cadastrar Funcionário</Link>
            </li>
            <li>
              <Link to="/gerar-pdf">Gerar Folha</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar-empresa" element={<CadastroEmpresa />} />
          <Route path="/cadastrar-funcionario" element={<CadastroFuncionario />} />
          <Route path="/gerar-pdf" element={<GerarPDF />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
