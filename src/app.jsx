import React, { Component } from 'react';
import './App.css';


const rowSize = 3;
const colSize = 3;
let counter = -1;
let gameState = ["", "", "", "", "", "", "", "", ""];



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            playerOneSc: 0,
            playerTwoSc: 0,
            playerOneTu: true,
            playerTwoTu: false,
            gameCond: '',

        }
    }

    componentDidMount() {
        document.body.style = 'background: black;';
        const grid = this.getInitialGrid();
        this.setState({ grid });
    }

    handleOnMouseDown(row, col, index) {
        const { grid, playerOneTu, playerTwoTu } = this.state;

        //console.log(index);


        const cell = grid[row][col];
        let currentCell = document.getElementById(`${cell.row}-${cell.col}`);

        if (cell.clicked) {
            //
        }

        // Player X
        if (playerOneTu && !cell.clicked) {
            cell.clicked = true;
            cell.playerX = true;
            currentCell.innerHTML = "X";
            this.setState({ playerOneTu: false, playerTwoTu: true });
            gameState[index] = cell.playerOne;
            this.winCondition(cell);
            //console.log(gameState[index]);
            //console.log(cell);
        }

        //player O
        if (playerTwoTu && !cell.clicked) {
            cell.clicked = true;
            cell.playerO = true;
            currentCell.innerHTML = "O";
            this.setState({ playerOneTu: true, playerTwoTu: false });
            gameState[index] = cell.playerTwo;
            this.winCondition(cell);
            //console.log(cell);
        }
    }

    

    handleOnMouseOver(row, col) {

    }

    handleOnMouseUp(row, col) {

    }

    winCondition(cell) {
        
        const cellIndexVal = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = cellIndexVal[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            console.log(a);
            console.log(b);
            console.log(c);
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

        if (roundWon) {
            console.log("round Won!!");
            //return;
        }
    }

    getInitialGrid = () => {
        const grid = [];
        let counter = -1;
        for (let row = 0; row < rowSize; row++) {
            const currentRow = [];
            for (let col = 0; col < colSize; col++) {
                ++counter;
                currentRow.push(this.createCell(col, row, counter));
            }
            grid.push(currentRow);
        }
        return grid;
    };

    createCell = (col, row, counter) => {
        return {
            col,
            row,
            indexVal: counter,
            clicked: false,
            playerX: false,
            playerO: false,
            playerOne: 'X',
            playerTwo: 'O',
        };
    };

    getClassName() {
        return 'cell';
    }

    render() {
        const { grid } = this.state;
        return (
            <>
                <div className="container">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx} className="grid">
                                {row.map((cell) => {
                                    const { row,
                                        col,
                                        indexVal,
                                    } = cell;
                                    return (
                                        <div
                                            id={`${row}-${col}`}
                                            cell-index-val={`${counter += 1}`}
                                            className={this.getClassName()}
                                            onMouseDown={() => this.handleOnMouseDown(row, col, indexVal)}
                                        >{this.state.gameCond}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

export default App;