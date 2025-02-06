let nivel = 1; // nível easy
let tamanhoTabuleiro = 3; // tabuleiro inicial
let bombas = new Set(); // armazena as posições das bombas
const tabuleiro = document.getElementById("tabuleiro");
let pontuacao = 0;

function criarTabuleiro() {
  tabuleiro.innerHTML = "";
  tamanhoTabuleiro = 2 + nivel; // aumenta o tabuleiro a cada nível (+ difícil)
  let numBombas = Math.floor(tamanhoTabuleiro * tamanhoTabuleiro * 0.2); // 20% do tabuleiro com bombas
  bombas = gerarBombas(numBombas);

  tabuleiro.style.gridTemplateColumns = `repeat(${tamanhoTabuleiro}, 5rem)`;

  for (let i = 0; i < tamanhoTabuleiro * tamanhoTabuleiro; i++) {
    let celula = document.createElement("div");
    celula.classList.add("celula");
    celula.dataset.index = i;

    celula.addEventListener("click", function () {
      revelarCelula(this);
    });

    tabuleiro.appendChild(celula);
  }
}

function gerarBombas(numBombas) {
  let posicoesBombas = new Set();
  while (posicoesBombas.size < numBombas) {
    posicoesBombas.add(Math.floor(Math.random() * (tamanhoTabuleiro * tamanhoTabuleiro)));
  }
  return posicoesBombas;
}

function revelarCelula(celula) {
  let indice = parseInt(celula.dataset.index);

  if (bombas.has(indice)) {
    // celula.textContent = "0";
    celula.textContent = "💣";
    celula.classList.add("bomba");

    // dá um tempinho antes de mostrar o alerta e resetar o jogo
    setTimeout(() => {
      alert("Você perdeu! Reiniciando o jogo.");
      nivel = 1;
      pontuacao = 0;
      criarTabuleiro();
    }, 1000); // time de 1 segundo

  } else {
    // celula.textContent = "1";
    celula.textContent = "⭐";
    celula.classList.add("estrela");
    pontuacao += 10;

    if (pontuacao >= nivel * 50) { // avança de nível
      setTimeout(() => {
        alert("Parabéns! Você avançou para o próximo nível!");
        nivel++;
        criarTabuleiro();
      }, 1000); // time de 1 segundo antes de resetar
    }
  }

  document.getElementById("pontuacao").innerHTML = "<i class='bx bxs-coin-stack'></i> Pontos: " + pontuacao;
}
