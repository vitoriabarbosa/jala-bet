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

const elementosOcultos = document.querySelectorAll("#obter-dica, #botao-pergunta, #pontuacao");

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

  // exibe os elementos ocultos ao iniciar o jogo
  elementosOcultos.forEach(item => item.classList.remove("escondido"));

  // exibe os elementos ocultos do painel e adiciona o efeito de "queda" aos itens do painel
  setTimeout(() => {
    elementosOcultos.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("mostrar");
      }, index * 150);
    });
  }, 200);
}

function obterMultiplicadorBombas(porcentagem) {
  let porcentagemInteira = Math.round(porcentagem * 100);
  const multiplicadores = {40: 1.2, 50: 1.5, 60: 1.8, 70: 2.2, 80: 2.5 };

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
  let larguraTela = window.innerWidth; // largura da tela
  let tamanhoCelula;

  // Mantendo a responsividade do jogo!
  // tamanho da célula conforme o tabuleiro e tela!
  if (larguraTela <= 768) { // versão mobile
    tamanhoCelula = Math.max(3 - (tamanhoTabuleiro - 3) * 0.3, 1.8); // ajuste
  } else { // Se for desktop
    tamanhoCelula = Math.max(5 - (tamanhoTabuleiro - 3) * 0.5, 2.5);
  }

  // atualiza a variável CSS global
  document.documentElement.style.setProperty('--tamanho-celula', `${tamanhoCelula}rem`);

  // ajusta o grid dinamicamente
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

// carregar e redimensionar a tela, mas verificando se o jogo foi iniciado, primeiro!
window.addEventListener('resize', () => {
  if (jogoIniciado) criarTabuleiro();
});


function gerarBombas(numBombas) {
  let posicoesBombas = new Set();

  // adiciona bombas em posições aleatórias até atingir o número (%) desejado
  while (posicoesBombas.size < numBombas) {
    posicoesBombas.add(Math.floor(Math.random() * (tamanhoTabuleiro * tamanhoTabuleiro)));
  }

  return posicoesBombas;
}

function revelarCelula(celula) {
  // se a célula já foi revelada, não faz nada
  if (celula.classList.contains("revelada")) {
    return;
  }

  let indice = parseInt(celula.dataset.index);
  let apostaValor = parseFloat(apostaSelect.value);
  let porcentagemBombas = parseInt(bombasSelect.value) / 100;

  let multiplicadorNivel = 1 + (nivel - 1) * 0.25; // Aumentar progressivamente o multiplicador de nível
  let multiplicadorBombas = obterMultiplicadorBombas(porcentagemBombas);
  let pontuacaoRodada = Math.floor(apostaValor * multiplicadorNivel * multiplicadorBombas);

  // exibe a bomba ou estrela
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

    pontuacao += pontuacaoRodada; // atualiza a pontuação quando estrela é coletada
    estrelasColetadas++;

    if (estrelasColetadas >= Math.ceil(totalEstrelas * 0.6)) {
      setTimeout(() => {
        revelarTabuleiro(() => {
          setTimeout(() => {
            if (tamanhoTabuleiro < 7) {
              tamanhoTabuleiro++;
              nivel++;
              alert(`🎊 Parabéns! 🎊 Nível ${nivel}, tabuleiro ${tamanhoTabuleiro}x${tamanhoTabuleiro}!`);
              iniciarJogo(); // próximo nível
            } else {
              exibirModalFinal()
            }
          }, 1000);
        });
      }, 500);
    }
  }

  verificarVitoria();
  atualizarPontuacao(); // atualiza a pontuação na tela após coletar uma estrela
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

      // adiciona a classe "bloqueada" as células que não descoberta pelo jogador
      if (!celula.classList.contains("revelada")) {
        celula.classList.add("bloqueada");
      }

      // conteúdo da célula (bomba ou estrela)
      celula.textContent = bombas.has(indice) ? "💣" : "⭐";
      celula.classList.add(bombas.has(indice) ? "bomba" : "estrela", "revelada");

      if (index === celulas.length - 1 && callback) setTimeout(callback, 500);
    }, index * 50);
  });
}

function resetarJogo(mensagem = "Poxa... Você perdeu! 😬") {
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
  
  // oculta os elementos do painel
  elementosOcultos.forEach(item => {
    item.classList.remove("mostrar"); // remove o efeito de exibição
    item.classList.add("escondido");  // faz com que os elementos sejam ocultos
  });

  document.querySelectorAll(".celula").forEach(celula => {
    celula.classList.remove("revelada", "bomba", "estrela", "bloqueada");
    celula.textContent = "";
  });

  atualizarPontuacao();
  tabuleiro.innerHTML = '';
  document.getElementById("pontuacao").innerHTML = `<i class='bx bxs-coin-stack'></i> Pontos`;
}
