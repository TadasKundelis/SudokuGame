import Board from './boardClass';
import Solver from './solverClass';
import Validator from './validatorClass';
import DOMtable from './DOMtableClass.js';

const table = new DOMtable();
table.create();

//Sudoku class provides solved puzzle, terminal pattern and creates connection between DOM table and validator class

export default class Sudoku {
  constructor() {
    this.numberOfEmptyCellsAtStart
    this.solvedBoard;  
    this.currentBoard;
    this.terminalPattern; 
  }

  generateNew() {
    let startingBoard =  [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0]];
  
    let array = [1,2,3,4,5,6,7,8,9];
    
    //for loop shuffles the array
    for (let i = 0; i < 9; i++) {
      let rnd = Math.floor(Math.random() * 9)
      let temp = array[i];
      array[i] = array[rnd];
      array[rnd] = temp;
    }
    startingBoard[0] = array.slice(); //make the first array of the matrix random
    this.solvedBoard = this.solve(startingBoard); //solve the puzzle and create a complete grid
    this.digHoles() // let's dig some holes to create the terminal pattern
    this.currentBoard = new Board(); //make current board a Board instance so we can use Board object methods
    this.currentBoard.setInitialState(this.terminalPattern)
    this.numberOfEmptyCellsAtStart = this.currentBoard.numberOfEmptyCells
    table.validator = new Validator(table, this.currentBoard, this.currentBoard.numberOfEmptyCells) // create a connection between DOM table (view) and Validator class
    table.display(this.terminalPattern) // pass the terminal pattern to the view
  }
  
  digHoles() {
    this.terminalPattern = this.solvedBoard.slice().map(x => x.slice()) 
    let positions = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        positions.push([i, j])
      }
    }
	
    let randomIndex = Math.floor(Math.random() * 81)
    //let's make hole digging more random my reversing a part of the indices array
    positions = positions.slice(0, randomIndex).reverse().concat(positions.slice(randomIndex)) 
	
    positions.forEach( ([i, j]) => {
      let temp = this.terminalPattern[i][j];
      this.terminalPattern[i][j] = 0; // make the current value a 0 and check if the puzzle still has only one possible solution
      if (this.solve(this.terminalPattern, [i, j, temp])) { //if it can be solved with another character
        this.terminalPattern[i][j] = temp; // don't make it a zero, leave the current value
      }
    })
  }

  solve(puzzle, contraint = []){
    if (!puzzle) { // if there is no puzzle provided, that means user hit 'solve' button
      table.display(this.solvedBoard) // just display the solution
      return
    } 
    const board = new Board(); 
    board.setInitialState(puzzle, contraint);
    const solver = new Solver(board);
    return solver.run() 
  }

  reset() {
    let check = confirm('Are you sure you want to reset the puzzle?')
    if (check) {
      table.display(this.terminalPattern)
      this.numberOfEmptyCells = this.numberOfEmptyCellsAtStart
      this.currentBoard = new Board(); 
      this.currentBoard.setInitialState(this.terminalPattern)
      table.validator = new Validator(table, this.currentBoard, this.numberOfEmptyCells)
    }
  }
}
