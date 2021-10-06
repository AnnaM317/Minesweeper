'use strict'

var gInterval;
var gBoard;
var gIsFirstClick;
var gLives = 3;
var gSafeClicks = 3;
var gLevel = {
    SIZE: 6,
    MINES: 3
}
var gGame = {
    isOn: false,
    shownCount: 0,
    flagsCount: 0,
    secsPassed: 0
}

function resetGame() {
    stopTimer();
    // gInterval = null;
    gBoard = [];
    gIsFirstClick = true;
    gGame.isOn = false;
    gSafeClicks = 3;
    gGame.shownCount = 0;
    gGame.flagsCount = 0;
    gLives = gLevel.MINES <= 2 ? 2 : 3;
    if (gLives === 3) {
        document.querySelector('.span-lives').innerHTML = '🤍🤍🤍';
    }
    else if (gLives === 2) {
        document.querySelector('.span-lives').innerHTML = '🤍🤍';
    }
    init();
}

function startGame(size = 6, mines = 3) {
    stopTimer();
    // gInterval = null;
    gBoard = [];
    gGame.shownCount = 0;
    gGame.flagsCount = 0;

    gGame.isOn = true;
    gIsFirstClick = true;
    gSafeClicks = 3;
    gLevel.SIZE = size;
    gLevel.MINES = mines;
    gLives = (gLevel.MINES <= 2) ? 2 : 3;
    if (gLives === 3) {
        document.querySelector('.span-lives').innerHTML = '🤍🤍🤍';
    }
    else if (gLives === 2) {
        document.querySelector('.span-lives').innerHTML = '🤍🤍';
    }
    document.querySelector('.timer-container span').innerHTML = '00:00';
    document.querySelector('.smiley').innerHTML = '&#128512';
    document.querySelector('.clicks-left').innerHTML = `${gSafeClicks} SOS Clicks Available`;
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard, '.board');
}

function init() {
    gGame.isOn = true;
    gIsFirstClick = true;
    document.querySelector('.timer-container span').innerHTML = '00:00';
    document.querySelector('.smiley').innerHTML = '&#128512';
    document.querySelector('.clicks-left').innerHTML = `${gSafeClicks} SOS Clicks Available`;
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard, '.board');
    // startGame();
}


function buildBoard() {
    var board = createMat(gLevel.SIZE, gLevel.SIZE);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j] = createCell();
        }
    }
    console.log(board);
    return board;
}

function addMines(minesNumber, board) {
    var countMines = 0;
    while (countMines < minesNumber) {
        var row = Math.floor(Math.random() * board.length);
        var col = Math.floor(Math.random() * board[0].length);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true
            countMines++;
        }
    }
}

function addMinesFirstTime(minesNumber, board, rowIdx, colIdx) {
    var countMines = 0;
    while (countMines < minesNumber) {
        var row = Math.floor(Math.random() * board.length);
        var col = Math.floor(Math.random() * board[0].length);
        if (!board[row][col].isMine && row !== rowIdx && col !== colIdx) {
            board[row][col].isMine = true
            countMines++;
        }
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var numOfMines = countNeighborsMines(i, j, board);
            if (!board[i][j].isMine) board[i][j].minesAroundCount = numOfMines;
            else continue;
        }
    }
}

function countNeighborsMines(cellI, cellJ, mat) {
    var neighborsMinesCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) neighborsMinesCount++;
        }
    }
    return neighborsMinesCount;
}

function win() {
    stopTimer();
    clearInterval(gInterval);
    gGame.isOn = false;
    document.querySelector('.smiley').innerHTML = '&#129297';
}

function checkWin() {
    // var win = false;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                if (gBoard[i][j].isShown) return false;
                if (!gBoard[i][j].isFlagged) return false
            }
            else if (!gBoard[i][j].isMine) {
                if (!gBoard[i][j].isShown) return false;
            }
        }
    }
    return true;
}


function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    stopTimer();
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                var elCell = document.querySelector('.cell' + i + '-' + j);
                gBoard[i][j].isShown = true;
                elCell.classList.add('show');
                elCell.innerHTML = MINE;
                // renderCell(i, j, MINE);

            }
        }
    }
    document.querySelector('.smiley').innerHTML = '&#129327';
}



function stopTimer() {
    clearInterval(gInterval);
    gInterval = null;
}

function startTimer() {
    var elTimer = document.querySelector('.timer-container span');
    var timestamp = Date.now();

    gInterval = setInterval(() => {
        var time = `${((Date.now() - timestamp) / 1000).toFixed(3)}`;
        elTimer.innerText = time;
    }, 50);
}


function renderBoard(board, selector) {
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var className = 'cell cell' + i + '-' + j;
            var clickButton = `onclick="cellClicked(this,${i},${j})"`;
            var rightClick = `oncontextmenu = "cellFlagged(event,this,${i},${j})`; //
            var classShow = board[i][j].isShown ? 'show' : '';
            strHTML += `<td class="${className} ${classShow}" ${clickButton} ${rightClick}"></td>`;
            // strHTML += `<td class="${className} ${classShow}" ${clickButton}  ${rightClick}"> ${cell} </td>`;

        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}