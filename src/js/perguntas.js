const perguntas = [
  { pergunta: "Se A e B são matrizes quadradas de mesma ordem, então A + B = B + A?", resposta: true },
  { pergunta: "Toda matriz quadrada tem inversa?", resposta: false },
  { pergunta: "O determinante de uma matriz identidade de qualquer ordem é sempre 1?", resposta: true },
  { pergunta: "Se uma matriz tem determinante zero, então ela é invertível?", resposta: false },
  { pergunta: "Se um vetor é solução de um sistema homogêneo, ele também será solução para o sistema não homogêneo?", resposta: false },
  { pergunta: "Se uma matriz tem mais colunas do que linhas, seu sistema sempre terá solução única?", resposta: false }
  //   pensando em outras perguntas ainda...
];

const modal = document.getElementById("modal-pergunta");
const textoPergunta = document.getElementById("texto-pergunta");
const btnVerdadeiro = document.getElementById("resposta-verdadeiro");
const btnFalso = document.getElementById("resposta-falso");
const botaoPergunta = document.getElementById("botao-pergunta");

botaoPergunta.addEventListener("click", exibirPergunta);

const overlay = document.getElementById("overlay");

function exibirPergunta() {
  if (!jogoIniciado) {
    alert("Você precisa iniciar o jogo primeiro!");
    return;
  }

  let questao = perguntas[Math.floor(Math.random() * perguntas.length)];
  textoPergunta.textContent = questao.pergunta;

  modal.style.display = "block";
  overlay.style.display = "block"; // Ativa o fundo escuro

  btnVerdadeiro.onclick = () => validarResposta(true, questao.resposta);
  btnFalso.onclick = () => validarResposta(false, questao.resposta);
}

function validarResposta(respostaUsuario, respostaCorreta) {
  modal.style.display = "none"; // Fecha o modal
  overlay.style.display = "none"; // Remove o fundo escuro

  if (respostaUsuario === respostaCorreta) {
    alert("Parabéns! Você acertou e ganhou uma dica!");
    pontuacao += 10;
    revelarEstrela();
  } else {
    alert("Ops! Resposta errada. Você perdeu 10 pontos!");
    pontuacao -= 10;
  }

  document.getElementById("pontuacao").innerHTML = `<i class='bx bxs-coin-stack'></i> Pontos: ${pontuacao}`;
}

function revelarEstrela() {
  let celulas = document.querySelectorAll(".celula:not(.estrela):not(.bomba)");
  if (celulas.length === 0) return; // Se todas já foram reveladas, não faz nada

  let celulaSorteada = celulas[Math.floor(Math.random() * celulas.length)];
  celulaSorteada.textContent = "⭐";
  celulaSorteada.classList.add("estrela");
}
