const gameContainer = document.querySelector(".game-container");
const egg = document.querySelector(".egg");

let snake = [{ x: 0, y: 0 }];
let eggX = 0;
let eggY = 0;
let direction = "right";
let score = 0;

function updateEggPosition() {
  eggX =
    Math.floor(Math.random() * ((gameContainer.clientWidth - 10) / 20)) *
    20;

  eggY =
    Math.floor(Math.random() * ((gameContainer.clientHeight - 10) / 20)) *
    20;

  egg.style.top = eggY + "px";
  egg.style.left = eggX + "px";
}

function moveSnake() {
  let newHead = { x: snake[0].x, y: snake[0].y };

  if (direction == "right") {
    newHead.x += 20;
  } else if (direction == "left") {
    newHead.x -= 20;
  } else if (direction == "up") {
    newHead.y -= 20;
  } else if (direction == "down") {
    newHead.y += 20;
  }

  //check if the snake eats the egg
  if (newHead.x == eggX && newHead.y == eggY) {
    updateEggPosition();
    snake.push({});
    let snakeSegment = document.createElement("div");
    snakeSegment.className = "snake";
    gameContainer.insertAdjacentElement("beforeend", snakeSegment);
    score++;
    document.getElementById("value").innerHTML = score;
  }

  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }

  //set the newHead to old positions
  snake[0] = { ...newHead };

  //check if the snake hits the border
  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= gameContainer.clientWidth - 10 ||
    newHead.y >= gameContainer.clientHeight - 10
  ) {
    endGame();
    return;
  }

  //check if the snake bites itself
  for (let i = 1; i < snake.length; i++) {
    if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
      endGame();
      return;
    }
  }

  //Update the positions of the snake
  let snakeSegments = document.querySelectorAll(".snake");
  snakeSegments.forEach((segment, index) => {
    segment.style.left = snake[index].x + "px";
    segment.style.top = snake[index].y + "px";
  });
}

//Update Snake Directions
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight" && direction != "left") {
    direction = "right";
  } else if (event.key == "ArrowLeft" && direction != "right") {
    direction = "left";
  } else if (event.key == "ArrowUp" && direction != "down") {
    direction = "up";
  } else if (event.key == "ArrowDown" && direction != "up") {
    direction = "down";
  }
});
updateEggPosition();

const gameInterval = setInterval(moveSnake, 100);

function endGame() {
  clearInterval(gameInterval);
}