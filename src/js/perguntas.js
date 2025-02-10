// implementar !!!!

function exibirPergunta() {
  let perguntas = [
    { pergunta: "Se A e B são matrizes quadradas de mesma ordem, então A + B = B + A?", resposta: true },
    { pergunta: "Toda matriz quadrada tem inversa?", resposta: false },
    { pergunta: "O determinante de uma matriz identidade de qualquer ordem é sempre 1?", resposta: true },
    { pergunta: "Se uma matriz tem determinante zero, então ela é invertível?", resposta: false },
    { pergunta: "Se um vetor é solução de um sistema homogêneo, ele também será solução para o sistema não homogêneo?", resposta: false },
    { pergunta: "Se uma matriz tem mais colunas do que linhas, seu sistema sempre terá solução única?", resposta: false }
  //   pensando em outras perguntas ainda...
  ];

  let questao = perguntas[Math.floor(Math.random() * perguntas.length)];
  let respostaUsuario = confirm(questao.pergunta);

  if (respostaUsuario === questao.resposta) {
    alert("Parabéns! Aqui vai uma dica: uma estrela brilha em tal posição!");
  } else {
    alert("Ops! Não foi dessa vez... Melhore!");
  }
}
