import { convertPositionToIndex, isElementValid, PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./utils.js";
import { Tetris, SCORE_PER_LEVEL } from "./tetris.js";

const GHOST_CLASS = "ghost";
const START_SPEED = 500;
const SPEED_DIFF = 100;
const MAX_SPEED = 50;
const MAX_LEVEL = 6;

let requestId;
let timeoutId;
const tetris = new Tetris();
const cells = document.querySelectorAll('.cell');

export function initKeyDown() {
    document.addEventListener('keydown', onKeyDown);
}

function onKeyDown(event) {
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
            rotate();
            break;
        case 'ArrowDown':
            dropDown();
            break;
    }
}

function dropDown() {
    tetris.dropTetramino();
    draw();
    stopLoop();
    if (tetris.isGameOver) {
        gameOver();
        return;
    }
    startLoop();
}

function rotate() {
    tetris.rotateTetramino();
    draw();
}

function moveLeft() {
    tetris.moveTetraminoLeft();
    draw();
}

function moveRight() {
    tetris.moveTetraminoRight();
    draw();
}

export function moveDown() {
    tetris.moveTetraminoDown();
    draw();
    if (tetris.isGameOver) {
        gameOver();
        return;
    }
    startLoop();
}

function gameOver() {
    alert("congratulations! you lose!");
}

function startLoop() {
    const level = Math.floor(tetris.score / SCORE_PER_LEVEL);
    const timeout = level < (MAX_LEVEL - 1) ? START_SPEED - SPEED_DIFF * level : MAX_SPEED;
    timeoutId = setTimeout(() => requestId = requestAnimationFrame(moveDown), timeout);
}

function stopLoop() {
    cancelAnimationFrame(requestId);
    clearTimeout(timeoutId);
}

export function draw() {
    cells.forEach(cell => {
        cell.removeAttribute('class');
        cell.classList.add("cell");
    });
    drawPlayfield();
    drawTetramino(tetris.tetramino, tetris.tetramino.name);
    drawTetramino(tetris.ghostTetramino, GHOST_CLASS);
}

function drawPlayfield() {
    const playfield = tetris.playField;
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let col = 0; col < PLAYFIELD_COLUMNS; col++) {
            if (playfield[row][col] == null) continue;
            const cellIndex = convertPositionToIndex(row, col);
            cells[cellIndex].classList.add(playfield[row][col]);
        }
    }
}

function drawTetramino(tetramino, className) {
    const matrixSize = tetramino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            if (isElementValid(tetramino, row, col)) {
                const cellIndex = convertPositionToIndex(tetramino.row + row, tetramino.column + col);
                cells[cellIndex].classList.add(className);
            }
        }
    }
}
