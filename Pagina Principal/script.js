function calcular() {
  var fajuta = parseInt(document.getElementById("fajuta-input").value) || 0;
  var fiveSeven = parseInt(document.getElementById("five-seven-input").value) || 0;
  var mp5 = parseInt(document.getElementById("mp5-input").value) || 0;
  var tec9 = parseInt(document.getElementById("tec-9-input").value) || 0;
  var ak = parseInt(document.getElementById("ak-input").value) || 0;
  var akMk2 = parseInt(document.getElementById("ak-mk2-input").value) || 0;
  var g3 = parseInt(document.getElementById("g3-input").value) || 0;

  var precoParceria = calcularPrecoParceria(fajuta, fiveSeven, mp5, tec9, ak, akMk2, g3);
  var precoTabela = calcularPrecoTabela(fajuta, fiveSeven, mp5, tec9, ak, akMk2, g3);
  var porcentagemVenda = calcularPorcentagemVendaTotal(precoParceria, 15);
  var valorTotal = precoParceria - porcentagemVenda;

  document.getElementById("parceria-price").textContent = formatarValor(precoParceria);
  document.getElementById("tabela-price").textContent = formatarValor(precoTabela);
  document.getElementById("porcentagem-price").textContent = formatarValor(porcentagemVenda);
  document.getElementById("valor-total-price").textContent = formatarValor(valorTotal);

  document.getElementById("form-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  var horarioVenda = new Date().toLocaleTimeString();
  document.getElementById("horario-venda").textContent = "" + horarioVenda;

  // Obtém a quantidade de balas-fines vendidas
  var balasFines = [];
  if (fajuta > 0) {
    balasFines.push(fajuta + " Fajuta");
  }
  if (fiveSeven > 0) {
    balasFines.push(fiveSeven + " Five-Seven");
  }
  if (mp5 > 0) {
    balasFines.push(mp5 + " MP5");
  }
  if (tec9 > 0) {
    balasFines.push(tec9 + " Tec-9");
  }
  if (ak > 0) {
    balasFines.push(ak + " Ak");
  }
  if (akMk2 > 0) {
    balasFines.push(akMk2 + " Ak Mk2");
  }
  if (g3 > 0) {
    balasFines.push(g3 + " G3");
  }

  // Adiciona a venda ao histórico
  var venda = {
    detalhes: balasFines.join(", "),
    horario: new Date()
  };
  adicionarAoHistorico(venda);
}

function resetarValores() {
  document.getElementById("fajuta-input").value = "";
  document.getElementById("five-seven-input").value = "";
  document.getElementById("mp5-input").value = "";
  document.getElementById("tec-9-input").value = "";
  document.getElementById("ak-input").value = "";
  document.getElementById("ak-mk2-input").value = "";
  document.getElementById("g3-input").value = "";
}

function novoCalculo() {
  resetarValores();
  document.getElementById("form-container").style.display = "block";
  document.getElementById("result-container").style.display = "none";
}

function calcularPrecoParceria(fajuta, fiveSeven, mp5, tec9, ak, akMk2, g3) {
  var fajutaPrice = fajuta * 300;
  var fiveSevenPrice = fiveSeven * 700;
  var mp5Price = mp5 * 800;
  var tec9Price = tec9 * 800;
  var akPrice = ak * 900;
  var akMk2Price = akMk2 * 1100;
  var g3Price = g3 * 1200;

  return fajutaPrice + fiveSevenPrice + mp5Price + tec9Price + akPrice + akMk2Price + g3Price;
}

function calcularPrecoTabela(fajuta, fiveSeven, mp5, tec9, ak, akMk2, g3) {
  var fajutaPrice = fajuta * 400;
  var fiveSevenPrice = fiveSeven * 800;
  var mp5Price = mp5 * 900;
  var tec9Price = tec9 * 900;
  var akPrice = ak * 1000;
  var akMk2Price = akMk2 * 1200;
  var g3Price = g3 * 1300;

  return fajutaPrice + fiveSevenPrice + mp5Price + tec9Price + akPrice + akMk2Price + g3Price;
}

function calcularPorcentagemVendaTotal(precoParceria, porcentagemVenda) {
  return (precoParceria * porcentagemVenda) / 100;
}

function formatarValor(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function irParaTabela() {
  window.location.href = "Tabela de Preços/tabela.html";
}

function irParaHistorico() {
  window.location.href = "Pagina de Historico/historico.html";
}

// Função para adicionar a venda ao histórico e salvar no armazenamento local
function adicionarAoHistorico(venda) {
  // Obtém o histórico de vendas do armazenamento local
  var historicoVendas = localStorage.getItem("historicoVendas");

  // Verifica se há um histórico de vendas existente
  if (historicoVendas) {
    // Se existir, converte o histórico de vendas de JSON para um array
    historicoVendas = JSON.parse(historicoVendas);
  } else {
    // Se não existir, inicializa um novo array
    historicoVendas = [];
  }

  // Adiciona a nova venda ao histórico de vendas
  historicoVendas.push(venda);

  // Salva o histórico de vendas atualizado no armazenamento local
  localStorage.setItem("historicoVendas", JSON.stringify(historicoVendas));
}

// Função para exibir o histórico de vendas
function exibirHistorico() {
  var historicoContainer = document.getElementById("historico-container");
  historicoContainer.innerHTML = "";

  // Obtém o histórico de vendas do armazenamento local
  var historicoVendas = localStorage.getItem("historicoVendas");

  // Verifica se há um histórico de vendas existente
  if (historicoVendas) {
    // Se existir, converte o histórico de vendas de JSON para um array
    historicoVendas = JSON.parse(historicoVendas);

    // Percorre o array de vendas e cria elementos para exibição no histórico
    for (var i = 0; i < historicoVendas.length; i++) {
      var venda = historicoVendas[i];

      var vendaItem = document.createElement("div");
      vendaItem.classList.add("venda-item");

      var detalhes = document.createElement("p");
      detalhes.textContent = venda.detalhes;
      vendaItem.appendChild(detalhes);

      var horario = document.createElement("p");
      horario.textContent = venda.horario.toLocaleTimeString();
      vendaItem.appendChild(horario);

      historicoContainer.appendChild(vendaItem);
    }
  } else {
    // Se não existir um histórico de vendas, exibe uma mensagem de histórico vazio
    var mensagem = document.createElement("p");
    mensagem.textContent = "Nenhum histórico de vendas encontrado.";
    historicoContainer.appendChild(mensagem);
  }
}
