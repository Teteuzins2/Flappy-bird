console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


function loop() {
    contexto.drawImage(
        sprites,
        0, 0,
        34, 24,
        10, 10,
        34, 24 // Tamanho da imagem
    );

    requestAnimationFrame(loop);
}
