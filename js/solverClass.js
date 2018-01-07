export default class Solver {
  constructor(board){
    this.board = board.cells; // matrix storing values
    this.boardMethods = board; // reference to Board object
    this.numberOfEmptyCells = board.numberOfEmptyCells;
    this.emptyPositions = board.emptyPositions; 
    this.currentCell;
    this.previousCell; 
    this.noSolution = false;
  }

  run() {
    while(this.numberOfEmptyCells) { 
      if (!this.currentCell) {
        this.selectStartingCell()
      }
      this.setCurrentCellValue()
      this.selectNextCell()
      if (this.noSolution) {
        return false
      }
    }
    let solution = [];
    for (let i = 0; i < 9; i++) {
      solution[i] = [];
      for (let j = 0; j < 9; j++) {
        solution[i][j] = this.board[i][j].value
      }
    }
    return solution
  }

  selectStartingCell() {
    let [x, y] = this.emptyPositions[0];
    this.currentCell = this.board[x][y];
    for (let i = 1; i < this.emptyPositions.length; i++) {
      [x, y] = this.emptyPositions[i];
      if (this.board[x][y].candidates.length < this.currentCell.candidates.length) { // find the cell with least candidates for optimization
        this.currentCell = this.board[x][y]
      }
    }
  }

  setCurrentCellValue() {
    if (!this.currentCell.candidates[0]) {
      return this.backtrack()
    }
    this.currentCell.value = this.currentCell.candidates[0] //always take first candidate
    this.numberOfEmptyCells-- // decrement number of empty cells
  }

  selectNextCell() {
    let length = 9;
    this.previousCell = this.currentCell; 
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.board[i][j].value === 0) { 
          this.board[i][j].resetCandidates(); //need to reset to default candidates for every check
          let [row, col, box] = [this.boardMethods.getRow(i), this.boardMethods.getColumn(j), this.boardMethods.getBox(i, j)]
          this.board[i][j].filterCandidates(row, col, box)
          if (this.board[i][j].candidates.length === 0) { //if there is at least one cell without candidates
            this.numberOfEmptyCells++ //increment number of empty cells
            this.board[i][j].resetCandidates(); // reset its candidates
            this.currentCell = this.previousCell; //backtrack
            return this.backtrack() 
          } else {
            if (this.board[i][j].candidates.length < length) {// find the cell with least candidates
              this.currentCell = this.board[i][j] // make it current cell
              this.currentCell.previousCell = this.previousCell; // 
              length = this.currentCell.candidates.length
            }
          }
        } 
      }
    }
  }

  updateCandidates() { 
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.board[i][j].value === 0){
          this.board[i][j].resetCandidates();
          let [row, col, box] = [this.boardMethods.getRow(i), this.boardMethods.getColumn(j), this.boardMethods.getBox(i, j)]
          this.board[i][j].filterCandidates(row, col, box)
        }
      }
    }
  }

  backtrack() {
    this.currentCell.value = 0; // reset value
    this.currentCell.candidates = this.currentCell.candidates.slice(1) // cannot take the first value
    let [x, y] = [this.currentCell.x, this.currentCell.y]
    let [row, col, box] = [this.boardMethods.getRow(x), this.boardMethods.getColumn(y), this.boardMethods.getBox(x, y)]
    this.currentCell.filterCandidates(row, col, box) 
    while (!this.currentCell.candidates.length) { //keep backtracking while the current cell has no candidates
      this.numberOfEmptyCells++
      this.currentCell.value = 0;
      this.currentCell.resetCandidates();
      this.updateCandidates();
      if (!this.currentCell.previousCell) {
        this.noSolution = true
        return
      }
      this.currentCell = this.currentCell.previousCell
      this.currentCell.candidates = this.currentCell.candidates.slice(1)
      let [x, y] = [this.currentCell.x, this.currentCell.y]
      let [row, col, box] = [this.boardMethods.getRow(x), this.boardMethods.getColumn(y), this.boardMethods.getBox(x, y)]
      this.currentCell.filterCandidates(row, col, box)
    } 
    this.setCurrentCellValue();
    this.selectNextCell();
  }

}
