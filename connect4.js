/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = [];

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  
  // array of rows, each row is array of cells  (board[y][x])
  
  //Nested loop to initialize board matrix array.
  for (let i = 0; i < HEIGHT; i++) {
    let boardRow = [];
    for (let j = 0; j < WIDTH; j++) {
      boardRow.push(null);
    }
    board.push(boardRow);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board');

  // TODO: add comment for this code

  // Add top row to table.
  let top = document.createElement("tr");
  top.setAttribute("id", "row-top");

  // Add event listener for player moves to top row for each column.
  top.addEventListener("click", handleClick);

  // Add a cell for each columm to the top row
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  // Add top row to the HTML board.
  htmlBoard.append(top);

  // TODO: add comment for this code

  //Create row for the game board.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    // Create cells for each column of the row.
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }

    // Add each row to the board.
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */


function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--){
    let sq = document.getElementById(`${y}-${x}`);
    if (sq.children.length === 0) return y;
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let circlePlaced = document.createElement('div');

  //after div is created add piece class and player class
  currPlayer === 1 ? circlePlaced.classList.add("p1") : circlePlaced.classList.add("p2");
  circlePlaced.classList.add("piece");

  //add piece to square
  let squarePlaced = document.getElementById(`${y}-${x}`);
  squarePlaced.append(circlePlaced);

  board[y][x] = currPlayer;

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  
  return alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  
  // check for win
  if (checkForWin()) {
    endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if (checkForTie()) {
    endGame('Tie game!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2

  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
  console.log(currPlayer);
}

//check for tie function

function checkForTie() {

//check if each cell contains the class piece
  let checkFull = board.every(row => {
    return row.every(cell => {
      return cell !== null;
    });
  });
  return checkFull;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //check to see if there's four in a row anywhere on the board

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

