const table = document.getElementById('table');
const divFields = table.querySelectorAll('div')

/*
DOMtable class provides a reference to the DOM table to avoid using document.getElementById all the time
Each input field has a unique ID and the necessary event listeners attached to it
*/

export default class DOMtable{
	constructor() {
		this.inputFields = []; //array for storing DOM div nodes that are inside table td nodes
		this.currentField; // current div that has focus
		this.previousField; 
		this.validator; //reference/connection to the validator class that checks user's entered values
	}
    
	create(){
    for (let i = 0; i < 9; i++) {
  	  this.inputFields[i] = [];
        for (let j = 0; j < 9; j++) {
          let current = divFields[i * 9 + j];
          current.id = `${i}-${j}` //element id is created using the format "row-col" (ex. 0-0) to make it unique
          current.addEventListener('keydown', this.handleKeyboardEvent.bind(this))
          current.addEventListener('mousedown', this.highlightCurrentField.bind(this))
          this.inputFields[i][j] = current
        }
      }
	  }

  display(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let currentField = this.inputFields[i][j];
        currentField.innerHTML = ''; //first of all we need to reset the values
        currentField.removeAttribute('readonly') 
        if (currentField.classList.length) {
          for (let n = 0; n < currentField.classList.length; n++) { // for loop is needed because IE does not allow forEach on classList
            let cl = currentField.classList.item(n)
            currentField.removeAttribute('class', cl)
          }
        } 
        if(board[i][j] != 0) {
          currentField.innerHTML = board[i][j]
          currentField.setAttribute('readonly','true') // user should not be able to modify the terminal pattern
          currentField.classList.add('setValue');
        }
      }
    }  
  }

  handleKeyboardEvent(event){
    event = event || window.event; 
	  let keyValue = event.key;
	  let id = this.currentField.id;
    let [row, col] = id.split('-'); // id format is "row-col", we can get the coordinates by removing the hyphen 
	  if (/^(Arrow)*(Up|Down|Right|Left)$/.test(keyValue)) {
      event.preventDefault();
	  	this.highlightArrowMovement(keyValue, row, col) 
	  } else if (keyValue === 'Backspace' || keyValue === 'Delete') {
	  	event.preventDefault(); // this is needed to prevent IE and mozzila from returning to a previous page when user hits backspace
        if (!this.currentField.hasAttribute('readonly')) {
	  	  this.validator.updateBoard(row, col, this.currentField.innerHTML, '')
	  	  this.currentField.innerHTML = '';
	  	} else { // if the field is readonly 
        return
	  	}
	  } else if (/[1-9]/.test(keyValue)) { //numbers between [1-9]
	  	if (!this.currentField.hasAttribute('readonly')) { //update the value if the field is not readonly
	  	  let previousValue = this.currentField.innerHTML;
      	this.currentField.innerHTML = keyValue;
      	this.validator.updateBoard(row, col, previousValue, keyValue)
      	} else {
      	  return
      	}
      } else { // if any other key is pressed, prevent default behaviour
      	return event.preventDefault();
      }
    }

    highlightCurrentField(event, fieldToHighlight){
	  if (this.currentField) { //if there is already a current field
	    this.previousField = this.currentField; //make it previous field
		  this.previousField.classList.remove('current') 
		  //event.target is provided by mousedown event, if it's absent, we use second parameter provided by highlightArrowMovement function
		  this.currentField = event ? event.target : fieldToHighlight; 
	  } else { //if there's no current field, make event target current field
		  this.currentField = event.target;
    }
	  this.currentField.classList.add('current')
	}

	highlightArrowMovement(keyValue, row, col){
      let fieldToHighlight;
      keyValue = keyValue.replace('Arrow', '');
	    switch(keyValue) {
          case 'Left':
            if (col > 0) {
              --col
              break;
            } else {
              return
            }
          case 'Up':
            if (row > 0) {
              --row
              break;
            } else {
              return
            }
          case 'Right':
            if (col < 8) {
              ++col
              break;
            } else {
              return
            }
          case 'Down':
            if (row < 8) {
              ++row
              break;
            } else {
              return
            }
    	}
        fieldToHighlight = this.inputFields[row][col]
        this.highlightCurrentField(null, fieldToHighlight)
    }

    highlightError(errorList) {
      //errorList array contains Cell objects, so we can get their row and columnn values by getting x and y properties
      errorList.forEach((errorField) => {
      	let [row, col] = [errorField.x, errorField.y] 
      	if (!this.inputFields[row][col].classList.contains('error')) {
      	  this.inputFields[row][col].classList.add('error')	
      	}
      })
      this.currentField.classList.add('error')
    }

    removeError(field) {
      let [row, col] = [field.x, field.y];
      // change in the current field triggered the removal of error, so there is no error in the current field as well
      this.currentField.classList.remove('error') 
      this.inputFields[row][col].classList.remove('error')
    }

    displaySuccess() {
      alert('Congratulations! You have solved the puzzle!')
    }
    
}


