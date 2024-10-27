import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, rotateMatrix, copyMatrix } from "./utils.js";

const TETRAMINO_POSITION_COUNT = 4;

export class Tetramino {
    constructor() {
        // Константы
        this.TETRAMINOES = this._createTetraminoes();
        this.TETRAMINO_NAMES = this._createTetraminoNames();

        // Поля
        this.name;
        this.matrix;
        this.row;
        this.column;

        this.generateTetramino();
    }

    copy() {
        const tetramino = new Tetramino();
        tetramino.name = this.name;
        tetramino.row = this.row;
        tetramino.column = this.column;
        tetramino.matrix = copyMatrix(this.matrix);
        
        return tetramino;
    }

    generateTetramino() {
        const index = Math.floor(Math.random() * this.TETRAMINO_NAMES.length);

        this.name = this.TETRAMINO_NAMES[index];
        this.matrix = this.TETRAMINOES.get(this.name);

        const rotateCount = Math.floor(Math.random() * TETRAMINO_POSITION_COUNT);
        for (let i = 0; i <= rotateCount; i++) {
            this.rotateTetramino();
        }

        this.column = PLAYFIELD_COLUMNS / 2 - Math.floor(this.matrix.length / 2);
        this.row = -this.matrix.length;
    }

    moveTetraminoLeft() {
        const isValid = this.column + this._leftOffset() > 0;
        if (isValid) {
            this._moveTetraminoLeft();
        }

        return isValid;
    }

    moveTetraminoRight() {
        const isValid = this.column < PLAYFIELD_COLUMNS - this._rightOffset();
        if (isValid) {
            this._moveTetraminoRight();
        }

        return isValid;
    }

    moveTetraminoDown() {
        const isValid = this.row < PLAYFIELD_ROWS - this._downOffset();
        if (isValid) {
            this.row++;
        }
        
        return isValid;
    }

    rotateTetramino() {
        this.matrix = rotateMatrix(this.matrix);
        
        while (this.column + this._leftOffset() < 0) {
            this._moveTetraminoRight();
        }

        while (this.column > PLAYFIELD_COLUMNS - this._rightOffset()) {
            this._moveTetraminoLeft();
        }

        while (this.row > PLAYFIELD_ROWS - this._downOffset()) {
            this._moveTetraminoUp();
        }
    }

    _moveTetraminoUp() {
        this.row--;
    }

    _moveTetraminoLeft() {
        this.column--;
    }

    _moveTetraminoRight() {
        this.column++;
    }

    _downOffset() {
        const size = this.matrix.length;
        let minOffset = size;

        for (let j = 0; j < size; j++) {
            let index = size - 1;
            while (index > 0 && this.matrix[index][j] == 0) {
                index--;
            }
            minOffset = size - index - 1 < minOffset ? size - index - 1 : minOffset;
        }

        return size - minOffset;
    }

    _leftOffset() {
        let minOffset = this.matrix.length;
    
        for (let array of this.matrix) {
            let index = 0;
            while (index < minOffset && array[index] == 0) {
                index++;
            }
            minOffset = index < minOffset ? index : minOffset;
        }
    
        return minOffset;
    }
    
    _rightOffset() {
        const size = this.matrix.length;
        let minOffset = size;
        
        for (let array of this.matrix) {
            let index = size - 1;
            while (index > 0 && array[index] == 0) {
                index--;
            }
            minOffset = size - index - 1 < minOffset ? size - index - 1 : minOffset;
        }
    
        return size - minOffset;
    }

    _createTetraminoes() {
        return new Map([
            ['I', [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ]],
            ['J', [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ]],
            ['L', [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ]],
            ['O', [
                [1, 1],
                [1, 1],
            ]],
            ['S', [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ]],
            ['Z', [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ]],
            ['Z', [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ]],
            ['T', [
                [1, 1, 1],
                [0, 1, 0],
                [0, 0, 0],
            ]]
        ]);        
    }
    
    _createTetraminoNames() {
        const names = new Array();
        for (let name of this.TETRAMINOES.keys()) {
            names.push(name);
        }
        return names;
    }
}
