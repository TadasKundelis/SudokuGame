export default class Validator {
  constructor(table, currentBoard, numberOfEmptyCells) {
    this.table = table; // reference to the DOM table/view 
    this.currentBoard = currentBoard; 
    this.numberOfEmptyCells = numberOfEmptyCells; // number of empty cells left on the board
  } 

  updateBoard(row, col, previousValue, nextValue){
    this.currentBoard.cells[row][col].value = nextValue;
    if (nextValue != '') { // if user enters a number
      if (previousValue === '') { // and previous value was '' (empty field)
        --this.numberOfEmptyCells // decrement number of empty cells
      }
      this.removeConflicts(row, col) // check if any errors can be removed
      let conflictCells = this.checkForConflicts(row, col, nextValue) // check for new conflicts/errors
      if (conflictCells.length) {
        this.table.highlightError(conflictCells) //highlight the errors
      }
      if (this.numberOfEmptyCells === 0) { // if there are no more empty fields left
        if (this.finalChecker()) { // if final checker return true
          setTimeout(this.table.displaySuccess, 1) //set timeout so the last number is displayed before the success alert
          return
        }
      }
    } else {
      if (previousValue != '') { //if user presses backspace and previous value was a number (not empty field)
        ++this.numberOfEmptyCells; // increase the number of empty cells
      }
      this.removeConflicts(row, col) //check if any errors can be removed
    }
  }

  checkForConflicts(x, y, value) {
    //collect row, column and box for the provided coordinates and check if the value of the current cell is repeated
    let [row, col, box] = [this.currentBoard.getRow(x, true), this.currentBoard.getColumn(y, true), this.currentBoard.getBox(x, y, true)]
    return [...row, ...col, ...box].filter(current => current.value == value && (current.x != x || current.y != y))
  }

  removeConflicts(x, y){
    let [row, col, box] = [this.currentBoard.getRow(x, true), this.currentBoard.getColumn(y, true), this.currentBoard.getBox(x, y, true)]
    
    row.concat(col).concat(box).forEach(current => {
      let conflictCells = this.checkForConflicts(current.x, current.y, current.value);
      if (!conflictCells.length) {
        this.table.removeError(current)
      }
    })
  }
  
  finalChecker(){
    //final checker checks all cells for conflicts before displaying the success message
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let conflictCells = this.checkForConflicts(i, j, this.currentBoard.cells[i][j].value)
        if (conflictCells.length) {
          return  false;
        }
      }
    }
    return true
  }

}