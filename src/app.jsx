import React, { Component } from 'react';
import getInitialGrid from "./utils"
import Board from "./components/board/board"
import './app.css';


const rowSize = 3;
const colSize = 3;
let gameState = ["", "", "", "", "", "", "", "", ""]; // list of current game condition
let roundWon = false;


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
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    handleOnMouseDown(row, col, index) {
        const { grid, playerOneTu, playerTwoTu } = this.state;
        let test = false;


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
            test = true;
        }

        let randNumRow = Math.floor(Math.random() * 3);
        let randNumCol = Math.floor(Math.random() * 3);
        let randNumIndex = Math.floor(Math.random() * 9);
        //player O
        
        //randNumRow !== row || randNumCol !== col || randNumIndex !== index

        const randCell = grid[randNumRow][randNumCol];
        let randCurrentCell = document.getElementById(`${randNumRow}-${randNumCol}`);
        console.log(randCell);

        if (!randCell.clicked && test) {
            console.log(randCell.clicked);

            randCell.clicked = true;
            randCell.playerO = true;
            randCurrentCell.innerHTML = "O";

            this.setState({ playerOneTu: true, playerTwoTu: false });

            gameState[randNumIndex] = randCell.playerTwo;
            this.winCondition(!playerTwoTu);
            if (roundWon) {
                this.reset(false);
            }
        }
    }

    /*
    // 1v1 gameplay
    //player O
        if (playerTwoTu && !cell.clicked) {
            cell.clicked = true;
            cell.playerO = true;
            currentCell.innerHTML = "O";

            this.setState({ playerOneTu: true, playerTwoTu: false });

            gameState[index] = cell.playerTwo;
            this.winCondition(!playerTwoTu);
        }
    */

    handleOnMouseOver(row, col) {
        //
    }

    handleOnMouseUp(row, col) {
        //
    }

    getCell(grid) {
        let nodes = [];
        for (let row of grid) {
            for (let node of row) {
                nodes.push(node);
            }
        }
        return nodes;
    }

    reset(rootReset) {
        const { grid } = this.state;

        let everyCell = this.getCell(grid);

        for (let i = 0; i < everyCell.length; ++i) {
            let cell = everyCell[i];

            let currentCell = document.getElementById(`${cell.row}-${cell.col}`);


            currentCell.innerHTML = '';
            cell.clicked = false;
            cell.playerX = false;
            cell.playerO = false;
            roundWon = false;
            gameState = ["", "", "", "", "", "", "", "", ""];
            this.setState({ playerOneTu: true, playerTwoTu: false });

            if (rootReset) {
                this.setState({ playerOneSc: 0, playerTwoSc: 0 });
            }

        }



    }

    winCondition(currentPlayer) {
        // currentPlayer if True, it is player One
        // currentPlayer if False, it is player Two



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


            if (winX === '' || winY === '' || winZ === '') {
                continue;
            }

            if (winX === winY && winY === winZ) {
                roundWon = true;
                if (currentPlayer) {
                    this.state.playerOneSc += 1;
                }
                if (!currentPlayer) {
                    this.state.playerTwoSc += 1;
                }
                break
            }

        }


        if (roundWon) {
            console.log("Round Won!!!");

            this.reset(false);
        }
    }

    

    getClassName() {
        return 'cell';
    }

    render() {
        const { grid } = this.state;
        return (
            <>
            <Board></Board>
                <div className="nav-bar">
                    <ul id="nav">
                        <div className="nbar">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a>Visualize</a></li>
                            <li><a onClick={() => this.reset(true)}>Reset</a></li>
                        </div>
                    </ul>
                </div>
                <div className="home-page">
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