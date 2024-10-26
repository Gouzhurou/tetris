import { Tetramino } from "./tetramino.js";
import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, isElementValid } from "./utils.js";

export class Tetris {
    constructor() {
        this.playField = this.generatePlayField();
        this.tetramino = new Tetramino();
    }

    generatePlayField() {
        return new Array(PLAYFIELD_ROWS).fill()
            .map(() => new Array(PLAYFIELD_COLUMNS).fill(null));
    }

    moveTetraminoDown() {
        const isBottom = !this.tetramino.moveTetraminoDown();
        const isIntersect = this._isIntersect();

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
    }

    moveTetraminoRight() {
        this.tetramino.moveTetraminoRight();
    }

    rotateTetramino() {
        this.tetramino.rotateTetramino();
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
    }

    _isIntersect() {
        const size = this.tetramino.matrix.length;
        const startRow = this.tetramino.row;
        const startColumn = this.tetramino.column;

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (
                    isElementValid(this.tetramino, row, col) &&
                    this.playField[startRow + row][startColumn + col] != null
                ) {
                    return true;
                }
            }
        }

        return false;
    }
}