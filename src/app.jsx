import React, { Component } from 'react';
import './app.css';


const rowSize = 3;
const colSize = 3;
let gameState = ["", "", "", "", "", "", "", "", ""]; // list of current game condition



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
            this.winCondition(playerOneTu);
        }

        //player O
        if (playerTwoTu && !cell.clicked) {
            cell.clicked = true;
            cell.playerO = true;
            currentCell.innerHTML = "O";

            this.setState({ playerOneTu: true, playerTwoTu: false });

            gameState[index] = cell.playerTwo;
            this.winCondition(!playerTwoTu);
        }
    }



    handleOnMouseOver(row, col) {

    }

    handleOnMouseUp(row, col) {

    }

    winCondition(currentPlayer) {
        // currentPlayer if True, it is player One
        // currentPlayer if False, it is player Two

        let roundWon = false;

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

        for (let i = 0; i < 8; i++) {
            const winCondition = cellIndexVal[i];
            let winX = gameState[winCondition[0]];
            let winY = gameState[winCondition[1]];
            let winZ = gameState[winCondition[2]];

            //console.log(cell);

            if (winX === '' || winY === '' || winZ === '') {
                continue;
            }

            if (winX === winY && winY === winZ) {
                roundWon = true;
                if (currentPlayer) {
                    this.setState({ playerOneSc: + 1 })
                }
                if (!currentPlayer) {
                    this.setState({ playerTwoSc: + 1 })
                }
                break
            }

        }


        if (roundWon) {
            console.log("Round Won!!!");
        }
    }

    getInitialGrid = () => {
        const grid = [];
        let cellIndexVal = -1;
        for (let row = 0; row < rowSize; row++) {
            const currentRow = [];
            for (let col = 0; col < colSize; col++) {
                ++cellIndexVal;
                currentRow.push(this.createCell(col, row, cellIndexVal));
            }
            grid.push(currentRow);
        }
        return grid;
    };

    createCell = (col, row, cellIndexVal) => {
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

    getClassName() {
        return 'cell';
    }

    render() {
        const { grid } = this.state;
        return (
            <>
                <div className="home-page">
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
                                                cell-index-val={`${indexVal}`}
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
                    <div className="side-bar">
                        <p>X: {this.state.playerOneSc}</p>
                        <p>O: {this.state.playerTwoSc}</p>
                        <p>{this.state.playerOneTu} Turn</p>
                    </div>
                </div>
            </>
        );
    }
}

export default App;