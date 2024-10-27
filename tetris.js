import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, isElementValid, defaultMatrix, isElementOutside } from "./utils.js";
import { Tetramino } from "./tetramino.js"

export class Tetris {
    constructor() {
        this.playField = defaultMatrix(PLAYFIELD_ROWS, PLAYFIELD_COLUMNS, null);
        this.tetramino = new Tetramino();
        this.ghostTetramino;
        this._createGhostTetramino();
        this.isGameOver = false;
    }

    generateTetramino() {
        this.tetramino.generateTetramino();
        this._createGhostTetramino();
    }

    dropTetramino() {
        this.tetramino.row = this.ghostTetramino.row;
        this.tetramino.column = this.ghostTetramino.column;
        this.moveTetraminoDown();
    }

    moveTetraminoDown() {
        const isBottom = !this.tetramino.moveTetraminoDown();
        const isIntersect = this._isIntersect(this.tetramino);

        if (isIntersect) {
            this.tetramino._moveTetraminoUp();
        }

        if (isBottom || isIntersect) {
            this._placeTetramino();
            this.generateTetramino();
        }
    }

    moveTetraminoLeft() {
        this.tetramino.moveTetraminoLeft();
        if (this._isIntersect(this.tetramino)) {
            this.tetramino.moveTetraminoRight();
        }

        this._createGhostTetramino();
    }

    moveTetraminoRight() {
        this.tetramino.moveTetraminoRight();
        if (this._isIntersect(this.tetramino)) {
            this.tetramino.moveTetraminoLeft();
        }

        this._createGhostTetramino();
    }

    rotateTetramino() {
        const tmp = this.tetramino.copy();
        tmp.rotateTetramino();
        if (!this._isIntersect(tmp)) {
            this.tetramino.rotateTetramino();
        }

        this._createGhostTetramino();
    }

    _createGhostTetramino() {
        const tmp = this.tetramino.copy();

        let isBottom = !tmp.moveTetraminoDown();
        while (!this._isIntersect(tmp) && !isBottom) {
            isBottom = !tmp.moveTetraminoDown();
        }
        
        if (!isBottom) {
            tmp._moveTetraminoUp();
        }
        this.ghostTetramino = tmp;
    }

    _placeTetramino() {
        const name = this.tetramino.name;
        const matrixSize = this.tetramino.matrix.length;
        for (let row = 0; row < matrixSize; row++) {
            for (let col = 0; col < matrixSize; col++) {
                if (isElementValid(this.tetramino, row, col)) {
                    this.playField[this.tetramino.row + row][this.tetramino.column + col] = name;
                } else if (isElementOutside(this.tetramino, row, col)) {
                    this.isGameOver = true;
                    return;
                }
            }
        }

        this._clearFilledRows();
    }

    _clearFilledRows() {
        let filledRowsCount = 0;

        for (let i = PLAYFIELD_ROWS - 1; i >= 0; --i) {
            if (this._isRowFilled(i)) {
                filledRowsCount++;
                this._clearFilledRow(i);
                continue;
            }
            if (filledRowsCount > 0) {
                this._dropRowBy(i, filledRowsCount);
            }
        }
    }

    _isRowFilled(index) {
        return this.playField[index].every(cell => cell != null);
    }

    _clearFilledRow(index) {
        this.playField[index].fill(null);
    }

    _dropRowBy(index, rowCount) {
        const newIndex = index + rowCount;
        for (let j = 0; j < PLAYFIELD_COLUMNS; ++j) {
            this.playField[newIndex][j] = this.playField[index][j];
        }
        this._clearFilledRow(index);
    }

    _isIntersect(tetramino) {
        const size = tetramino.matrix.length;
        const startRow = tetramino.row;
        const startColumn = tetramino.column;

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (
                    isElementValid(tetramino, row, col) &&
                    this.playField[startRow + row][startColumn + col] != null
                ) {
                    return true;
                }
            }
        }

        return false;
    }
}