 export default class Cell {
  constructor(value, x, y){
    this.value = value;
    this.x = x; // row index
    this.y = y; // column index
    this.candidates = [1,2,3,4,5,6,7,8,9]; // array holding current candidates, based on the situation on the board
    this.initCandidates = []; //default possible candidates that are set up when Board object instance is created
    this.previousCell; //in the case where we need to backtrack, we need to check the previous Cell, this creates a sort of linked listed of nodes
  }

  filterCandidates (row, col, box) {
    const mergedArray = [...row, ...col, ...box];
    this.candidates = this.candidates.filter(value => mergedArray.indexOf(value) === -1)
  }

  resetCandidates (){
    this.candidates = this.initCandidates;
  }
}