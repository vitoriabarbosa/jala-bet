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

botaoPergunta.addEventListener("click", exibirPergunta);

const overlay = document.getElementById("overlay"); // armazenar o efeito de escurecer o fundo da tela

function exibirPergunta() {
  if (!jogoIniciado) {
    alert("Opa... Você precisa iniciar o jogo primeiro!");
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
    alert("Parabéns! Você acertou e ganhou uma estrela!");
    pontuacao += 10;
    revelarEstrela();
  } else {
    alert("Ops! Resposta errada. Você perdeu 10 pontos...");
    pontuacao -= 10;
  }

  document.getElementById("pontuacao").innerHTML = `<i class='bx bxs-coin-stack'></i> Pontos: ${pontuacao}`;
}

function revelarEstrela() {
  let celulas = document.querySelectorAll(".celula:not(.estrela):not(.bomba)");
  if (celulas.length === 0) return; // se todas as células já foram reveladas, não faz nada (tirar ???)

  let celulaSorteada = celulas[Math.floor(Math.random() * celulas.length)];
  celulaSorteada.textContent = "⭐";
  celulaSorteada.classList.add("estrela");
}
