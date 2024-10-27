export const PLAYFIELD_ROWS = 20;
export const PLAYFIELD_COLUMNS = 10;
export const TETRAMINO_FIELD_SIZE = 4;

export function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
}

export function isElementValid(tetramino, rowOffset, colOffset) {
    return tetramino.matrix[rowOffset][colOffset] == 1 && tetramino.row + rowOffset >= 0;
}

export function isElementOutside(tetramino, rowOffset, colOffset) {
    return tetramino.matrix[rowOffset][colOffset] == 1 && tetramino.row + rowOffset < 0;
}

export function rotateMatrix(matrix) {
    const size = matrix.length;
    const newMatrix = defaultMatrix(size, size, 0);

    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {
            newMatrix[j][size - i - 1] = matrix[i][j];
        }
    }

    return newMatrix;
}

export function copyMatrix(matrix) {
    const size = matrix.length;
    const newMatrix = defaultMatrix(size, size, 0);

    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {
            newMatrix[i][j] = matrix[i][j];
        }
    }

    return newMatrix;
}

export function defaultMatrix(rowCount, columnCount, defaultValue) {
    return new Array(rowCount).fill().map(() => new Array(columnCount).fill(defaultValue));
}

export function getNickname() {
    return localStorage["nickname"];
} 
