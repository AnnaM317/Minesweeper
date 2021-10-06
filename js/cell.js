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
        if (gLives !== 0) {
            currCell.isShown = true;
            elCell.classList.add('show');
            elCell.innerHTML = MINE;
            setTimeout(function () {
                if (gLives === 3) {
                    document.querySelector('.span-lives').innerHTML = '🤍🤍';
                }
                else if (gLives === 2) {
                    document.querySelector('.span-lives').innerHTML = '🤍';
                }
                else { //gLives === 1
                    document.querySelector('.span-lives').innerHTML = '';
                }
                gLives--;
                currCell.isShown = false;
                elCell.classList.remove('show');
                elCell.innerHTML = '';
            }, 100);
        }
        else {
            gBoard[i][j].isShown = true;
            elCell.classList.add('show');
            elCell.classList.add('mine')
            elCell.innerHTML = MINE;
            gGame.shownCount++;
            gameOver();
        }
    }
    else if (currCell.minesAroundCount !== 0) {
        currCell.isShown = true;
        elCell.classList.add('show');
        addColorToCountMines(elCell, currCell);
        elCell.innerHTML = currCell.minesAroundCount;
        gGame.shownCount++;
        if (checkWin()) {
            win();
        }
    }
    else { //currCell.minesAroundCount === 0

        expandShown(gBoard, i, j);
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

function expandShown(board, cellI, cellJ) {
    if (cellI > board.length - 1 || cellI < 0 || cellJ > board[0].length - 1 || cellJ < 0 || board[cellI][cellJ].isShown || board[cellI][cellJ].isFlagged) return;
    // console.log('i,j', cellI, cellJ);
    board[cellI][cellJ].isShown = true;
    var elCell = document.querySelector(`.cell${cellI}-${cellJ}`);
    elCell.classList.add('show');
    // console.log('elcell', elCell);

    if (board[cellI][cellJ].minesAroundCount !== 0) {
        addColorToCountMines(elCell, board[cellI][cellJ]);
        elCell.innerHTML = board[cellI][cellJ].minesAroundCount;
        return;
    }
    if (checkWin()) {
        win();
    }
    expandShown(board, cellI - 1, cellJ - 1);
    expandShown(board, cellI - 1, cellJ);
    expandShown(board, cellI - 1, cellJ + 1);
    expandShown(board, cellI, cellJ - 1);
    expandShown(board, cellI, cellJ + 1);
    expandShown(board, cellI + 1, cellJ - 1);
    expandShown(board, cellI + 1, cellJ);
    expandShown(board, cellI + 1, cellJ + 1);
}

function addColorToCountMines(elCell, currCell) {
    console.log(elCell, currCell);
    if (currCell.minesAroundCount === 1) elCell.classList.add('one');
    else if (currCell.minesAroundCount === 2) elCell.classList.add('two');
    else if (currCell.minesAroundCount === 3) elCell.classList.add('three');
    else if (currCell.minesAroundCount === 4) elCell.classList.add('four');
    else if (currCell.minesAroundCount === 5) elCell.classList.add('five');
    else if (currCell.minesAroundCount === 6) elCell.classList.add('six');
    else if (currCell.minesAroundCount === 7) elCell.classList.add('seven');
    else elCell.classList.add('eight');
}

function safeClick() {
    if (!gSafeClicks) return;
    var bool = false;
    while (!bool) {
        var row = Math.floor(Math.random() * gBoard.length);
        var col = Math.floor(Math.random() * gBoard[0].length);
        if (!gBoard[row][col].isMine && !gBoard[row][col].isShown && !gBoard[row][col].isFlagged) {
            var elCell = document.querySelector(`.cell${row}-${col}`);
            elCell.classList.add('safe-blink');
            bool = true;
        }
    }
    setTimeout(function () {
        elCell.classList.remove('safe-blink');
        gSafeClicks--;
        document.querySelector('.clicks-left').innerHTML = `${gSafeClicks} SOS Clicks Available`;
    }, 1000);

}

//previous function - half recursion
// function expandShown(board, elCell, cellI, cellJ) {
//     if (checkWin()) {
//         win();
//     }
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= board.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue; //!!
//             if (j < 0 || j >= board[i].length) continue;
//             if (!board[i][j].isShown) {
//                 if (!board[i][j].isFlagged) {
//                     var elcell = document.querySelector(`.cell${i}-${j}`);
//                     board[i][j].isShown = true;
//                     elcell.classList.add('show');
//                 }
//                 if (board[i][j].minesAroundCount !== 0) elcell.innerHTML = board[i][j].minesAroundCount;      
//                 gGame.shownCount++;
//                 if (board[i][j].minesAroundCount === 0) {                   
//                     expandShown(board, elCell, i, j);
//                 }
//             }
//         }
//     }
// }
