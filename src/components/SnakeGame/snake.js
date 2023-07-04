import React, { useState, useEffect, useRef } from "react";

// utility functions
function shallowEquals(arr1, arr2) {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  let equals = true;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) equals = false;
  }
  return equals;
}

function arrayDiff(arr1, arr2) {
  return arr1.map((a, i) => {
    return a - arr2[i];
  });
}

// display a single cell
function GridCell(props) {
  const classes = `grid-cell
    ${props.foodCell ? "grid-cell--food" : ""}
    ${props.snakeCell ? "grid-cell--snake" : ""}
  `;
  return (
    <div
      className={classes}
      style={{ height: props.size + "px", width: props.size + "px" }}
    />
  );
}

function Snake({ size }) {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState([]);
  const [status, setStatus] = useState(0);
  const [direction, setDirection] = useState(39);
  const moveSnakeIntervalRef = useRef(null);
  const moveFoodTimeoutRef = useRef(null);
  const elRef = useRef(null);

  // randomly place snake food
  const moveFood = () => {
    if (moveFoodTimeoutRef.current) clearTimeout(moveFoodTimeoutRef.current);
    const x = parseInt(Math.random() * numCells);
    const y = parseInt(Math.random() * numCells);
    setFood([x, y]);
    moveFoodTimeoutRef.current = setTimeout(moveFood, 5000);
  };

  const handleKeyDown = ({ keyCode }) => {
    // if it's the same direction or simply reversing, ignore
    let changeDirection = true;
    [
      [38, 40],
      [37, 39],
    ].forEach((dir) => {
      if (dir.indexOf(direction) > -1 && dir.indexOf(keyCode) > -1) {
        changeDirection = false;
      }
    });

    if (changeDirection) setDirection(keyCode);
  };

  const moveSnake = () => {
    const newSnake = [];
    // set in the new "head" of the snake
    switch (direction) {
      // down
      case 40:
        newSnake[0] = [snake[0][0], snake[0][1] + 1];
        break;
      // up
      case 38:
        newSnake[0] = [snake[0][0], snake[0][1] - 1];
        break;
      // right
      case 39:
        newSnake[0] = [snake[0][0] + 1, snake[0][1]];
        break;
      // left
      case 37:
        newSnake[0] = [snake[0][0] - 1, snake[0][1]];
        break;
    }
    // now shift each "body" segment to the previous segment's position
    [].push.apply(
      newSnake,
      snake.slice(1).map((s, i) => {
        // since we're starting from the second item in the list,
        // just use the index, which will refer to the previous item
        // in the original list
        return snake[i];
      })
    );

    setSnake(newSnake);

    checkIfAteFood(newSnake);
    if (!isValid(newSnake[0]) || !doesntOverlap(newSnake)) {
      // end the game
      endGame();
    }
  };

  const checkIfAteFood = (newSnake) => {
    if (!shallowEquals(newSnake[0], food)) return;
    // snake gets longer
    let newSnakeSegment;
    const lastSegment = newSnake[newSnake.length - 1];

    // where should we position the new snake segment?
    // here are some potential positions, we can choose the best looking one
    let lastPositionOptions = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ];

    // the snake is moving along the y-axis, so try that instead
    if (newSnake.length > 1) {
      lastPositionOptions[0] = arrayDiff(
        lastSegment,
        newSnake[newSnake.length - 2]
      );
    }

    for (let i = 0; i < lastPositionOptions.length; i++) {
      newSnakeSegment = [
        lastSegment[0] + lastPositionOptions[i][0],
        lastSegment[1] + lastPositionOptions[i][1],
      ];
      if (isValid(newSnakeSegment)) {
        break;
      }
    }

    setSnake((prevSnake) => prevSnake.concat([newSnakeSegment]));
    setFood([]);
    moveFood();
  };

  // is the cell's position inside the grid?
  const isValid = (cell) => {
    return (
      cell[0] > -1 && cell[1] > -1 && cell[0] < numCells && cell[1] < numCells
    );
  };

  const doesntOverlap = (snake) => {
    return (
      snake.slice(1).filter((c) => {
        return shallowEquals(snake[0], c);
      }).length === 0
    );
  };

  const startGame = () => {
    removeTimers();
    moveSnakeIntervalRef.current = setInterval(moveSnake, 130);
    moveFood();

    setStatus(1);
    setSnake([[5, 5]]);
    setFood([10, 10]);
    //need to focus so keydown listener will work!
    elRef.current.focus();
  };

  const endGame = () => {
    removeTimers();
    setStatus(2);
  };

  const removeTimers = () => {
    if (moveSnakeIntervalRef.current)
      clearInterval(moveSnakeIntervalRef.current);
    if (moveFoodTimeoutRef.current) clearTimeout(moveFoodTimeoutRef.current);
  };

  useEffect(() => {
    return () => {
      removeTimers();
    };
  }, []);

  // each cell should be approximately 15px wide, so calculate how many we need
  const numCells = Math.floor(size / 15);
  const cellSize = size / numCells;
  const cellIndexes = Array.from(Array(numCells).keys());

  const cells = cellIndexes.map((y) => {
    return cellIndexes.map((x) => {
      const foodCell = food[0] === x && food[1] === y;
      let snakeCell = snake.filter((c) => c[0] === x && c[1] === y);
      snakeCell = snakeCell.length && snakeCell[0];

      return (
        <GridCell
          foodCell={foodCell}
          snakeCell={snakeCell}
          size={cellSize}
          key={x + " " + y}
        />
      );
    });
  });

  let overlay;
  switch (status) {
    case 0:
      overlay = (
        <div className="overlay">
          <div className="overlay__text">
            <h1>Snake Game</h1>
            <p>Press any key to start</p>
          </div>
        </div>
      );
      break;
    case 2:
      overlay = (
        <div className="overlay">
          <div className="overlay__text">
            <h1>Game Over!</h1>
            <p>Press any key to play again</p>
          </div>
        </div>
      );
      break;
  }

  return (
    <div className="snake" tabIndex="0" onKeyDown={handleKeyDown} ref={elRef}>
      {cells}
      {overlay}
    </div>
  );
}

export default Snake;
