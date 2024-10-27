import { Tetramino } from "./tetramino.js";
import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, isElementValid, defaultMatrix } from "./utils.js";

export class Tetris {
    constructor() {
        this.playField = defaultMatrix(PLAYFIELD_ROWS, PLAYFIELD_COLUMNS, null);
        this.tetramino = new Tetramino();
    }

    moveTetraminoDown() {
        const isBottom = !this.tetramino.moveTetraminoDown();
        const isIntersect = this._isIntersect(this.tetramino);

        if (isIntersect) {
            this.tetramino._moveTetraminoUp();
        }

        if (isBottom || isIntersect) {
            this._placeTetramino();
            this.tetramino.generateTetramino();
        }
    }

    moveTetraminoLeft() {
        this.tetramino.moveTetraminoLeft();
        if (this._isIntersect(this.tetramino)) {
            this.tetramino.moveTetraminoRight();
        }
    }

    moveTetraminoRight() {
        this.tetramino.moveTetraminoRight();
        if (this._isIntersect(this.tetramino)) {
            this.tetramino.moveTetraminoLeft();
        }
    }

    rotateTetramino() {
        const tmp = this.tetramino.copy();
        tmp.rotateTetramino();
        if (!this._isIntersect(tmp)) {
            this.tetramino.rotateTetramino();
        }
    }

    _placeTetramino() {
        const name = this.tetramino.name;
        const matrixSize = this.tetramino.matrix.length;
        for (let row = 0; row < matrixSize; row++) {
            for (let col = 0; col < matrixSize; col++) {
                if (isElementValid(this.tetramino, row, col)) {
                    this.playField[this.tetramino.row + row][this.tetramino.column + col] = name;
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
        console.table(this.playField[index].every(cell => cell != null));
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