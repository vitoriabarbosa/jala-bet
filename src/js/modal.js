
document.addEventListener("DOMContentLoaded", () => {
  // evento de clique para todos os links
  document.querySelectorAll("header ul li a").forEach(link => {
    link.addEventListener("click", (event) => {
      event.stopPropagation(); // evita b.o com o clique fora

      // pega o id de cada caixa
      let infoId = link.getAttribute("data-info");
      abrirInfo(infoId);
    });
  });

  // seleciona todos os botões de fechar [ x ]
  document.querySelectorAll(".titulo-info button").forEach(botao => {
    botao.addEventListener("click", (event) => {
      event.stopPropagation(); // não fechar ao clicar no próprio botão (pensando...)
      let caixaInfo = botao.closest(".modal-info-jogo");
      fecharInfo(caixaInfo.id);
    });
  });
});

// abrir a caixa de informações
function abrirInfo(id) {
  let caixaInfo = document.getElementById(id);
  if (!caixaInfo) return; // Se não existe, sai

  // fecha todas as outras antes de abrir !!!
  document.querySelectorAll(".modal-info-jogo").forEach(caixa => {
    if (caixa.id !== id) caixa.classList.remove("active");
  });

  caixaInfo.classList.add("active");

  // atraso para fechar ao clicar fora
  setTimeout(() => {
    document.addEventListener("click", fecharFora);
  }, 10);
}

// fechar a caixa de informações
function fecharInfo(id) {
  let caixaInfo = document.getElementById(id);
  if (!caixaInfo) return;

  caixaInfo.classList.remove("active");

  // tira o evento de fechar ao clicar fora -> se não houver caixas abertas
  if (!document.querySelector(".modal-info-jogo.active")) {
    document.removeEventListener("click", fecharFora);
  }
}

// fechar ao clicar fora
function fecharFora(event) {
  let caixasInfo = document.querySelectorAll(".modal-info-jogo.active");
  let clicarNaCaixa = Array.from(caixasInfo).some(caixaInfo => caixaInfo.contains(event.target));

  if (!clicarNaCaixa) {
    caixasInfo.forEach(infoBox => infoBox.classList.remove("active"));
    document.removeEventListener("click", fecharFora);
  }
}

