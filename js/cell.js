'use strict'
const MINE = '💣';
const EMPTY = ' ';
const FLAG = '🚩';


function createCell() {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isFlagged: false
    };
    return cell;
}


function firstClick() {
    gIsFirstClick = false;
    startTimer();
    addMines(gLevel.MINES, gBoard);
    setMinesNegsCount(gBoard);
}

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gIsFirstClick) {
        firstClick();
    }
    var currCell = gBoard[i][j];
    if (currCell.isMine) {
        gBoard[i][j].isShown = true;
        gameOver();
        renderBoard(gBoard, '.board');
    }
    if (currCell.isShown) return;
    else if (currCell.minesAroundCount !== 0) currCell.isShown = true;
    else {
        currCell.isShown = true;
        elCell.innerHtml = currCell.minesAroundCount;
        expandShown(gBoard, elCell, i, j);
    }
    renderBoard(gBoard, '.board');
}

function cellFlagged(ev, elCell, i, j) {
    ev.preventDefault();
    // gBoard[0][0].isFlagged = true;
    if (gBoard[i][j].isFlagged) {
        gBoard[i][j].isFlagged = false;
    }
    else {
        gBoard[i][j].isShown = false;
        gBoard[i][j].isFlagged = true;
        elCell.innerHtml = FLAG;
    }
    renderBoard(gBoard, '.board');
}

function expandShown(board, elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue; //!!
            if (j < 0 || j >= board[i].length) continue;
            if (!board[i][j].isShown) {
                board[i][j].isShown = true;
                // elCell.classList.add('show');
                if (board[i][j].minesAroundCount === 0) {
                    expandShown(board, elCell, i, j);
                }
            }
            //DOM 
            // var elCell = document.querySelector(`.cell${i}-${j}`);//
            // elCell.innerText = '';
            // elCell.classList.add('show');//
        }
    }
}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}