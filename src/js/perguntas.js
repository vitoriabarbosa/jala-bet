const perguntas = [
  { pergunta: "Se A e B são matrizes quadradas de mesma ordem, então A + B = B + A?", resposta: true },
  { pergunta: "Toda matriz quadrada tem inversa?", resposta: false },
  { pergunta: "O determinante de uma matriz identidade de qualquer ordem é sempre 1?", resposta: true },
  { pergunta: "Se uma matriz tem determinante zero, então ela é invertível?", resposta: false },
  { pergunta: "Se um vetor é solução de um sistema homogêneo, ele também será solução para o sistema não homogêneo?", resposta: false },
  { pergunta: "Se uma matriz tem mais colunas do que linhas, seu sistema sempre terá solução única?", resposta: false },
  { pergunta: "Somente matrizes de ordem NxN possuem determinante?", resposta: true },
  { pergunta: "Uma matriz quadrada pode ser escrita como a soma de sua simétrica com sua antissimétrica?", resposta: true },
  { pergunta: "Matrizes de qualquer ordem podem ser multiplicadas.", resposta: false },
  { pergunta: "Toda matriz possui uma transformação linear.", resposta: false },
  { pergunta: "A quantidade de vetores 'Rn' são limitadas. ", resposta: false },
  { pergunta: "Um vetor R2 pode ser transformado em R3?", resposta: true },
];

const modalPergunta = document.getElementById("modal-pergunta");
const textoPergunta = document.getElementById("texto-pergunta");
const btnVerdadeiro = document.getElementById("resposta-verdadeiro");
const btnFalso = document.getElementById("resposta-falso");
const botaoPergunta = document.getElementById("botao-pergunta");
const overlay = document.getElementById("overlay"); // armazenar o efeito de escurecer o fundo da tela

botaoPergunta.addEventListener("click", exibirPergunta);

function exibirPergunta() {
  if (pontuacao < 20) {
    alert("Você precisa de pelo menos 20 pontos para responder a uma pergunta!");
    return;
  }

  let questao = perguntas[Math.floor(Math.random() * perguntas.length)];
  textoPergunta.textContent = questao.pergunta;
  // "mostrar" o modal da pergunta destacado e o efeito de escurecimento ao fundo
  modalPergunta.style.display = "block";
  overlay.style.display = "block";

  btnVerdadeiro.onclick = () => validarResposta(true, questao.resposta);
  btnFalso.onclick = () => validarResposta(false, questao.resposta);
}

// dps de responder a pergunta, modal some junto ao efeito de fundo
function validarResposta(respostaUsuario, respostaCorreta) {
  modalPergunta.style.display = "none";
  overlay.style.display = "none";

  if (respostaUsuario === respostaCorreta) {
    alert("Você acertou! Olha só... Tem uma estrela brilhando ali!");
    // pontuacao += 10;   // pontuação bónus
    atualizarPontuacao();

    // pega uma célula estrela oculta
    revelarEstrelaExistente();
  } else {
    alert("Ops! Resposta errada. Você perdeu 20 pontos...");
    pontuacao -= 20;
    atualizarPontuacao();
  }
}

function revelarEstrelaExistente() {
  // array com todas as posições que não são bombas e não estão reveladas
  let starCells = [];
  for (let i = 0; i < tamanhoTabuleiro * tamanhoTabuleiro; i++) {
    if (!bombas.has(i)) {
      let celula = document.querySelector(`.celula[data-index="${i}"]`);
      // verifica se não está revelada ainda
      if (celula && !celula.classList.contains("revelada")) {
        starCells.push(celula);
      }
    }
  }
  
  if (starCells.length === 0) { // teste
    alert("Não há mais estrelas para serem reveladas no tabuleiro!");
    return;
  }

  // sorteia uma das estrelas não reveladas
  let celulaSorteada = starCells[Math.floor(Math.random() * starCells.length)];
  revelarCelula(celulaSorteada);
}
