console.log('Flappy Bird')

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

// Objeto que tem as caracteristicas do flappy bird a serem desenhadas:
const flappyBird = {
    spriteX: 0, // Sx e Sy (search X e Y) do elemento que vamos pegar de dentro da img
    spriteY: 0, 
    largura: 33, // SWidth e SHeight, tamanho do recorte na sprite
    altura: 24,
    x: 10, // Dx e Dy (Draw x e y) - coordenadas a serem usadas no canvas
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        flappyBird.velocidade += flappyBird.gravidade
        flappyBird.y += flappyBird.velocidade
    },
    desenhar(){ // f(x) que desenha ele mesmo
        contexto.drawImage(
            sprites, // Local onde está a imagem de referencia
            flappyBird.spriteX, flappyBird.spriteY, 
            flappyBird.largura, flappyBird.altura, 
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura
        )
    }
}

const chao = {
    spriteX: 0,
    spriteY: 610, 
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
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

const menssagemGetReady = {
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

// Telas contem as funções que cada tela ira usar
let telaAtiva = {}
function mudarTela(novaTela){
    telaAtiva = novaTela
}

const telas = {
    inicio: {
        desenha(){
            planoDeFundo.desenhar()
            chao.desenhar()
            flappyBird.desenhar()
            menssagemGetReady.desenhar()
        },
        atualiza(){

        },
        click(){
            mudarTela(telas.jogo)
        }
    },
    jogo: {
        desenha(){
            planoDeFundo.desenhar()
            chao.desenhar()
            flappyBird.desenhar()
        },
        atualiza(){
            flappyBird.atualiza()
        }
    }
}

// --------------------------------Desenhar------------------------------------------
function loop(){
    telaAtiva.desenha()
    telaAtiva.atualiza()

    requestAnimationFrame(loop) // Função para criar um loop que forma os FPS na tela
}

window.addEventListener('click', function(){
    if(telaAtiva.click) {
        telaAtiva.click()
    }
})

mudarTela(telas.inicio)
loop()