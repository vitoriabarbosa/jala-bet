let nivel = 1;
let tamanhoTabuleiro = 3;
let bombas = new Set();
let pontuacao = 0;
let estrelasColetadas = 0;
let totalEstrelas = 0;
let jogoIniciado = false;

const tabuleiro = document.getElementById("tabuleiro");
const apostaSelect = document.getElementById("bet-amount");
const bombasSelect = document.getElementById("num-bombas");

document.getElementById("iniciar-jogo").addEventListener("click", iniciarJogo);

function iniciarJogo() {
  let porcentagemBombas = parseInt(document.getElementById("num-bombas").value) / 100;
  let numBombas = Math.floor((tamanhoTabuleiro * tamanhoTabuleiro) * porcentagemBombas);
  atualizarPontuacao();
  bloquearSeletores();

  bombas = gerarBombas(numBombas);
  totalEstrelas = (tamanhoTabuleiro * tamanhoTabuleiro) - bombas.size;
  estrelasColetadas = 0;

  criarTabuleiro();
  jogoIniciado = true;
}

function obterMultiplicadorBombas(porcentagem) {
  let porcentagemInteira = Math.round(porcentagem * 100);
  const multiplicadores = { 40: 1.2, 50: 1.5, 60: 1.8, 70: 2.2, 80: 2.5 };

  // se a porcentagem não estiver na tabela, retorna um cálculo proporcional
  return multiplicadores[porcentagemInteira] || (1 + (porcentagem / 0.5));
}

function atualizarPontuacao(valor = pontuacao) {
  document.getElementById("pontuacao").innerHTML = `<i class='bx bxs-coin-stack'></i> Pontos: ${valor}`;
}

function bloquearSeletores() {
  document.querySelectorAll(".ativado").forEach(div => {
    div.classList.add("desativado");
  });
  apostaSelect.disabled = true;
  bombasSelect.disabled = true;
}

function criarTabuleiro() {
  // define o tamanho das células baseado no tamanho do tabuleiro
  let tamanhoCelula = Math.max(5 - (tamanhoTabuleiro - 3) * 0.5, 2.5);
  document.documentElement.style.setProperty('--tamanho-celula', `${tamanhoCelula}rem`);

  tabuleiro.style.gridTemplateColumns = `repeat(${tamanhoTabuleiro}, var(--tamanho-celula))`;
  tabuleiro.innerHTML = '';

  // cria as células do tabuleiro
  for (let i = 0; i < tamanhoTabuleiro * tamanhoTabuleiro; i++) {
    let celula = document.createElement('div');
    celula.classList.add('celula');
    celula.dataset.index = i;
    celula.addEventListener("click", () => revelarCelula(celula));
    tabuleiro.appendChild(celula);
  }
}

function gerarBombas(numBombas) {
  let posicoesBombas = new Set();

  // adiciona bombas em posições aleatórias até atingir o número (%) desejado
  while (posicoesBombas.size < numBombas) {
    posicoesBombas.add(Math.floor(Math.random() * (tamanhoTabuleiro * tamanhoTabuleiro)));
  }

  return posicoesBombas;
}

function revelarCelula(celula) {
  // Se a célula já foi revelada, não faz nada
  if (celula.classList.contains("revelada")) {
    return;
  }

  let indice = parseInt(celula.dataset.index);
  let apostaValor = parseFloat(apostaSelect.value);
  let porcentagemBombas = parseInt(bombasSelect.value) / 100;

  let multiplicadorNivel = 1 + (nivel - 1) * 0.5; // Aumentar progressivamente o multiplicador de nível
  let multiplicadorBombas = obterMultiplicadorBombas(porcentagemBombas);
  let pontuacaoRodada = Math.floor(apostaValor * multiplicadorNivel * multiplicadorBombas);

  // Exibe a bomba ou estrela imediatamente
  if (bombas.has(indice)) {
    celula.textContent = "💣";
    celula.classList.add("bomba", "revelada");

    setTimeout(() => {
      revelarTabuleiro(() => {
        setTimeout(() => {
          resetarJogo();
        }, 1000);
      });
    }, 500);
  } else {
    celula.textContent = "⭐";
    celula.classList.add("estrela", "revelada");

    pontuacao += pontuacaoRodada; // Atualiza a pontuação quando estrela é coletada
    estrelasColetadas++;

    if (estrelasColetadas >= Math.ceil(totalEstrelas * 0.5)) {
      setTimeout(() => {
        revelarTabuleiro(() => {
          setTimeout(() => {
            if (tamanhoTabuleiro < 7) {
              tamanhoTabuleiro++;
              nivel++;
              alert(`Parabéns! Nível ${nivel}, tabuleiro ${tamanhoTabuleiro}x${tamanhoTabuleiro}!`);
              iniciarJogo(); // Próximo nível
            } else {
              alert(`Você está no nível máximo! Continue coletando as estrelas para vencer o jogo!`);
            }
          }, 1000);
        });
      }, 500);
    }
  }

  verificarVitoria();
  atualizarPontuacao(); // Atualiza a pontuação na tela após coletar uma estrela
}

function verificarVitoria() {
  if (estrelasColetadas >= totalEstrelas) {
    exibirModalFinal();
  }
}

function revelarTabuleiro(callback) {
  document.querySelectorAll(".celula").forEach((celula, index, celulas) => {
    setTimeout(() => {
      let indice = parseInt(celula.dataset.index);
      celula.textContent = bombas.has(indice) ? "💣" : "⭐";
      celula.classList.add(bombas.has(indice) ? "bomba" : "estrela", "revelada");

      // Adiciona o log para revelar o estado de cada célula
      console.log(`Célula ${indice}: ${bombas.has(indice) ? "💣" : "⭐"}`);

      if (index === celulas.length - 1 && callback) setTimeout(callback, 500);
    }, index * 50);
  });
}

function resetarJogo(mensagem = "Poxa... Você perdeu!") {
  alert(mensagem);
  nivel = 1;
  tamanhoTabuleiro = 3;
  pontuacao = 0;
  jogoIniciado = false;

  // reativa os seletores
  document.querySelectorAll(".ativado").forEach(div => {
    div.classList.remove("desativado");
  });
  apostaSelect.disabled = false;
  bombasSelect.disabled = false;
  
  atualizarPontuacao();
  tabuleiro.innerHTML = '';
  document.getElementById("pontuacao").innerHTML = `<i class='bx bxs-coin-stack'></i> Pontos`;
  
}
