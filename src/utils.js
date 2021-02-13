export default function getInitialGrid(){
    const grid = [];
    let cellIndexVal = -1;
    for (let i = 0; i < 3; ++i) {
        const currentRow = [];
        for (let j = 0; j < 3; ++j) {
            ++cellIndexVal;
            currentRow.push(createCell(j, i, cellIndexVal));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createCell = (col, row, cellIndexVal) => {
    return {
        col,
        row,
        indexVal: cellIndexVal,
        clicked: false,
        playerX: false,
        playerO: false,
        playerOne: 'X',
        playerTwo: 'O',
    };
};