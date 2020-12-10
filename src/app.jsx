import React, { Component } from 'react';
import './App.css';


const rowSize = 3;
const colSize = 3;
let counter = -1;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            playerOneSc: 0,
            playerTwoSc: 0,
            playerOneTu: true,
            playerTwoTu: false,

        }
    }

    componentDidMount() {
        const grid = this.getInitialGrid();
        this.setState({ grid });
    }

    handleOnMouseDown(row, col) {
        console.log(row, col);
    }

    handleOnMouseOver(row, col) {

    }

    handleOnMouseUp(row, col) {

    }

    winCondition() {
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
    }


    getInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < rowSize; row++) {
            const currentRow = [];
            for (let col = 0; col < colSize; col++) {
                currentRow.push(this.createCell(col, row));
            }
            grid.push(currentRow);
        }
        return grid;
    };

    createCell = (col, row) => {
        return {
            col,
            row
        };
    };




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
                                    } = cell; // for passing vars to cell.jsx
                                    return ( // each cell
                                        <div
                                            id={`${row}-${col}`}
                                            cell-index-val={`${counter += 1}`}
                                            className="cell"
                                            onMouseDown={() => this.handleOnMouseDown(row, col)}
                                        >
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