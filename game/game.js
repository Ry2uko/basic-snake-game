import { GRID_SIZE } from "./constants.js";

const leftVel = { x: -1, y: 0 },
rightVel = { x: 1, y: 0},
upVel = { x: 0, y: -1 },
downVel = { x: 0, y: 1 };

function gameInit() {
  const state = gameStateInit();
  randomFood(state);
  return state;
}

function gameStateInit() {
  return {
    player: {
      pos: {
        x: 3,
        y: 10
      },
      vel: {
        x: 1,
        y: 0
      },
      snake: [
        { x: 1, y: 10 },
        { x: 2, y: 10 },
        { x: 3, y: 10}
      ]
    },
    food: {},
    score: 0,
    gridSize: GRID_SIZE,
    active: true
  }
}

function randomFood(state) {
  const food = {
    x: Math.floor(Math.random() * GRID_SIZE+1),
    y: Math.floor(Math.random() * GRID_SIZE+1)
  };

  for (let cell of state.player.snake) {
    if (cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  if (Object.keys(state.food).length > 0) {
    if (state.food.x === food.x && state.food.y === food.y) {
      return randomFood(state);
    }
  }

  state.food = food;
}

function gameInterval(state) {
  const player = state.player;

  player.pos.x += player.vel.x;
  player.pos.y += player.vel.y;
  
  if (player.pos.x < 0 || player.pos.x > GRID_SIZE 
    || player.pos.y < 0 || player.pos.y > GRID_SIZE) {
      state.active = false;
      return;
  }

  if (state.food.x === player.pos.x && state.food.y === player.pos.y) {
    player.snake.push({ ...player.pos });
    player.pos.x += player.vel.x;
    player.pos.y += player.vel.y;
    state.score += 1;
    randomFood(state);
  }

  for (let cell of player.snake) {
    if (cell.x === player.pos.x && cell.y === player.pos.y) {
      state.active = false;
      return;
    }
  }

  player.snake.push({ ...player.pos });
  player.snake.shift();  
  
}

function updateVelocity(keyCode, state) {
  const currVel = state.player.vel;
  switch (keyCode) {
    case 'ArrowLeft': // left
      if (currVel.x !== rightVel.x && currVel.y !== rightVel.y) state.player.vel = leftVel;
      break;
    case 'ArrowDown': // down
      if (currVel.x !== upVel.x && currVel.y !== upVel.y) state.player.vel = downVel;
      break;
    case 'ArrowRight': // right
      if (currVel.x !== leftVel.x && currVel.y !== leftVel.y) state.player.vel = rightVel;
      break;
    case 'ArrowUp': //up
      if (currVel.x !== downVel.x && currVel.y !== downVel.y) state.player.vel = upVel;
  }
}

export { gameInit, gameInterval, updateVelocity };