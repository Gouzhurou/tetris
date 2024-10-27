import { convertPositionToIndex, isElementValid, PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, getNickname, TETRAMINO_FIELD_SIZE } from "./utils.js";
import { Tetris } from "./tetris.js";

const GHOST_CLASS = "ghost";
const START_SPEED = 500;
const SPEED_DIFF = 100;
const MAX_SPEED = 50;
const MAX_LEVEL = 6;

let requestId;
let timeoutId;
const tetris = new Tetris();
const cells = document.querySelectorAll('.cell');
const tetraminoCells = document.querySelectorAll('.tetramino-cell');

const playerNickname = document.querySelector(".player-nickname");
playerNickname.textContent += getNickname();

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
    const nickname = getNickname();
    alert("congratulations, " + nickname + "! you lose!");
}

function startLoop() {
    const timeout = tetris.level < MAX_LEVEL ? START_SPEED - SPEED_DIFF * (tetris.level - 1) : MAX_SPEED;
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

    tetraminoCells.forEach(cell => {
        cell.removeAttribute('class');
        cell.classList.add("tetramino-cell");
    });

    setLevel();
    drawPlayfield();
    drawNextTetramino();
    drawTetramino(tetris.tetramino, tetris.tetramino.name);
    drawTetramino(tetris.ghostTetramino, GHOST_CLASS);
}

function drawNextTetramino() {
    const tetramino = tetris.nextTetramino;
    const matrixSize = tetramino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            if (tetramino.matrix[row][col] == 1) {
                tetraminoCells[row * TETRAMINO_FIELD_SIZE + col].classList.add(tetramino.name);
            }
        }
    }
}

function setLevel() {
    const playerLevel = document.querySelector(".level");
    playerLevel.textContent = "Уровень: " + tetris.level;
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
