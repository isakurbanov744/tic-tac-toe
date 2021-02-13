import React, { PureComponent } from "react";

class Board extends PureComponent {
  constructor(state = ["", "", "", "", "", "", "", "", ""]) {
    this.state = state;
  }


  isEmpty() {
    return this.state.every(function(cell) {
        return cell === "";
    });
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
      [2, 4, 6],
    ];

    for (let i = 0; i < 8; i++) {
      const winCondition = cellIndexVal[i];
      let winX = gameState[winCondition[0]];
      let winY = gameState[winCondition[1]];
      let winZ = gameState[winCondition[2]];

      if (winX === "" || winY === "" || winZ === "") {
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
        break;
      }
    }

    if (roundWon) {
      console.log("Round Won!!!");

      this.reset(false);
    }
  }

  render() {
    return (
      <>
        <div className="container">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="grid">
                {row.map((cell) => {
                  const { row, col, indexVal } = cell;
                  return (
                    <div
                      id={`${row}-${col}`}
                      cell-index-val={`${indexVal}`}
                      className={this.getClassName()}
                      onMouseDown={() =>
                        this.handleOnMouseDown(row, col, indexVal)
                      }
                    >
                      {this.state.gameCond}
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

export default Board;
