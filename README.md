
![Logo do projeto](https://github.com/omariosouto/flappy-bird-devsoutinho/raw/master/_docs/logo.png)

# Projeto Flappy Bird em JavaScript
Este é o primeiro projeto de desenvolvimento de jogos que eu fiz em JavaScript, baseado na série de vídeos do DevSoutinho no YouTube. O jogo utiliza a tag canvas do HTML para renderização e toda a sua funcionalidade é implementada em JavaScript.

## Demonstração do Jogo

Você pode jogar o jogo online através do link: https://flappy-bird-gilt.vercel.app/

## Instruções de Execução Local

Para executar o jogo em sua máquina local, siga os passos abaixo:
1. Clone o repositório original do projeto:
```
git clone https://github.com/omariosouto/flappy-bird-devsoutinho.git
```

2. Navegue até o diretório clonado:
```
cd flappy-bird-devsoutinho
```
3. Abra o arquivo index.html em seu navegador preferido.

## Funcionalidades do Jogo

O jogo Flappy Bird é um jogo simples em que o jogador controla um pássaro que deve atravessar obstáculos em forma de canos sem colidir com eles.

- O pássaro pode ser controlado pressionando a barra de espaço ou clicando na tela para fazer o pássaro saltar e evitar os obstáculos.
- O jogo possui um sistema de pontuação que conta a quantidade de canos que o jogador consegue atravessar com sucesso.
- O jogo termina quando o pássaro colide com um cano ou com o solo, e a pontuação final do jogador é exibida.

## Tecnologias Utilizadas

- JavaScript: linguagem de programação utilizada para implementação da lógica do jogo.
- HTML: linguagem de marcação utilizada para a estrutura do jogo, incluindo a tag canvas para renderização.
- CSS: linguagem de estilo utilizada para a aparência visual do jogo.

## Variáveis e Funções
### Variáveis
- canvas: Variável que armazena o elemento canvas do HTML, onde o jogo é renderizado.
- ctx: Variável que armazena o contexto de renderização 2D do canvas, utilizado para desenhar elementos no canvas.
- bird: Objeto que representa o pássaro do jogo, com propriedades como posição, velocidade, tamanho e imagem.
- pipes: Array que armazena os canos do jogo, representados por objetos com propriedades como posição, tamanho e estado.
- score: Variável que armazena a pontuação atual do jogador.
- gameOver: Variável booleana que indica se o jogo está no estado de "game over" ou não.

### Funções
- drawBird(): Função que desenha o pássaro no canvas, utilizando as propriedades do objeto bird e o contexto de renderização 2D ctx.
- updateBird(): Função que atualiza a posição e velocidade do pássaro com base nas leituras do teclado (barra de espaço ou clique do mouse) e nas regras de movimentação do jogo.
- drawPipes(): Função que desenha os canos no canvas, utilizando as propriedades dos objetos no array pipes e o contexto de renderização 2D ctx.
- updatePipes(): Função que atualiza a posição dos canos e verifica se o pássaro colidiu com algum deles, atualizando a pontuação do jogador e o estado do jogo (se o jogo está no estado de "game over" ou não).
- drawScore(): Função que desenha a pontuação atual do jogador no canvas, utilizando a variável score e o contexto de renderização 2D ctx.
- resetGame(): Função que reinicia o jogo, resetando as variáveis do pássaro, canos e pontuação.
- gameLoop(): Função que representa o loop principal do jogo, chamando as funções de desenho e atualização dos elementos do jogo em um intervalo de tempo fixo.
- startGame(): Função que inicia o jogo, configurando os eventos do teclado e chamando a função gameLoop() para começar o loop do jogo.

## Informações Adicionais
- O jogo utiliza a tag canvas do HTML para renderização, o que permite a criação de jogos simples em 2D diretamente no navegador.
- A funcionalidade do jogo é implementada em JavaScript, incluindo a lógica do movimento do pássaro, detecção de colisão, atualização da pontuação e gerenciamento do estado do jogo.
- O projeto original pode ser encontrado em: https://github.com/omariosouto/flappy-bird-devsoutinho
- A playlist dos vídeos do DevSoutinho no YouTube pode ser acessada em: https://www.youtube.com/watch?v=jOAU81jdi-c&list=PLTcmLKdIkOWmeNferJ292VYKBXydGeDej&ab_channel=DevSoutinho
