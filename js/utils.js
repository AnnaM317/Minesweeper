
function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push({});
        }
        mat.push(row)
    }
    return mat;
}
function checkCell(cell) {
    var innerHtml = '';
    if (cell.isMine && !cell.isFlagged) {
        innerHtml = MINE;
    }
    if (cell.minesAroundCount && !cell.isFlagged) {
        innerHtml = cell.minesAroundCount;
    }
    if (!cell.minesAroundCount && !cell.isFlagged) {
        innerHtml = '';
    }
    if (cell.isFlagged) {
        innerHtml = FLAG;
    }
}
//works 90%

// function renderBoard(board, selector) {
//     var strHTML = '<table border="0"><tbody>';
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>';
//         for (var j = 0; j < board[0].length; j++) {
//             // var cell = board[i][j];
//             //<td class = "cell cell0-1">cell</td>
//             var cell = '';
//             var className = 'cell cell' + i + '-' + j;
//             var classShow = 'show'; //add class show to css
//             //onkeyup , oncontextmenu
//             var clickButton = `onclick="cellClicked(this,${i},${j})"`;
//             var rightClick = `oncontextmenu = "cellFlagged(event,this,${i},${j})`; //
//             if (board[i][j].isMine) {
//                 cell = MINE;
//             }

//             else {
//                 if (board[i][j].minesAroundCount && !board[i][j].isFlagged) {
//                     cell = board[i][j].minesAroundCount;
//                 }
//                 else if (!board[i][j].minesAroundCount && !board[i][j].isFlagged) {
//                     cell = '';
//                 }
//             }
//             // var mine = board[i][j].isMine ? MINE : ''; 
//             // var number = board[i][j].minesAroundCount ? board[i][j].minesAroundCount : '';
//             // console.log(number);
//             //[data-]
//             if (board[i][j].isShown) {
//                 strHTML += `<td class="${className} ${classShow}" ${clickButton}  ${rightClick}">${cell}</td>`;
//                 // strHTML += `<td class="${className} ${classShow}" ${clickButton}  ${rightClick}"> ${cell} </td>`;
//             }
//             else {
//                 // strHTML += `<td class="${className}" ${clickButton}  ${rightClick}"> ${cell} </td>`;
//                 strHTML += `<td class="${className}" ${clickButton}  ${rightClick}"></td>`;

//             }
//             // strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>';
//     var elContainer = document.querySelector(selector);
//     // document.querySelector('.cell0-0').style.display = 'none';
//     elContainer.innerHTML = strHTML;
// }

// function renderCell(row, col, value) {
//     // console.log(value);
//     // Select the elCell and set the value
//     var elCell = document.querySelector(`.cell${row}-${col}`); //<td class = "cell cell0-1" </td>
//     elCell.innerHTML = value;
//     // elCell.style.display = 'none';
// }

function getRandomIntInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getEmptyCells() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i: i, j: j });
            }
        }
    }
    return emptyCells;
}

function getEmptyCell() {
    // if (gBallsOnBoard === 0) clearInterval(gIntervaId);
    var cells = getEmptyCells();
    if (cells.length === 0) return;
    var randomCellIndex = getRandomIntInclusive(0, cells.length - 1);
    var randomCell = cells[randomCellIndex];
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}