let nivel = 1; // nível easy
let tamanhoTabuleiro = 3; // tabuleiro inicial
let bombas = new Set(); // armazena as posições das bombas
const tabuleiro = document.getElementById("tabuleiro");
let pontuacao = 0;
let apostaInicial = 10;
let multiplicador = 0.5;

function criarTabuleiro() {
  tabuleiro.innerHTML = "";
  tamanhoTabuleiro = 2 + nivel; // aumenta o tabuleiro a cada nível (+ difícil)
  let numBombas = Math.floor(tamanhoTabuleiro * tamanhoTabuleiro * 0.3); // 30% do tabuleiro com bombas
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
  let apostaValor = parseFloat(document.getElementById("bet-amount").value) || apostaInicial;

  if (bombas.has(indice)) {
    // celula.textContent = "0";
    celula.textContent = "💣";
    celula.classList.add("bomba");

    // dá um tempinho antes de mostrar o alerta e resetar o jogo
    setTimeout(() => {
      revelarTabuleiro();
      console.log(revelarTabuleiro());
      setTimeout(() => {
        alert("Você perdeu! Reiniciando o jogo.");
        nivel = 1;
        pontuacao = 0;
        multiplicador = 1.5;
        criarTabuleiro();
      }, tamanhoTabuleiro * 50 + 1000); // espera pra revelar todas as células antes de resetar
    }, 500); // pequeno delay
  } else {
    // celula.textContent = "1";
    celula.textContent = "⭐";
    celula.classList.add("estrela");
    pontuacao += Math.floor(apostaValor * multiplicador);

    if (pontuacao >= nivel * 50) { // avança de nível
      setTimeout(() => {
        revelarTabuleiro();
        setTimeout(() => {
          alert("Parabéns! Você avançou para o próximo nível!");
          nivel++;
          multiplicador *= 2; // multiplicador x2 a cada nível
          criarTabuleiro();
        }, tamanhoTabuleiro * 50 + 1000); // espera pra revelar todas as células antes de resetar
      }, 500); // pequeno delay
    }
  }
  
  document.getElementById("pontuacao").innerHTML = `<i class='bx bxs-coin-stack'></i> Pontos: ${pontuacao}`;
}

function revelarTabuleiro() {
  let celulas = document.querySelectorAll(".celula");

  celulas.forEach((celula, index) => {
    setTimeout(() => {
      let indice = parseInt(celula.dataset.index);

      if (bombas.has(indice)) {
        celula.textContent = "💣";
        // celula.textContent = "0"; // bomba = "0"
        celula.classList.add("bomba");
      } else {
        celula.textContent = "⭐";
        // celula.textContent = "1"; // estrela =' "1"
        celula.classList.add("estrela");
      }

      celula.classList.add("revelada"); // animação
    }, index * 50); // efeito "cascata"
  });
}
