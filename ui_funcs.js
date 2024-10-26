import { convertPositionToIndex, isElementValid, PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./utils.js";
import { Tetris } from "./tetris.js";

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
            moveDown();
            break;
    }
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

function moveDown() {
    tetris.moveTetraminoDown();
    draw();
}

export function draw() {
    cells.forEach(cell => {
        cell.removeAttribute('class');
        cell.classList.add("cell");
    });
    drawPlayfield();
    drawTetramino();
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

function drawTetramino() {
    const tetramino = tetris.tetramino;
    const name = tetramino.name;
    const matrixSize = tetramino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            if (isElementValid(tetramino, row, col)) {
                const cellIndex = convertPositionToIndex(tetramino.row + row, tetramino.column + col);
                cells[cellIndex].classList.add(name);
            }
        }
    }
}
