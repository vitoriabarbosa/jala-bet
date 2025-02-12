
// chama um alert com a dica
document.getElementById("obter-dica").addEventListener("click", obterDica);


function obterDica() {
  if (pontuacao < 20) {
    alert("Você precisa de pelo menos 20 pontos para obter uma dica.");
    return;
  }
  pontuacao -= 20;
  document.getElementById("pontuacao").innerHTML = `<i class='bx bxs-coin-stack'></i> Pontos: ${pontuacao}`;

  let matriz = Array.from({ length: tamanhoTabuleiro }, () => Array(tamanhoTabuleiro).fill(1));
  bombas.forEach(indice => {
    let linha = Math.floor(indice / tamanhoTabuleiro);
    let coluna = indice % tamanhoTabuleiro;
    matriz[linha][coluna] = 0;
  });

  let dicas = [];

  function adicionarDica(texto) {
    if (!dicas.includes(texto)) dicas.push(texto);
  }

  // dica: Soma das linhas
  for (let i = 0; i < tamanhoTabuleiro; i++) {
    let soma = matriz[i].reduce((a, b) => a + b, 0);
    adicionarDica(`A linha ${i + 1} tem soma total ${soma}.`);
  }

  // dica: Soma das colunas
  for (let j = 0; j < tamanhoTabuleiro; j++) {
    let soma = matriz.map(row => row[j]).reduce((a, b) => a + b, 0);
    adicionarDica(`A coluna ${j + 1} tem soma total ${soma}.`);
  }

  // dica: Soma das diagonais
  let somaDiagonalPrincipal = matriz.reduce((sum, row, i) => sum + row[i], 0);
  adicionarDica(`A diagonal principal tem soma total ${somaDiagonalPrincipal}.`);

  let somaDiagonalSecundaria = matriz.reduce((sum, row, i) => sum + row[tamanhoTabuleiro - 1 - i], 0);
  adicionarDica(`A diagonal secundária tem soma total ${somaDiagonalSecundaria}.`);


  // dica: Vizinhança segura
  let melhorPosicao = { linha: -1, coluna: -1, seguranca: -1 };
  for (let i = 0; i < tamanhoTabuleiro; i++) {
    for (let j = 0; j < tamanhoTabuleiro; j++) {
      if (matriz[i][j] === 1) {
        let vizinhos = [
          matriz[i - 1]?.[j], matriz[i + 1]?.[j],
          matriz[i]?.[j - 1], matriz[i]?.[j + 1]
        ].filter(v => v !== undefined).reduce((a, b) => a + b, 0);
        if (vizinhos > melhorPosicao.seguranca) {
          melhorPosicao = { linha: i, coluna: j, seguranca: vizinhos };
        }
      }
    }
  }
  adicionarDica(`A posição (${melhorPosicao.linha + 1}, ${melhorPosicao.coluna + 1}) tem vizinhos seguros.`);

  // dica: Caminho seguro
  let caminho = encontrarCaminhoSeguro(matriz);
  if (caminho.length > 0) {
    adicionarDica(`O caminho seguro começa na célula (${caminho[0][0] + 1}, ${caminho[0][1] + 1}).`);
  }

  // alert para as dicas do jogo
  alert(dicas[Math.floor(Math.random() * dicas.length)]);
  // document.getElementById("obter-dica").innerHTML = dicas[Math.floor(Math.random() * dicas.length)];
}

function encontrarCaminhoSeguro(matriz) {
  let fila = [[0, 0]];
  let visitado = new Set();
  let direcoes = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  let caminho = [];

  while (fila.length > 0) {
    let [x, y] = fila.shift();
    if (x === tamanhoTabuleiro - 1 && y === tamanhoTabuleiro - 1) return caminho;
    for (let [dx, dy] of direcoes) {
      let nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < tamanhoTabuleiro && ny < tamanhoTabuleiro && matriz[nx][ny] === 1 && !visitado.has(`${nx},${ny}`)) {
        fila.push([nx, ny]);
        visitado.add(`${nx},${ny}`);
        caminho.push([nx, ny]);
      }
    }
  }
  return [];
}
