const db = {
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
    // lógica de calculos
    calcularCenarios: (salarioBruto) => {
      const FGTS = Math.min(salarioBruto * 0.08, 240);
      const INSS = Math.min(salarioBruto * 0.11, 277.40);
      const IRRF = 61.40;
      const valeTransporte = 180;
      const valeAlimentacao = Math.min(salarioBruto * 0.10, 300);
      const salarioLiquido = salarioBruto - FGTS - INSS - IRRF - valeTransporte - valeAlimentacao;
  
      return {
        FGTS,
        INSS,
        IRRF,
        valeTransporte,
        valeAlimentacao,
        salarioLiquido
      };
    }
  };
  
  export default db;
  