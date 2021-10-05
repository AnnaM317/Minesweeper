'use strict'
const MINE = '💣';
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

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    var currCell = gBoard[i][j];
    if (currCell.isShown) return;
    if (gIsFirstClick) {
        gIsFirstClick = false;
        if (!gInterval) startTimer();
        addMinesFirstTime(gLevel.MINES, gBoard, i, j);
        setMinesNegsCount(gBoard);
    }
    if (currCell.isFlagged) return;
    if (currCell.isMine) {
        gBoard[i][j].isShown = true;
        elCell.classList.add('show');
        elCell.innerHTML = MINE;
        gGame.shownCount++;
        gameOver();
    }
    else if (currCell.minesAroundCount !== 0) {
        currCell.isShown = true;
        elCell.classList.add('show');
        elCell.innerHTML = currCell.minesAroundCount;
        gGame.shownCount++;
        if (checkWin()) {
            win();
        }
    }
    else {
        currCell.isShown = true;
        elCell.classList.add('show');
        expandShown(gBoard, elCell, i, j);
    }
}

function cellFlagged(ev, elCell, i, j) {
    ev.preventDefault(); //
    if (!gGame.isOn) return;
    if (!gInterval) startTimer();
    // if (!gBoard[i][j].isShown && gGame.flagsCount < gLevel.MINES) {
    if (!gBoard[i][j].isShown) {
        if (!gBoard[i][j].isFlagged) {
            // gGame.flagsCount++;
            gBoard[i][j].isFlagged = true;
            elCell.innerHTML = FLAG;
            if (checkWin()) {
                win();
            }
        }
        else {
            gBoard[i][j].isFlagged = false;
            elCell.innerHTML = '';
            // gGame.flagsCount--;
        }
    }
}

function expandShown(board, elCell, cellI, cellJ) {
    if (checkWin()) {
        win();
    }
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue; //!!
            if (j < 0 || j >= board[i].length) continue;
            if (!board[i][j].isShown) {
                if (!board[i][j].isFlagged) {
                    var elcell = document.querySelector(`.cell${i}-${j}`);
                    board[i][j].isShown = true;
                    elcell.classList.add('show');
                }

                if (board[i][j].minesAroundCount !== 0) elcell.innerHTML = board[i][j].minesAroundCount;
                gGame.shownCount++;
                if (board[i][j].minesAroundCount === 0) {
                    expandShown(board, elCell, i, j);
                }
            }
        }
    }
}

// not working meantime..
// function expandShown(board, elCell, cellI, cellJ) {
//     if (cellI >= board.length - 1 || cellI < 0 || cellJ >= board[0].length - 1 || cellJ < 0 || board[cellI][cellJ].isShown || board[cellI][cellJ].isFlagged) return;

//     board[cellI][cellJ].isShown = true;
//     if (board[cellI][cellJ].minesAroundCount !== 0) return;
//
//      if (board[cellI][cellJ].minesAroundCount !== 0) elcell.innerHTML = board[cellJ][cellJ].minesAroundCount;
//     // }
//     if (checkWin()) {
//         win();
//     }
//     expandShown(cellI - 1, cellJ - 1);
//     expandShown(cellI - 1, cellJ);
//     expandShown(cellI - 1, cellJ + 1);
//     expandShown(cellI, cellJ - 1);
//     expandShown(cellI, cellJ + 1);
//     expandShown(cellI + 1, cellJ - 1);
//     expandShown(cellI + 1, cellJ);
//     expandShown(cellI + 1, cellJ + 1);
// }