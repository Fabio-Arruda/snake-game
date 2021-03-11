let game;
let canvas = document.getElementById('snake-canvas');
let context = canvas.getContext('2d');
let box = 32;
let direction = 'right';

let snake = new Array({
    x: 8 * box, 
    y: 8 * box
});

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG(){

    context.fillStyle = 'lightgrey';
    context.fillRect(0 , 0, 16 * box, 16 * box);
}

function createSnake(){

    for(let i = 0; i < snake.length; i++){
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

function verifyColision(){

    for (i = 1; i < snake.length; i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            clearInterval(game);
            gameOver();
        }
    }
}

function gameOver(){

    let newGame = confirm(`Game Over!\nSua snake tinha ${snake.length} quadradinhos de tamanho.\nJogar novamente?`);

    if (newGame){

        snake = new Array({
            x: 8 * box, 
            y: 8 * box
        });
        
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }

        game = setInterval(gameLoop, 100);
    }
}

function moveSnake(){

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch (direction){
        case 'up':
            snakeY -= box;
            break;
        case 'down':
            snakeY += box;
            break;
        case 'left':
            snakeX -= box;
            break;
        default:
            snakeX += box;
    }

    // Verifica se na nova posição a cobrinha pegou a comida
    if (snakeX !== food.x || snakeY !== food.y){
        // Não pegou a comida.
        snake.pop();
    } else {
        // Pegou a comida
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    
    snake.unshift({
        x: snakeX, 
        y: snakeY
    });

    // Esse bloco de código é responsável por "teleportar" a cobrinha
    // para o lado oposto caso ela ultrapasse os limites da tela do jogo
    if(snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction === 'left') snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction === 'up') snake[0].y = 15 * box;
}

function updateDirection(event){

    if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
}

function gameLoop(){

    verifyColision();
    createBG();
    createSnake();
    drawFood();
    moveSnake();
}

document.addEventListener('keydown', updateDirection);
game = setInterval(gameLoop, 100); 
