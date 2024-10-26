import { Tetris } from "./tetris.js";
import { convertPositionToIndex, isElementValid } from "./utils.js";

const tetris = new Tetris();
const cells = document.querySelectorAll('.cell');

initKeyDown();

draw();

function initKeyDown() {
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

function draw() {
    cells.forEach(cell => {
        cell.removeAttribute('class');
        cell.classList.add("cell");
    });
    drawTetramino();
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