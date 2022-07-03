console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


function loop () {
    contexto.drawImage(
        sprites,
        0, 0,   // Sprite X , Sprite Y
        34, 24, // Tamanho do recorte na sprite
        10, 10, // Posicionamento na tela
        34, 24 // Tamanho da imagem
    );

    requestAnimationFrame(loop);
}