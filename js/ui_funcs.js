import { convertPositionToIndex, isElementValid, PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, getNickname, TETRAMINO_FIELD_SIZE } from "./utils.js";
import { Tetris } from "./tetris.js";

const GHOST_CLASS = "ghost";
const START_SPEED = 500;
const SPEED_DIFF = 100;
const MAX_SPEED = 50;
const MAX_LEVEL = 6;
const RECORD_TABLE_NAME = "recordTable";

let requestId;
let timeoutId;
const tetris = new Tetris();
let inRecordTable = false;
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
    if (tetris.isGameOver && !inRecordTable) {
        inRecordTable = true;
        gameOver();
        return;
    }

    if (tetris.isGameOver) {
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
    if (tetris.isGameOver && !inRecordTable) {
        inRecordTable = true;
        gameOver();
        return;
    }

    if (tetris.isGameOver) {
        return;
    }

    startLoop();
}

function gameOver() {
    document.removeEventListener("keydown", onKeyDown);
    writeScoreToTable();
    window.location.href = '../html/recordTable.html';
}

function writeScoreToTable() {
    const nickname = getNickname();
    const score = tetris.score;
    const user = {
        nickname: nickname,
        score: score,
    };

    let recordTable = localStorage.getItem(RECORD_TABLE_NAME);
    if (!recordTable) {
        recordTable = new Array();
        recordTable.push(user);
    } else {
        recordTable = JSON.parse(recordTable);
        let isPushed = false; 
        for (let i = 0; i < recordTable.length; i++) {
            if (recordTable[i].score <= score) {
                recordTable.splice(i, 0, user);
                isPushed = true;
                break;
            }
        }

        if (!isPushed) {
            recordTable.push(user);
        }
    }

    localStorage.setItem(RECORD_TABLE_NAME, JSON.stringify(recordTable));
}

function startLoop() {
    const timeout = tetris.level < MAX_LEVEL ? START_SPEED - SPEED_DIFF * (tetris.level - 1) : MAX_SPEED;
    timeoutId = setTimeout(() => requestId = requestAnimationFrame(moveDown), timeout);
}

function stopLoop() {
    cancelAnimationFrame(requestId);
    clearTimeout(timeoutId);
}

function setLevel() {
    const playerLevel = document.querySelector(".level");
    playerLevel.textContent = "Уровень: " + tetris.level;
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
