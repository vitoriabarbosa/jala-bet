# Jala Bet 🎲💰

Jala Bet é um jogo de apostas **baseado em matrizes e conceitos de álgebra**. O objetivo é testar sua `sorte` e `conhecimento matemático` para avançar pelos níveis e acumular pontos!

---

## 📌 Funcionalidades
- Tabuleiro dinâmico representado por uma matriz.
- Níveis progressivos com dificuldade crescente.
- Dicas matemáticas baseadas em soma de elementos da matriz.
- Sistema de pontuação e recompensas.
- Alertas para fornecer dicas e feedback ao jogador.
- Implementação de um sistema de apostas fictício.
  
---

## 🖼️ Demonstração
![img.png](src/assets/img/demonstracao.png)
Confira o projeto ao vivo: https://jala-bet.vercel.app

---

## 🚀 Tecnologias Utilizadas
- **HTML5** - Estrutura do jogo.
- **CSS3** - Estilização.
- **JavaScript** - Lógica do jogo e manipulação do DOM.
- **BoxIcons** - Ícones utilizados na interface.
- **Vercel** - Hospedagem do jogo.
- **Git** - Controle de versão.

---

## 🎮 Como Jogar
- Escolha o valor da sua aposta.
- Clique em "Jogar" para gerar o tabuleiro.
- Se encontrar uma estrela (⭐), ganha pontos!
- Se encontrar uma bomba (💣), perde tudo e o jogo reinicia.
- Acumule pontos para avançar de nível.
- Use dicas matemáticas para prever os melhores caminhos!
- Utilize os alertas para obter informações valiosas!
  
---

## 📂 Estrutura do Projeto
```
jala-bet/
│-- index.html          # Arquivo principal do jogo
│-- css/
│   ├── index.css       # Estilos gerais
│   ├── modais.css      # Estilos para efeitos interativos do jogo
│   ├── main.css        # Estilos principais do jogo
│-- js/
│   ├── jogo.js         # Geração do tabuleiro e mecanismos principais do jogo
│   ├── dicas.js        # Lógica para dicas matemáticas (usando alertas)
│   ├── perguntas.js    # Lógica para perguntas de álgebra (verdadeiro ou falso)
│   ├── modal.js        # Funcionalidades interativas do jogo
│-- assets/
│   ├── img/            # Imagens do jogo
│-- README.md           # Documentação
```
  
---

## 🔀 Fluxograma
```mermaid
flowchart TD
    A[Início] -->|Escolhe Aposta| B[Define valor da aposta]
    B --> C[Configura Tabuleiro]
    C --> D[Distribui Bombas]
    D --> E[Inicia o Jogo]
    E -->|Escolhe uma célula| F{Célula tem Bomba?}
    F -- Sim --> G[Perde tudo e o jogo reinicia]
    F -- Não --> H{Célula tem Estrela?}
    H -- Sim --> I[Recebe Pontos]
    H -- Não --> J[Continua jogando]
    I --> K{Pontos suficientes para subir de nível?}
    K -- Sim --> L[Aumenta dificuldade e próximo nível]
    K -- Não --> J
    G -->|Nova tentativa| B
    L --> C

```

---

## 🛠 Como Executar o Projeto
### 1. Clone este repositório:
  ```bash
  git clone https://github.com/vitoriabarbosa/jala-bet.git
  ```

### 2. Acesse a pasta do projeto:
  ```bash
  cd jala-bet
  ```

### 3. Abra o arquivo index.html no navegador.
  

---

## 📀 Melhorias Futuras
- Adicionar mais temas de álgebra para dicas/perguntas.
- Ajustar lógica da pontuação e recompensas.
- Melhorar efeitos visuais e animações do jogo.
- Expandir a interface responsiva. (?)

---
