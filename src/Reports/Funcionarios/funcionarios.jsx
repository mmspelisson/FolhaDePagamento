//aqui gera o pdf

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function generatePDF(funcionarios, empresaData) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    console.log({empresaData})
    
    const contentEmpresa = [
        { text: 'Dados da Empresa', style: 'header' },
        `Nome: ${empresaData.nomeEmpresa}`,
        `CNPJ: ${empresaData.cnpj}`,
        `Telefone: ${empresaData.telefone}`,
        { text: '', margin: [0, 5] }];

    const contentFuncionarios = [
        { text: 'Folha de Pagamento', style: 'header' },
        { text: 'Lista de Funcionários', style: 'subHeader' },
        {
            ul: funcionarios.map(funcionario => [
                `Nome: ${funcionario.nome}`,
                `Cargo: ${funcionario.cargo}`,
                `Função: ${funcionario.funcao}`,
                `Telefone: ${funcionario.telefone}`,
                `CPF: ${funcionario.cpf}`,
                `Sexo: ${funcionario.sexo}`,
                `Tipo de Empregado: ${funcionario.tipoEmpregado}`,
                `Salário Bruto: ${funcionario.salarioBruto}`,
                `Data de Admissão: ${funcionario.dataAdmissao}`,
                `Dias Trabalhados por Mês: ${funcionario.diasTrabalhados}`,
                `Horas Extras: ${funcionario.horasExtras}`,
                `Comissão: ${funcionario.comissao}`,
                `Descontos Aplicados: ${funcionario.descontos}`,
                `Salário Liquido: R$ ${funcionario.salarioLiquido}`,
                { text: '', margin: [0, 5] } 
            ])
        }
    ]

    const content = [...contentEmpresa, ...contentFuncionarios];

    const docDefinition = {
        content,
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10] 
            }
        }
    }

    pdfMake.createPdf(docDefinition).download('lista_funcionarios.pdf')
}

export default generatePDF
