import { gameInit, gameInterval, updateVelocity } from "../game/game.js";
import { FRAME_RATE } from "../game/constants.js";

const BG_COLOR = '#14151F';
const SNAKE_COLOR = '#F4EEEC';
const FOOD_COLOR = '#FF3239';

let gameState = gameInit();

// Start Game
const intervalId = setInterval(() => {
  const active = gameState.active;
  if (active) {
    gameInterval(gameState);
    paintGame();
    $('#score').text(gameState.score);
  } else {
    if (confirm('You lost. Play again?')) {
      gameState = gameInit();
    } else {
      clearInterval(intervalId);
    }
  }
}, 1000 / FRAME_RATE)

$(document).keydown(e => updateVelocity(e.key, gameState));

const canvas = $('#canvas')[0];
const context = canvas.getContext('2d');

canvas.width = canvas.height = 777;
const size = canvas.width / (gameState.gridSize+1);

function paintGame() {
  context.fillStyle = BG_COLOR;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = SNAKE_COLOR;

  for (let cell of gameState.player.snake) {
    context.fillRect(cell.x * size, cell.y * size, size, size);
  }

  context.fillStyle = FOOD_COLOR;
  context.fillRect(gameState.food.x * size, gameState.food.y * size, size, size);
}
