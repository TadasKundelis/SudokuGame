This is my sudoku game made using HTML, Javascript (ES6), SCSS and Webpack.

I use the traditional hole-digging algorithm to produce a terminal pattern. The main goal is to produce a puzzle with a unique solution. It works as follows : 

1. Create a full (solved) grid.
2. For each square on the grid, try to solve the puzzle with a different number, if it can be solved, leave current number, if it can't, it means the current number is the only choice and we can remove it. 

Program works in IE11, Firefox and Chrome. 

Live preview : https://festive-kepler-02e63a.netlify.app/


