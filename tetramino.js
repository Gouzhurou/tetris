import { PLAYFIELD_COLUMNS, rotateMatrix } from "./utils.js";

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

    generateTetramino() {
        const index = Math.floor(Math.random() * this.TETRAMINO_NAMES.length);

        this.name = this.TETRAMINO_NAMES[index];
        this.matrix = this.TETRAMINOES.get(this.name);
        this.column = PLAYFIELD_COLUMNS / 2 - Math.floor(this.matrix.length / 2);
        // this.row = -2;
        this.row = 3;
    }

    moveTetraminoLeft() {
        if (this.column + this._leftOffset() > 0) {
            this._moveTetraminoLeft();
        }
    }

    moveTetraminoRight() {
        if (this.column < PLAYFIELD_COLUMNS - this._rightOffset()) {
            this._moveTetraminoRight();
        }
    }

    rotateTetramino() {
        this.matrix = rotateMatrix(this.matrix);
        
        while (this.column + this._leftOffset() < 0) {
            this._moveTetraminoRight();
        }

        while (this.column > PLAYFIELD_COLUMNS - this._rightOffset()) {
            this._moveTetraminoLeft();
        }
    }

    _moveTetraminoLeft() {
        this.column--;
    }

    _moveTetraminoRight() {
        this.column++;
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
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
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
