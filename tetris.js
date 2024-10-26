import { TETRAMINOES, TETRAMINO_NAMES } from "./tetramino.js";
import { leftOffset, rightOffset, rotateMatrix } from "./utils.js";

export const PLAYFIELD_ROWS = 20;
export const PLAYFIELD_COLUMNS = 10;

export class Tetris {
    constructor() {
        this.playField = this.generatePlayField();
        this.tetramino = this.generateTetramino();
    }

    generatePlayField() {
        return new Array(PLAYFIELD_ROWS).fill()
            .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
    }

    generateTetramino() {
        const index = Math.floor(Math.random() * TETRAMINO_NAMES.length);
        const name = TETRAMINO_NAMES[index];
        const matrix = TETRAMINOES.get(name);

        const column = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
        // const row = -2;
        const row = 3;
        return {name, matrix, row, column};
    }

    moveTetraminoLeftWithCheck() {
        if (this.tetramino.column + leftOffset(this.tetramino.matrix) > 0) {
            this.moveTetraminoLeft();
        }
    }

    moveTetraminoLeft() {
        this.tetramino.column--;
    }

    moveTetraminoRightWithCheck() {
        if (this.tetramino.column < PLAYFIELD_COLUMNS - rightOffset(this.tetramino.matrix)) {
            this.moveTetraminoRight();
        }
    }

    moveTetraminoRight() {
        this.tetramino.column++;
    }

    rotateTetramino() {
        this.tetramino.matrix = rotateMatrix(this.tetramino.matrix);
        
        while (this.tetramino.column + leftOffset(this.tetramino.matrix) < 0) {
            this.moveTetraminoRight();
        }

        while (this.tetramino.column > PLAYFIELD_COLUMNS - rightOffset(this.tetramino.matrix)) {
            this.moveTetraminoLeft();
        }
    }
}