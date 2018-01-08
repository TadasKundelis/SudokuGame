/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sudokuClass = __webpack_require__(1);

var _sudokuClass2 = _interopRequireDefault(_sudokuClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(7);


var sudoku = new _sudokuClass2.default();
sudoku.generateNew();

document.getElementById('generateNew').addEventListener('click', function () {
  return sudoku.generateNew();
});
document.getElementById('solve').addEventListener('click', function () {
  return sudoku.solve();
});
document.getElementById('reset').addEventListener('click', function () {
  return sudoku.reset();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _boardClass = __webpack_require__(2);

var _boardClass2 = _interopRequireDefault(_boardClass);

var _solverClass = __webpack_require__(4);

var _solverClass2 = _interopRequireDefault(_solverClass);

var _validatorClass = __webpack_require__(5);

var _validatorClass2 = _interopRequireDefault(_validatorClass);

var _DOMtableClass = __webpack_require__(6);

var _DOMtableClass2 = _interopRequireDefault(_DOMtableClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var table = new _DOMtableClass2.default();
table.create();

//Sudoku class provides solved puzzle, terminal pattern and creates connection between DOM table and validator class

var Sudoku = function () {
  function Sudoku() {
    _classCallCheck(this, Sudoku);

    this.numberOfEmptyCellsAtStart;
    this.solvedBoard;
    this.currentBoard;
    this.terminalPattern;
  }

  _createClass(Sudoku, [{
    key: 'generateNew',
    value: function generateNew() {
      var startingBoard = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];

      var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      //for loop shuffles the array
      for (var i = 0; i < 9; i++) {
        var rnd = Math.floor(Math.random() * 9);
        var temp = array[i];
        array[i] = array[rnd];
        array[rnd] = temp;
      }
      startingBoard[0] = array.slice(); //make the first array of the matrix random
      this.solvedBoard = this.solve(startingBoard); //solve the puzzle and create a complete grid
      this.digHoles(); // let's dig some holes to create the terminal pattern
      this.currentBoard = new _boardClass2.default(); //make current board a Board instance so we can use Board object methods
      this.currentBoard.setInitialState(this.terminalPattern);
      this.numberOfEmptyCellsAtStart = this.currentBoard.numberOfEmptyCells;
      table.validator = new _validatorClass2.default(table, this.currentBoard, this.currentBoard.numberOfEmptyCells); // create a connection between DOM table (view) and Validator class
      table.display(this.terminalPattern); // pass the terminal pattern to the view
    }
  }, {
    key: 'digHoles',
    value: function digHoles() {
      var _this = this;

      this.terminalPattern = this.solvedBoard.slice().map(function (x) {
        return x.slice();
      });
      var positions = [];
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          positions.push([i, j]);
        }
      }

      var randomIndex = Math.floor(Math.random() * 81);
      //let's make hole digging more random my reversing a part of the indices array
      positions = positions.slice(0, randomIndex).reverse().concat(positions.slice(randomIndex));

      positions.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            i = _ref2[0],
            j = _ref2[1];

        var temp = _this.terminalPattern[i][j];
        _this.terminalPattern[i][j] = 0; // make the current value a 0 and check if the puzzle still has only one possible solution
        if (_this.solve(_this.terminalPattern, [i, j, temp])) {
          //if it can be solved with another character
          _this.terminalPattern[i][j] = temp; // don't make it a zero, leave the current value
        }
      });
    }
  }, {
    key: 'solve',
    value: function solve(puzzle) {
      var contraint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (!puzzle) {
        // if there is no puzzle provided, that means user hit 'solve' button
        table.display(this.solvedBoard); // just display the solution
        return;
      }
      var board = new _boardClass2.default();
      board.setInitialState(puzzle, contraint);
      var solver = new _solverClass2.default(board);
      return solver.run();
    }
  }, {
    key: 'reset',
    value: function reset() {
      var check = confirm('Are you sure you want to reset the puzzle?');
      if (check) {
        table.display(this.terminalPattern);
        this.numberOfEmptyCells = this.numberOfEmptyCellsAtStart;
        this.currentBoard = new _boardClass2.default();
        this.currentBoard.setInitialState(this.terminalPattern);
        table.validator = new _validatorClass2.default(table, this.currentBoard, this.numberOfEmptyCells);
      }
    }
  }]);

  return Sudoku;
}();

exports.default = Sudoku;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cellClass = __webpack_require__(3);

var _cellClass2 = _interopRequireDefault(_cellClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.cells = []; //array for holding Cell objects
    this.emptyPositions = []; // array for storing coordinates of empty cells
    this.numberOfEmptyCells = 0;
  }

  //returnAsObject parameter checks if we want to return primitive values or Cell object instances

  _createClass(Board, [{
    key: 'getRow',
    value: function getRow(row) {
      var returnAsObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (returnAsObject) {
        return this.cells[row].map(function (obj) {
          return obj;
        });
      } else {
        return this.cells[row].map(function (obj) {
          return obj.value;
        });
      }
    }
  }, {
    key: 'getColumn',
    value: function getColumn(col) {
      var returnAsObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var arr = [];
      this.cells.forEach(function (row) {
        return arr.push(row[col]);
      });
      if (returnAsObject) {
        return arr;
      } else {
        return arr.map(function (obj) {
          return obj.value;
        });
      }
    }
  }, {
    key: 'getBox',
    value: function getBox(row, col) {
      var returnAsObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var arr = [];
      var a = Math.floor(row / 3);
      var b = Math.floor(col / 3);
      this.cells.slice(a * 3, a * 3 + 3).forEach(function (x) {
        return arr = arr.concat(x.slice(b * 3, b * 3 + 3));
      });
      if (returnAsObject) {
        return arr;
      } else {
        return arr.map(function (obj) {
          return obj.value;
        });
      }
    }
  }, {
    key: 'setInitialState',
    value: function setInitialState(puzzle) {
      var _this = this;

      var constraint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      //assign every cell a Cell object
      for (var i = 0; i < 9; i++) {
        this.cells[i] = [];
        for (var j = 0; j < 9; j++) {
          this.cells[i][j] = new _cellClass2.default(puzzle[i][j], i, j);
        }
      }

      //set initial candidates for every Cell object, get number of empty cells and their coordinates
      for (var _i = 0; _i < 9; _i++) {
        for (var _j = 0; _j < 9; _j++) {
          if (puzzle[_i][_j] === 0) {
            this.emptyPositions.push([_i, _j]);
            this.numberOfEmptyCells++;
            var _ref = [this.getRow(_i), this.getColumn(_j), this.getBox(_i, _j)],
                row = _ref[0],
                col = _ref[1],
                box = _ref[2];

            this.cells[_i][_j].filterCandidates(row, col, box);
            if (constraint.length) {
              (function () {
                var _constraint = _slicedToArray(constraint, 3),
                    row = _constraint[0],
                    col = _constraint[1],
                    value = _constraint[2];

                if (_i === row && _j === col) {
                  _this.cells[_i][_j].candidates = _this.cells[_i][_j].candidates.filter(function (current) {
                    return current != value;
                  });
                }
              })();
            }
            this.cells[_i][_j].initCandidates = this.cells[_i][_j].candidates.slice();
          }
        }
      }
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell(value, x, y) {
    _classCallCheck(this, Cell);

    this.value = value;
    this.x = x; // row index
    this.y = y; // column index
    this.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // array holding current candidates, based on the situation on the board
    this.initCandidates = []; //default possible candidates that are set up when Board object instance is created
    this.previousCell; //in the case where we need to backtrack, we need to check the previous Cell, this creates a sort of linked listed of nodes
  }

  _createClass(Cell, [{
    key: "filterCandidates",
    value: function filterCandidates(row, col, box) {
      var mergedArray = [].concat(_toConsumableArray(row), _toConsumableArray(col), _toConsumableArray(box));
      this.candidates = this.candidates.filter(function (value) {
        return mergedArray.indexOf(value) === -1;
      });
    }
  }, {
    key: "resetCandidates",
    value: function resetCandidates() {
      this.candidates = this.initCandidates;
    }
  }]);

  return Cell;
}();

exports.default = Cell;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Solver = function () {
  function Solver(board) {
    _classCallCheck(this, Solver);

    this.board = board.cells; // matrix storing values
    this.boardMethods = board; // reference to Board object
    this.numberOfEmptyCells = board.numberOfEmptyCells;
    this.emptyPositions = board.emptyPositions;
    this.currentCell;
    this.previousCell;
    this.noSolution = false;
  }

  _createClass(Solver, [{
    key: "run",
    value: function run() {
      while (this.numberOfEmptyCells) {
        if (!this.currentCell) {
          this.selectStartingCell();
        }
        this.setCurrentCellValue();
        this.selectNextCell();
        if (this.noSolution) {
          return false;
        }
      }
      var solution = [];
      for (var i = 0; i < 9; i++) {
        solution[i] = [];
        for (var j = 0; j < 9; j++) {
          solution[i][j] = this.board[i][j].value;
        }
      }
      return solution;
    }
  }, {
    key: "selectStartingCell",
    value: function selectStartingCell() {
      var _emptyPositions$ = _slicedToArray(this.emptyPositions[0], 2),
          x = _emptyPositions$[0],
          y = _emptyPositions$[1];

      this.currentCell = this.board[x][y];
      for (var i = 1; i < this.emptyPositions.length; i++) {
        var _emptyPositions$i = _slicedToArray(this.emptyPositions[i], 2);

        x = _emptyPositions$i[0];
        y = _emptyPositions$i[1];

        if (this.board[x][y].candidates.length < this.currentCell.candidates.length) {
          // find the cell with least candidates for optimization
          this.currentCell = this.board[x][y];
        }
      }
    }
  }, {
    key: "setCurrentCellValue",
    value: function setCurrentCellValue() {
      if (!this.currentCell.candidates[0]) {
        return this.backtrack();
      }
      this.currentCell.value = this.currentCell.candidates[0]; //always take first candidate
      this.numberOfEmptyCells--; // decrement number of empty cells
    }
  }, {
    key: "selectNextCell",
    value: function selectNextCell() {
      var length = 9;
      this.previousCell = this.currentCell;
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (this.board[i][j].value === 0) {
            this.board[i][j].resetCandidates(); //need to reset to default candidates for every check
            var _ref = [this.boardMethods.getRow(i), this.boardMethods.getColumn(j), this.boardMethods.getBox(i, j)],
                row = _ref[0],
                col = _ref[1],
                box = _ref[2];

            this.board[i][j].filterCandidates(row, col, box);
            if (this.board[i][j].candidates.length === 0) {
              //if there is at least one cell without candidates
              this.numberOfEmptyCells++; //increment number of empty cells
              this.board[i][j].resetCandidates(); // reset its candidates
              this.currentCell = this.previousCell; //backtrack
              return this.backtrack();
            } else {
              if (this.board[i][j].candidates.length < length) {
                // find the cell with least candidates
                this.currentCell = this.board[i][j]; // make it current cell
                this.currentCell.previousCell = this.previousCell; // 
                length = this.currentCell.candidates.length;
              }
            }
          }
        }
      }
    }
  }, {
    key: "updateCandidates",
    value: function updateCandidates() {
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (this.board[i][j].value === 0) {
            this.board[i][j].resetCandidates();
            var _ref2 = [this.boardMethods.getRow(i), this.boardMethods.getColumn(j), this.boardMethods.getBox(i, j)],
                row = _ref2[0],
                col = _ref2[1],
                box = _ref2[2];

            this.board[i][j].filterCandidates(row, col, box);
          }
        }
      }
    }
  }, {
    key: "backtrack",
    value: function backtrack() {
      this.currentCell.value = 0; // reset value
      this.currentCell.candidates = this.currentCell.candidates.slice(1); // cannot take the first value
      var _ref3 = [this.currentCell.x, this.currentCell.y],
          x = _ref3[0],
          y = _ref3[1];
      var _ref4 = [this.boardMethods.getRow(x), this.boardMethods.getColumn(y), this.boardMethods.getBox(x, y)],
          row = _ref4[0],
          col = _ref4[1],
          box = _ref4[2];

      this.currentCell.filterCandidates(row, col, box);
      while (!this.currentCell.candidates.length) {
        //keep backtracking while the current cell has no candidates
        this.numberOfEmptyCells++;
        this.currentCell.value = 0;
        this.currentCell.resetCandidates();
        this.updateCandidates();
        if (!this.currentCell.previousCell) {
          this.noSolution = true;
          return;
        }
        this.currentCell = this.currentCell.previousCell;
        this.currentCell.candidates = this.currentCell.candidates.slice(1);
        var _ref5 = [this.currentCell.x, this.currentCell.y],
            _x = _ref5[0],
            _y = _ref5[1];
        var _ref6 = [this.boardMethods.getRow(_x), this.boardMethods.getColumn(_y), this.boardMethods.getBox(_x, _y)],
            _row = _ref6[0],
            _col = _ref6[1],
            _box = _ref6[2];

        this.currentCell.filterCandidates(_row, _col, _box);
      }
      this.setCurrentCellValue();
      this.selectNextCell();
    }
  }]);

  return Solver;
}();

exports.default = Solver;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
  function Validator(table, currentBoard, numberOfEmptyCells) {
    _classCallCheck(this, Validator);

    this.table = table; // reference to the DOM table/view 
    this.currentBoard = currentBoard;
    this.numberOfEmptyCells = numberOfEmptyCells; // number of empty cells left on the board
  }

  _createClass(Validator, [{
    key: 'updateBoard',
    value: function updateBoard(row, col, previousValue, nextValue) {
      this.currentBoard.cells[row][col].value = nextValue;
      if (nextValue != '') {
        // if user enters a number
        if (previousValue === '') {
          // and previous value was '' (empty field)
          --this.numberOfEmptyCells; // decrement number of empty cells
        }
        this.removeConflicts(row, col); // check if any errors can be removed
        var conflictCells = this.checkForConflicts(row, col, nextValue); // check for new conflicts/errors
        if (conflictCells.length) {
          this.table.highlightError(conflictCells); //highlight the errors
        }
        if (this.numberOfEmptyCells === 0) {
          // if there are no more empty fields left
          if (this.finalChecker()) {
            // if final checker return true
            setTimeout(this.table.displaySuccess, 1); //set timeout so the last number is displayed before the success alert
            return;
          }
        }
      } else {
        if (previousValue != '') {
          //if user presses backspace and previous value was a number (not empty field)
          ++this.numberOfEmptyCells; // increase the number of empty cells
        }
        this.removeConflicts(row, col); //check if any errors can be removed
      }
    }
  }, {
    key: 'checkForConflicts',
    value: function checkForConflicts(x, y, value) {
      //collect row, column and box for the provided coordinates and check if the value of the current cell is repeated
      var _ref = [this.currentBoard.getRow(x, true), this.currentBoard.getColumn(y, true), this.currentBoard.getBox(x, y, true)],
          row = _ref[0],
          col = _ref[1],
          box = _ref[2];

      return [].concat(_toConsumableArray(row), _toConsumableArray(col), _toConsumableArray(box)).filter(function (current) {
        return current.value == value && (current.x != x || current.y != y);
      });
    }
  }, {
    key: 'removeConflicts',
    value: function removeConflicts(x, y) {
      var _this = this;

      var _ref2 = [this.currentBoard.getRow(x, true), this.currentBoard.getColumn(y, true), this.currentBoard.getBox(x, y, true)],
          row = _ref2[0],
          col = _ref2[1],
          box = _ref2[2];


      row.concat(col).concat(box).forEach(function (current) {
        var conflictCells = _this.checkForConflicts(current.x, current.y, current.value);
        if (!conflictCells.length) {
          _this.table.removeError(current);
        }
      });
    }
  }, {
    key: 'finalChecker',
    value: function finalChecker() {
      //final checker checks all cells for conflicts before displaying the success message
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          var conflictCells = this.checkForConflicts(i, j, this.currentBoard.cells[i][j].value);
          if (conflictCells.length) {
            return false;
          }
        }
      }
      return true;
    }
  }]);

  return Validator;
}();

exports.default = Validator;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var table = document.getElementById('table');
var divFields = table.querySelectorAll('div');

/*
DOMtable class provides a reference to the DOM table to avoid using document.getElementById all the time
Each input field has a unique ID and the necessary event listeners attached to it
*/

var DOMtable = function () {
  function DOMtable() {
    _classCallCheck(this, DOMtable);

    this.inputFields = []; //array for storing DOM div nodes that are inside table td nodes
    this.currentField; // current div that has focus
    this.previousField;
    this.validator; //reference/connection to the validator class that checks user's entered values
  }

  _createClass(DOMtable, [{
    key: 'create',
    value: function create() {
      for (var i = 0; i < 9; i++) {
        this.inputFields[i] = [];
        for (var j = 0; j < 9; j++) {
          var current = divFields[i * 9 + j];
          current.id = i + '-' + j; //element id is created using the format "row-col" (ex. 0-0) to make it unique
          current.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
          current.addEventListener('mousedown', this.highlightCurrentField.bind(this));
          this.inputFields[i][j] = current;
        }
      }
    }
  }, {
    key: 'display',
    value: function display(board) {
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          var currentField = this.inputFields[i][j];
          currentField.innerHTML = ''; //first of all we need to reset the values
          currentField.removeAttribute('readonly');
          if (currentField.classList.length) {
            for (var n = 0; n < currentField.classList.length; n++) {
              // for loop is needed because IE does not allow forEach on classList
              var cl = currentField.classList.item(n);
              currentField.removeAttribute('class', cl);
            }
          }
          if (board[i][j] != 0) {
            currentField.innerHTML = board[i][j];
            currentField.setAttribute('readonly', 'true'); // user should not be able to modify the terminal pattern
            currentField.classList.add('setValue');
          }
        }
      }
    }
  }, {
    key: 'handleKeyboardEvent',
    value: function handleKeyboardEvent(event) {
      event = event || window.event;
      var keyValue = event.key;
      var id = this.currentField.id;

      var _id$split = id.split('-'),
          _id$split2 = _slicedToArray(_id$split, 2),
          row = _id$split2[0],
          col = _id$split2[1]; // id format is "row-col", we can get the coordinates by removing the hyphen 


      if (/^(Arrow)*(Up|Down|Right|Left)$/.test(keyValue)) {
        event.preventDefault();
        this.highlightArrowMovement(keyValue, row, col);
      } else if (keyValue === 'Backspace' || keyValue === 'Delete') {
        event.preventDefault(); // this is needed to prevent IE and mozzila from returning to a previous page when user hits backspace
        if (!this.currentField.hasAttribute('readonly')) {
          this.validator.updateBoard(row, col, this.currentField.innerHTML, '');
          this.currentField.innerHTML = '';
        } else {
          // if the field is readonly 
          return;
        }
      } else if (/[1-9]/.test(keyValue)) {
        //numbers between [1-9]
        if (!this.currentField.hasAttribute('readonly')) {
          //update the value if the field is not readonly
          var previousValue = this.currentField.innerHTML;
          this.currentField.innerHTML = keyValue;
          this.validator.updateBoard(row, col, previousValue, keyValue);
        } else {
          return;
        }
      } else {
        // if any other key is pressed, prevent default behaviour
        return event.preventDefault();
      }
    }
  }, {
    key: 'highlightCurrentField',
    value: function highlightCurrentField(event, fieldToHighlight) {
      if (this.currentField) {
        //if there is already a current field
        this.previousField = this.currentField; //make it previous field
        this.previousField.classList.remove('current');
        //event.target is provided by mousedown event, if it's absent, we use second parameter provided by highlightArrowMovement function
        this.currentField = event ? event.target : fieldToHighlight;
      } else {
        //if there's no current field, make event target current field
        this.currentField = event.target;
      }
      this.currentField.classList.add('current');
    }
  }, {
    key: 'highlightArrowMovement',
    value: function highlightArrowMovement(keyValue, row, col) {
      var fieldToHighlight = void 0;
      keyValue = keyValue.replace('Arrow', '');
      switch (keyValue) {
        case 'Left':
          if (col > 0) {
            --col;
            break;
          } else {
            return;
          }
        case 'Up':
          if (row > 0) {
            --row;
            break;
          } else {
            return;
          }
        case 'Right':
          if (col < 8) {
            ++col;
            break;
          } else {
            return;
          }
        case 'Down':
          if (row < 8) {
            ++row;
            break;
          } else {
            return;
          }
      }
      fieldToHighlight = this.inputFields[row][col];
      this.highlightCurrentField(null, fieldToHighlight);
    }
  }, {
    key: 'highlightError',
    value: function highlightError(errorList) {
      var _this = this;

      //errorList array contains Cell objects, so we can get their row and columnn values by getting x and y properties
      errorList.forEach(function (errorField) {
        var _ref = [errorField.x, errorField.y],
            row = _ref[0],
            col = _ref[1];

        if (!_this.inputFields[row][col].classList.contains('error')) {
          _this.inputFields[row][col].classList.add('error');
        }
      });
      this.currentField.classList.add('error');
    }
  }, {
    key: 'removeError',
    value: function removeError(field) {
      var _ref2 = [field.x, field.y],
          row = _ref2[0],
          col = _ref2[1];
      // change in the current field triggered the removal of error, so there is no error in the current field as well

      this.currentField.classList.remove('error');
      this.inputFields[row][col].classList.remove('error');
    }
  }, {
    key: 'displaySuccess',
    value: function displaySuccess() {
      alert('Congratulations! You have solved the puzzle!');
    }
  }]);

  return DOMtable;
}();

exports.default = DOMtable;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);