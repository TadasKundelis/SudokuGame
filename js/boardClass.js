import Cell from './cellClass';

export default class Board {
  constructor(){
    this.cells = []; //array for holding Cell objects
    this.emptyPositions = []; // array for storing coordinates of empty cells
    this.numberOfEmptyCells = 0; 
  }
  
  //returnAsObject parameter checks if we want to return primitive values or Cell object instances

  getRow(row, returnAsObject = false) {
    if (returnAsObject) {
      return this.cells[row].map(obj => obj);
    } else {
      return this.cells[row].map(obj => obj.value);
    }
  }

  getColumn(col, returnAsObject = false) {
    let arr = [];
    this.cells.forEach(row => arr.push(row[col]))
    if (returnAsObject) {
      return arr
    } else {
      return arr.map(obj => obj.value)
    }
  }

  getBox(row, col, returnAsObject = false) {
    let arr = [];
    let a = Math.floor(row/3);
    let b = Math.floor(col/3);
    this.cells.slice(a * 3, a * 3 + 3).forEach(x => arr = arr.concat(x.slice(b * 3, b * 3 + 3)))
    if (returnAsObject) {
      return arr
    } else {
      return arr.map(obj => obj.value)
    }
  }
  
  /* 
  constraint parameter is important for hole digging, because we cannot use the number from the terminal pattern (we have only 8 choices)
  constraint array includes row index, column index and the value
  */
  setInitialState(puzzle, constraint = []){
    //assign every cell a Cell object
    for (let i = 0; i < 9; i++) {
    this.cells[i] = [];
      for (let j = 0; j < 9; j++) {
        this.cells[i][j] = new Cell(puzzle[i][j], i, j)
      }
    }

    //set initial candidates for every Cell object, get number of empty cells and their coordinates
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (puzzle[i][j] === 0) {
          this.emptyPositions.push([i, j])
          this.numberOfEmptyCells++
          let [row, col, box] = [this.getRow(i), this.getColumn(j), this.getBox(i, j)]
          this.cells[i][j].filterCandidates(row, col, box)
          if (constraint.length) {
            let [row, col, value] = constraint;
            if (i === row && j === col) {
              this.cells[i][j].candidates = this.cells[i][j].candidates.filter(current => current != value)
            }
          }
        this.cells[i][j].initCandidates = this.cells[i][j].candidates.slice() 
        }
      }
    }
  }

}
