import { Tetramino } from "./tetramino.js";
import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./utils.js";

export class Tetris {
    constructor() {
        this.playField = this.generatePlayField();
        this.tetramino = new Tetramino();
    }

    generatePlayField() {
        return new Array(PLAYFIELD_ROWS).fill()
            .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
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
}