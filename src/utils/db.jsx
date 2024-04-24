

const banco = {
  saveEmpresaData: (data) => {
    localStorage.setItem('empresaData', JSON.stringify(data));
  },

  saveData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getData: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  clearData: (key) => {
    localStorage.removeItem(key);
  },

  calcularCenarios: (salarioBruto) => {
    const SalarioBruto = 3.000;
    const FGTS = 240;
    const INSS = 277.40
    const IRRF = 61.40;
    const valeTransporte = 180;
    const valeAlimentacao = 300;
    const salarioLiquido = salarioBruto - FGTS - INSS - IRRF - valeTransporte - valeAlimentacao;

    return {
      SalarioBruto,
      FGTS,
      INSS,
      IRRF,
      valeTransporte,
      valeAlimentacao,
      salarioLiquido
    }
  }
}

export default banco
