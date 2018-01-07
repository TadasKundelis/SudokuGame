require('../css/sudoku.scss');
import Sudoku from './sudokuClass';

var sudoku = new Sudoku();
sudoku.generateNew();

document.getElementById('generateNew').addEventListener('click', () => sudoku.generateNew())
document.getElementById('solve').addEventListener('click', () => sudoku.solve())
document.getElementById('reset').addEventListener('click', () => sudoku.reset())








