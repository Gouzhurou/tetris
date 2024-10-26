export const PLAYFIELD_ROWS = 20;
export const PLAYFIELD_COLUMNS = 10;

export function convertPositionToIndex(row, col) {
    return row * PLAYFIELD_COLUMNS + col;
}

export function isElementValid(tetramino, rowOffset, colOffset) {
    return tetramino.matrix[rowOffset][colOffset] == 1 && 
        tetramino.row + rowOffset >= 0 && 
        tetramino.column + colOffset >= 0 &&
        tetramino.column + colOffset < PLAYFIELD_COLUMNS;
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
