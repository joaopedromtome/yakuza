function exibirHistorico() {
    const historicoVendasJSON = localStorage.getItem('historicoVendas');
  
    if (historicoVendasJSON) {
      const historicoVendas = JSON.parse(historicoVendasJSON);
      const historicoContainer = document.getElementById('historico-container');
      historicoContainer.innerHTML = '';
  
      historicoVendas.forEach((venda, index) => {
        const vendaElement = document.createElement('div');
        vendaElement.classList.add('venda');
  
        const tituloElement = document.createElement('h2');
        tituloElement.textContent = `Venda ${index + 1}`;
  
        const parceriaElement = document.createElement('p');
        parceriaElement.textContent = `Parceria: ${venda.parceria}`;
  
        const tabelaElement = document.createElement('p');
        tabelaElement.textContent = `Tabela: ${venda.tabela}`;
  
        const porcentagemElement = document.createElement('p');
        porcentagemElement.textContent = `Porcentagem: ${venda.porcentagem}`;
  
        const valorTotalElement = document.createElement('p');
        valorTotalElement.textContent = `Valor Total: ${venda.valorTotal}`;
  
        const balasFinesElement = document.createElement('p');
        balasFinesElement.textContent = `Balas Fines Vendidas: ${venda.balasFines}`;
  
        const horarioVendaElement = document.createElement('p');
        horarioVendaElement.textContent = `Horário da Venda: ${venda.horarioVenda}`;
  
        vendaElement.appendChild(tituloElement);
        vendaElement.appendChild(parceriaElement);
        vendaElement.appendChild(tabelaElement);
        vendaElement.appendChild(porcentagemElement);
        vendaElement.appendChild(valorTotalElement);
        vendaElement.appendChild(balasFinesElement);
        vendaElement.appendChild(horarioVendaElement);
  
        historicoContainer.appendChild(vendaElement);
      });
    } else {
      const historicoContainer = document.getElementById('historico-container');
      historicoContainer.innerHTML = '<p>Nenhum histórico de vendas encontrado.</p>';
    }
  }
  
  function voltar() {
    window.location.href = '../index.html';
  }
  
  document.addEventListener('DOMContentLoaded', exibirHistorico);
  