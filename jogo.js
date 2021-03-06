console.log('Flappy Bird');

const som_Hit = new Audio();
som_Hit.src = './efeitos/efeitos_hit.wav';


const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


    function fazColisao(flappyBird, chao){
        const flappyBirdY = flappyBird.y + flappyBird.altura;
        const chaoY = chao.y;

        if(flappyBirdY >= chaoY){
            return true;
        } else {
            return false;
        }

    }

    function criaFlappyBird(){
        const flappyBird = {
            spriteX : 0,
            spriteY : 0,
            largura : 34,
            altura : 24,
            x : 34,
            y : 24,
            gravidade : 6,
            velocidade : 0,
            pulo : 10,
            pula(){
                console.log("to pulando!!!");
                console.log('[antes]', flappyBird.velocidade);
                flappyBird.velocidade = -flappyBird.pulo;
                console.log('[depois]', flappyBird.velocidade);
            },
            atualiza(){
                if(fazColisao(flappyBird, chao)){
                    console.log("dei de boca no chão ;-;")
                    som_Hit.play();
                    
                    setTimeout(() => {
                        mudaParaTela(Telas.INICIO)

                    }, 500); 
                    
                   
                    return;
    
                }
    
                flappyBird.velocidade += flappyBird.gravidade;
                flappyBird.y += flappyBird.velocidade;
    
            },
    
    
            desenha() {
                contexto.drawImage(
                    sprites,
                        flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
                        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
                        flappyBird.x, flappyBird.y,
                        flappyBird.largura, flappyBird.altura // Tamanho da imagem
                        );
                        
                    }
                
                
            }
            return flappyBird;
    }
          
        const chao = {
            spriteX : 0,
            spriteY : 610,
            largura : 224,
            altura : 722,
            x : 0,
            y : canvas.height - 112,
            desenha(){
                contexto.drawImage(
                    sprites,
                    chao.spriteX, chao.spriteY,
                    chao.largura, chao.altura,
                    chao.x, chao.y,
                    chao.largura, chao.altura
                );
        
                contexto.drawImage(
                    sprites,
                    chao.spriteX, chao.spriteY,
                    chao.largura, chao.altura,
                    (chao.x + chao.largura), chao.y,
                    chao.largura, chao.altura
                );
            }
        }
        
        
        const planoDeFundo = {
            spriteX : 390,
            spriteY : 0,
            largura : 275,
            altura : 204,
            x : 0,
            y : canvas.height - 112 - 204,
            desenha(){
                contexto.fillStyle = "#70c5ce";
                contexto.fillRect(0,0, canvas.width, canvas.height)

                contexto.drawImage(
                    sprites,
                    planoDeFundo.spriteX, planoDeFundo.spriteY,
                    planoDeFundo.largura, planoDeFundo.altura,
                    planoDeFundo.x, planoDeFundo.y,
                    planoDeFundo.largura, planoDeFundo.altura     
                );

                contexto.drawImage(
                    sprites,
                    planoDeFundo.spriteX, planoDeFundo.spriteY,
                    planoDeFundo.largura, planoDeFundo.altura,
                    (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
                    planoDeFundo.largura, planoDeFundo.altura     
                );
            }
        }

        const mensagemGetReady = {
            spriteX : 134,
            spriteY : 0,
            largura : 174,
            altura : 152,
            x : (canvas.width / 2) - 174 / 2,
            y : 50,
            desenha() {
                contexto.drawImage(
                    sprites,
                    mensagemGetReady.spriteX, mensagemGetReady.spriteY,
                    mensagemGetReady.largura, mensagemGetReady.altura,
                    mensagemGetReady.x , mensagemGetReady.y,
                    mensagemGetReady.largura, mensagemGetReady.altura
                );
        
            }
        }

        const globais = {};
        let telaAtiva = {};
        function mudaParaTela(novaTela){
            telaAtiva = novaTela;

            if(telaAtiva.inicializa){
                telaAtiva.inicializa();
            }

        }
        
        const Telas = {
            INICIO: {
                inicializa(){
                    globais.flappyBird = criaFlappyBird();
                },
                desenha(){
                planoDeFundo.desenha();
                chao.desenha();
                globais.flappyBird.desenha();

                mensagemGetReady.desenha();

                },

                click(){
                    mudaParaTela(Telas.JOGO);
                },

                atualiza(){

                }
            }

        }

        Telas.JOGO = {
            desenha(){
                planoDeFundo.desenha();
                chao.desenha();
                globais.flappyBird.desenha();

            },
            click(){
                globais.flappyBird.pula();
            },
            atualiza(){
                globais.flappyBird.atualiza();

            }
        }




        function loop(){
            telaAtiva.desenha();
            telaAtiva.atualiza();
            
                   
            requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
})



mudaParaTela(Telas.INICIO);
loop();
