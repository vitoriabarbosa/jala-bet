function obterDica() {
  if (pontuacao < 20) {
    alert("Você precisa de pelo menos 20 pontos para obter uma dica.");
    return;
  }

  pontuacao -= 20;
  document.getElementById("pontuacao").textContent = "Pontos: " + pontuacao;

  let matriz = [];
  for (let i = 0; i < tamanhoTabuleiro; i++) {
    matriz.push(new Array(tamanhoTabuleiro).fill(0));
  }

  // preenche a matriz com bombas (0 = bomba, 1 = estrela)
  bombas.forEach(indice => {
    let linha = Math.floor(indice / tamanhoTabuleiro);
    let coluna = indice % tamanhoTabuleiro;
    matriz[linha][coluna] = 0;
  });

  // marcando os valores 1 (estrelas)
  for (let i = 0; i < tamanhoTabuleiro; i++) {
    for (let j = 0; j < tamanhoTabuleiro; j++) {
      if (!bombas.has(i * tamanhoTabuleiro + j)) {
        matriz[i][j] = 1;
      }
    }
  }

  // dicas aleatórias entre linha e colunas (trazer dicas que envolvam algo sobre algebra)
  let tipoDica = Math.random() > 0.5 ? "linha" : "coluna";
  let indiceDica = Math.floor(Math.random() * tamanhoTabuleiro);

  if (tipoDica === "linha") {
    let somaLinha = matriz[indiceDica].reduce((a, b) => a + b, 0);
    alert(`Dica: A soma dos valores na linha ${indiceDica + 1} é ${somaLinha}.`);
  } else {
    let somaColuna = matriz.map(linha => linha[indiceDica]).reduce((a, b) => a + b, 0);
    alert(`Dica: A soma dos valores na coluna ${indiceDica + 1} é ${somaColuna}.`);
  }
}
