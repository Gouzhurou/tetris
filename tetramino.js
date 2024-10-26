export const TETRAMINOES = createTetraminos();
export const TETRAMINO_NAMES = createTetraminoNames(TETRAMINOES);

function createTetraminos() {
    let map = new Map();
    map.set(
        'I',
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
    );
    map.set(
        'J', 
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ]
    );
    map.set(
        'L',
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0],
        ]
    );
    map.set(
        'O', 
        [
            [1, 1],
            [1, 1],
        ]
    );
    map.set(
        'S', 
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
        ]
    );
    map.set(
        'Z',
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0],
        ]
    );
    map.set(
        'T', 
        [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0],
        ]
    );
    
    return map;
}

function createTetraminoNames(tetraminoes) {
    let names = new Array();
    for (let name of tetraminoes.keys()) {
        names.push(name);
    }
    return names;
}
