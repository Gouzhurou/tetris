import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./tetris.js"

export function convertPositionToIndex(row, col) {
    return row * PLAYFIELD_COLUMNS + col;
}

export function isElementValid(tetramino, rowOffset, colOffset) {
    return tetramino.matrix[rowOffset][colOffset] == 1 && 
        tetramino.row + rowOffset >= 0 && 
        tetramino.column + colOffset >= 0 &&
        tetramino.column + colOffset < PLAYFIELD_COLUMNS;
}

export function leftOffset(matrix) {
    let minOffset = matrix.length;

    for (let array of matrix) {
        let index = 0;
        while (index < minOffset && array[index] == 0) {
            index++;
        }
        minOffset = index < minOffset ? index : minOffset;
    }

    return minOffset;
}

export function rightOffset(matrix) {
    const size = matrix.length;
    let minOffset = size;
    
    for (let array of matrix) {
        let index = size - 1;
        while (index > 0 && array[index] == 0) {
            index--;
        }
        minOffset = size - index - 1 < minOffset ? size - index - 1 : minOffset;
    }

    return size - minOffset;
}

export function rotateMatrix(matrix) {
    const size = matrix.length;
    const newMatrix = new Array(size).fill()
        .map(() => new Array(size).fill(0));

    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {
            newMatrix[j][size - i - 1] = matrix[i][j];
        }
    }

    return newMatrix;
}