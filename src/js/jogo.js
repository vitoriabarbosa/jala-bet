let nivel = 1;
let tamanhoTabuleiro = 3; // começa com um tabuleiro 3x3
let bombas = new Set(); // armazena as posições das bombas
const tabuleiro = document.getElementById("tabuleiro"); // referência pro tabuleiro
let pontuacao = 0;
let apostaInicial = 10;
let multiplicador = 1.5;
let estrelasColetadas = 0;
let totalEstrelas = 0;
let jogoIniciado = false; // variável de controle

// botão pra iniciar o jogo
document.getElementById("iniciar-jogo").addEventListener("click", () => {
  jogoIniciado = true;
  iniciarJogo();
});

function iniciarJogo() {
  let porcentagemBombas = parseInt(document.getElementById("num-bombas").value) / 100;
  let numBombas = Math.floor((tamanhoTabuleiro * tamanhoTabuleiro) * porcentagemBombas);

  bombas = gerarBombas(numBombas);
  totalEstrelas = (tamanhoTabuleiro * tamanhoTabuleiro) - bombas.size; // Agora conta as estrelas corretamente
  estrelasColetadas = 0; // Reseta estrelas coletadas ao iniciar o jogo

  criarTabuleiro();
}

function criarTabuleiro() {
  // define o tamanho das células baseado no tamanho do tabuleiro
  let tamanhoCelula = Math.max(5 - (tamanhoTabuleiro - 3) * 0.5, 2.5);
  document.documentElement.style.setProperty('--tamanho-celula', `${tamanhoCelula}rem`);

  tabuleiro.style.gridTemplateColumns = `repeat(${tamanhoTabuleiro}, var(--tamanho-celula))`;
  tabuleiro.innerHTML = ''; // limpa o tabuleiro antes de recriar

  // cria as células do tabuleiro
  for (let i = 0; i < tamanhoTabuleiro * tamanhoTabuleiro; i++) {
    let celula = document.createElement('div');
    celula.classList.add('celula');
    celula.dataset.index = i; // armazena o índice da célula
    celula.addEventListener("click", () => revelarCelula(celula)); // adiciona o evento de clique
    tabuleiro.appendChild(celula);
  }
}

function gerarBombas(numBombas) {
  let posicoesBombas = new Set();

  // adiciona bombas em posições aleatórias até atingir o número desejado
  while (posicoesBombas.size < numBombas) {
    posicoesBombas.add(Math.floor(Math.random() * (tamanhoTabuleiro * tamanhoTabuleiro)));
  }

  return posicoesBombas;
}

function revelarCelula(celula) {
  let indice = parseInt(celula.dataset.index);
  let apostaValor = parseFloat(document.getElementById("bet-amount").value) || apostaInicial;

  if (bombas.has(indice)) {
    celula.textContent = "💣";
    celula.classList.add("bomba");

    setTimeout(() => {
      revelarTabuleiro(() => {
        setTimeout(() => {
          alert("Você perdeu! Reiniciando o jogo.");
          nivel = 1;
          tamanhoTabuleiro = 3;
          pontuacao = 0;
          multiplicador = 1.5;
          iniciarJogo();
          document.getElementById("pontuacao").innerHTML = `<i class='bx bxs-coin-stack'></i> Pontos: ${pontuacao}`; // mostra os pontos zerados
        }, 1000);
      });
    }, 500);
  } else {
    celula.textContent = "⭐";
    celula.classList.add("estrela");
    pontuacao += Math.floor(apostaValor * multiplicador);
    estrelasColetadas++;

    let estrelasNecessarias = Math.ceil(totalEstrelas * 0.5); // Agora usa um valor atualizado corretamente

    if (estrelasColetadas >= estrelasNecessarias) {
      setTimeout(() => {
        revelarTabuleiro(() => {
          setTimeout(() => {
            if (tamanhoTabuleiro < 7) {
              tamanhoTabuleiro++;
            }
            alert(`Parabéns! Você avançou para o nível ${nivel + 1} e agora o tabuleiro é ${tamanhoTabuleiro}x${tamanhoTabuleiro}!`);
            nivel++;
            multiplicador *= 1.5;
            iniciarJogo();
          }, 1000);
        });
      }, 500);
    }
  }

  document.getElementById("pontuacao").innerHTML = `<i class='bx bxs-coin-stack'></i> Pontos: ${pontuacao}`;
}

function revelarTabuleiro(callback) {
  let celulas = document.querySelectorAll(".celula");
  let totalCelulas = celulas.length;

  celulas.forEach((celula, index) => {
    setTimeout(() => {
      let indice = parseInt(celula.dataset.index);
      if (bombas.has(indice)) {
        celula.textContent = "💣";
        celula.classList.add("bomba");
      } else {
        celula.textContent = "⭐";
        celula.classList.add("estrela");
      }
      celula.classList.add("revelada");

      // chama a callback só depois que a última célula for revelada
      if (index === totalCelulas - 1 && callback) {
        setTimeout(callback, 500); // pequeno delay extra pra garantir que tudo foi renderizado
      }
    }, index * 50);
  });
}
