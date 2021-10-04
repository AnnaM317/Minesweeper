'use strict'


var gInterval;
var gBoard;
var gIsFirstClick = true;
var gLevel = {
    SIZE: 10,
    MINES: 14
}
var gGame = {
    isOn: false,
    shownCount: 0,
    flaggedCount: 0,
    secsPassed: 0
}

function init() {
    gGame.isOn = true;
    gBoard = buildBoard();
    // printMat(gBoard, '.board-container');
    // printMat(gBoard, '.board');//

    if (!gIsFirstClick) {
        addMines(gLevel.MINES, gBoard);
        setMinesNegsCount(gBoard);
    }
    // console.table(gBoard);//
    renderBoard(gBoard, '.board');
    // printMat(gBoard, '.board');//
    // gGame.isOn = true;
}


function buildBoard() {
    var board = createMat(gLevel.SIZE, gLevel.SIZE);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j] = createCell();
        }
    }
    // board[2][3].isShown = true;
    // board[0][0].isMine = true;
    // board[0][1].isShown = true;
    // board[2][1].isMine = true;
    // board[2][3].isMine = true;
    // console.log(board);
    // if (!isFirstClick){
    //     addMines(gLevel.MINES, board);
    //     setMinesNegsCount(board);
    // }
    console.log(board);
    return board;
}

function addMines(number, board) {
    var countMines = 0;
    while (countMines < number) {
        // console.log(gBoard.length);
        var row = Math.floor(Math.random() * board.length);
        var col = Math.floor(Math.random() * board[0].length);
        // console.log('row - col', row, col);
        // var currentCell = gBoard[row][col];
        // console.log(currentCell);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true
            // console.log(currentCell);
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

// function checkGameOver() {
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard[0].length; j++) {
//             if (gBoard[i][j].isMine && !gBoard[i][j].isShown && gBoard[i][j].isFlagged) {
//                 console.log('win');
//                 return false;
//             }
//             else {
//                 console.log('lost');
//                 return false;
//             }
//         }
//     }
// }

function renderCell(i, j, value) {
    var cellClass = 'cell-' + i + '-' + j;
    var cellSelector = '.' + cellClass;
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

function gameOver() {
    console.log('Game Over');
    stopTimer();
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                gBoard[i][j].isShown = true;
                console.log(document.querySelector('.cell' + i + '-' + j));
                document.querySelector('.cell' + i + '-' + j).classList.add('mine');
                gGame.isOn = false;
            }
        }
    }
    renderBoard(gBoard, '.board');
}
// function gameOver() {
//     console.log('Game Over');
//     document.querySelector('.modal').style.display = 'inline-block'
//     gGame.isOn = false;
//     clearInterval(gIntervalGhosts)
// }

// function getGhostHTML(ghost) {
//     if (gPacman.isSuper) return `<span style="color:${'#DC313E'}">${GHOST}</span>`;
//     else return `<span style="color:${getRandomColor()}">${GHOST}</span>`;
// }

// function getClassName(i, j) {
//     var cellClass = 'cell-' + location.i + '-' + location.j;
//     return cellClass;
// }

function startTimer() {
    var startTime = Date.now();
    updateTimer(startTime);
}

function updateTimer(startTime) {
    var elTimer = document.querySelector(".timer-container span");
    gInterval = setInterval(function () {
        var timeNow = Date.now()
        var seconds = (timeNow - startTime) / 1000;
        elTimer.innerText = seconds;
    }, 100);
}

function stopTimer() {
    clearInterval(gInterval);
}