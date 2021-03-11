// --------------------------------- Variáveis -----------------------------
const sprites = new Image()
sprites.src = './sprites.png'

let frame = 0

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

const globais = {}

let telaAtiva = {}

// -------------------------------SONS----------------------------------
const somHit = new Audio()
somHit.src = './efeitos/efeitos_hit.wav'
const somPonto = new Audio()
somPonto.src = './efeitos/efeitos_ponto.wav'
const somPulo = new Audio()
somPulo.src = './efeitos/efeitos_pulo.wav'

// --------------------------------- Funções -----------------------------

function fazColisao(){
 const flappyBirdY = globais.flappyBird.y + globais.flappyBird.altura
 const chaoY = globais.chao.y

 if(flappyBirdY >= chaoY){
    return true
 }
 return false
}

function criaFlappyBird(){
    const flappyBird = { // Objeto que tem as caracteristicas do flappy bird a serem desenhadas:
        spriteX: 0, // Sx e Sy (search X e Y) do elemento que vamos pegar de dentro da img
        spriteY: 0, 
        largura: 33, // SWidth e SHeight, tamanho do recorte na sprite
        altura: 24,
        x: 10, // Dx e Dy (Draw x e y) - coordenadas a serem usadas no canvas
        y: 50,
        pulo: 4,
        pula(){
            flappyBird.velocidade = - flappyBird.pulo
            somPulo.play()
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza(){
            if(fazColisao(flappyBird, globais.chao)){
                somHit.play()
                setTimeout(() => {
                    mudarTela(telas.gameOver)
                }, 400)
    
                return
            }
    
            flappyBird.velocidade += flappyBird.gravidade
            flappyBird.y += flappyBird.velocidade
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, }, // asa pra cima
            { spriteX: 0, spriteY: 26, }, // asa no meio 
            { spriteX: 0, spriteY: 52, }, // asa pra baixo
            { spriteX: 0, spriteY: 26, }, // asa no meio 
        ],
        frameAtual: 0,
        atualizaFrameAtual() {
            const intervaloFrames = 10
            const passouIntervalo = frame % intervaloFrames === 0

            if (passouIntervalo){
                const baseIncremento = 1
                const incremento = baseIncremento + flappyBird.frameAtual
                const baseRepeticao = flappyBird.movimentos.length
                flappyBird.frameAtual = incremento % baseRepeticao
            }
        },
        desenhar(){ // f(x) que desenha ele mesmo
            flappyBird.atualizaFrameAtual()
            const { spriteX, spriteY } = this.movimentos[flappyBird.frameAtual]
            contexto.drawImage(
                sprites, // Local onde está a imagem de referencia
                spriteX, spriteY, 
                flappyBird.largura, flappyBird.altura, 
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura
            )
        }
    }
    return flappyBird
}

function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 610, 
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza(){
            const movimentoChao = 1
            const repeteEm = chao.largura / 2
            const movimentacao = chao.x - movimentoChao

            chao.x = movimentacao % repeteEm

        },
        desenhar(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY, 
                chao.largura, chao.altura, 
                chao.x, chao.y,
                chao.largura, chao.altura
            )
            
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY, 
                chao.largura, chao.altura, 
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura
            )
        }
    }
    return chao
}

function criaCanos(){
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenhar() {
            canos.pares.forEach(function(par) {
              const yRandom = par.y;
              const espacamentoEntreCanos = 100;
        
              const canoCeuX = par.x;
              const canoCeuY = yRandom; 
      
              // [Cano do Céu]
              contexto.drawImage(
                sprites, 
                canos.ceu.spriteX, canos.ceu.spriteY,
                canos.largura, canos.altura,
                canoCeuX, canoCeuY,
                canos.largura, canos.altura,
              )
              
              // [Cano do Chão]
              const canoChaoX = par.x;
              const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
              contexto.drawImage(
                sprites, 
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura,
              )
      
              par.canoCeu = {
                x: canoCeuX,
                y: canos.altura + canoCeuY
              }
              par.canoChao = {
                x: canoChaoX,
                y: canoChaoY
              }
            })
          },
        colisao(par){
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
            
            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                if(cabecaDoFlappy <= par.canoCeu.y) {
                  return true;
                }
        
                if(peDoFlappy >= par.canoChao.y) {
                  return true;
                }
            }
            return false;
        },
        pares: [],
        atualiza(){
            const passouFrames = frame % 100 === 0
            if(passouFrames){
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1)
                })
            }

            canos.pares.forEach(function(par){
                par.x = par.x - 2

                if(canos.colisao(par)){
                    somHit.play()
                    mudarTela(telas.gameOver)
                }

                // remove canos que já passaram para não enxer a memoria do user
                if(par.x + canos.largura <= 0) {
                    canos.pares.shift()
                }
            })
        }
    }
    return canos
}

function criaPlacar(){
    const placar = {
        pontuacao: 1,
        desenhar() {
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);      
        },
        atualiza(){
            const intervaloFrames = 50
            const passouIntervalo = frame % intervaloFrames === 0

            if (passouIntervalo){
                if(placar.pontuacao % 50 === 0){
                    somPonto.play()
                }
                placar.pontuacao++
                console.log(placar.pontuacao)
            }
        }
    }
    return placar
}

// --------------------------------- Objetos estaticos -----------------------------

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0, 
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenhar(){
        // desenha um quadrado com fundo '#70c5ce' que pegue toda a extenção do canvas 
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, 
            planoDeFundo.largura, planoDeFundo.altura, 
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        )
        
        // faz com que o chão cubra toda a largura do canvas
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, 
            planoDeFundo.largura, planoDeFundo.altura, 
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        )
    }
}

const menssagemGetReady = 
{
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenhar(){ // f(x) que desenha ele mesmo
        contexto.drawImage(
            sprites, // Local onde está a imagem de referencia
            menssagemGetReady.sX, menssagemGetReady.sY, 
            menssagemGetReady.w, menssagemGetReady.h, 
            menssagemGetReady.x, menssagemGetReady.y,
            menssagemGetReady.w, menssagemGetReady.h
        )
    }
}

const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
      contexto.drawImage(
        sprites,
        mensagemGameOver.sX, mensagemGameOver.sY,
        mensagemGameOver.w, mensagemGameOver.h,
        mensagemGameOver.x, mensagemGameOver.y,
        mensagemGameOver.w, mensagemGameOver.h
      );
    }
  }

// --------------------------------- Telas -----------------------------

function mudarTela(novaTela){
    telaAtiva = novaTela

    if(telaAtiva.inicializa){
        telaAtiva.inicializa()
    }
}

const telas = {
    inicio: {
        inicializa(){
            globais.flappyBird = criaFlappyBird()
            globais.chao = criaChao()
            globais.canos = criaCanos()
        },
        desenha(){
            planoDeFundo.desenhar()
            globais.chao.desenhar()
            globais.flappyBird.desenhar()
            globais.canos.desenhar()
            menssagemGetReady.desenhar()
        },
        atualiza(){
            globais.chao.atualiza()
        },
        click(){
            mudarTela(telas.jogo)
        }
    },
    jogo: {
        inicializa(){
            globais.placar = criaPlacar()
        },
        desenha(){
            planoDeFundo.desenhar()
            globais.canos.desenhar()
            globais.chao.desenhar()
            globais.flappyBird.desenhar()
            globais.placar.desenhar()
        },
        click(){
            globais.flappyBird.pula()
        },
        atualiza(){
            globais.flappyBird.atualiza()
            globais.chao.atualiza()
            globais.canos.atualiza()
            globais.placar.atualiza()
        }
    },
    gameOver: {
        inicializa(){

        },
        desenha(){
            mensagemGameOver.desenha()
        },
        click(){
            mudarTela(telas.inicio)
        },
        atualiza(){

        }
    }
}

// --------------------------------Canvas------------------------------------------
function loop(){
    telaAtiva.desenha()
    telaAtiva.atualiza()

    requestAnimationFrame(loop) // Função para criar um loop que forma os FPS na tela

    frame += 1
}

window.addEventListener('click', function(){
    if(telaAtiva.click) {
        telaAtiva.click()
    }
})

mudarTela(telas.inicio)
loop()