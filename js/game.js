'use strict'
const MINE = '💣';
const FLAG = '🚩';
const WIN_EMOJI = '😎';
const LOSE_EMOJI = '😭';
const REGULAR_EMOJI = '🙂';

var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gMinesLocations;

var gGame = {
    isOn: false,
    shownCount: 0, markedCount: 0, secsPassed: 0,
    isWin: null,
    lifesCount: 3,
    firstClick: true,
};

function init() {
    gGame.isOn = true;
    gBoard = buildBoard();
    renderBoard(gBoard)
    renderEmojiMood(REGULAR_EMOJI);
    gGame.lifesCount = 3;
    gGame.firstClick = true;
    renderLifesCount(gGame.lifesCount);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: null, isShown: false, isMine: false, isMarked: false
            };
        }
    }
    return board;
}

function renderBoard(board) {
    var strHTML = '';
    for (let i = 0; i < board.length; i++) {
        strHTML += ` <tr>`
        for (var j = 0; j < board.length; j++) {
            strHTML += `<td class="cell" id="cell${i}-${j}" onClick="cellClicked(this)" oncontextmenu="cellMarked(this)"></td>`
        }
    }
    strHTML += `</tr>`
    var elBoard = document.querySelector('.game-board')
    elBoard.innerHTML = strHTML;
}

function setMinesNegsCount(location) {
    var neighborsNumber = minesAroundCount({ i: location.i, j: location.j })
    gBoard[location.i][location.j].minesAroundCount = neighborsNumber;
    renderCell({ i: location.i, j: location.j }, neighborsNumber)

    return neighborsNumber;
}

function cellClicked(elCell) {
    if (gGame.firstClick) {
        gMinesLocations = getRandomLocationOfMines(gLevel.SIZE, gLevel.MINES);
        renderMinesInBoard();
        console.log(gMinesLocations);
        startTimer();
        gGame.firstClick = false;
    }
    if (gGame.isOn) {
        var id = elCell.getAttribute('id')
        var locationCell = getCellById(id);
        var currCell = gBoard[locationCell.i][locationCell.j];
        if (!currCell.isMine && !currCell.isShown && !currCell.isMarked) {
            elCell.classList.add('clicked')
            gBoard[locationCell.i][locationCell.j].isShown = true;
            setMinesNegsCount(locationCell);
        }
        if (!gBoard[locationCell.i][locationCell.j].isShown && currCell.isMine) {
            if (gGame.lifesCount > 0) {
                gGame.lifesCount--;
                renderMineCell(locationCell, MINE)
                renderLifesCount(gGame.lifesCount);
            } else {
                gGame.isWin = false;
                gameOver();
            }
        }
    } else return;
}

function getCellById(id) {
    var getCellId = id.split('cell')[1];
    var locationI = +getCellId.split('-')[0];
    var locationJ = +getCellId.split('-')[1];
    var locationCell = { i: locationI, j: locationJ };

    return locationCell;
}

function cellMarked(elCell) {
    if (gGame.isOn) {
        event.preventDefault();
        var id = elCell.getAttribute('id')
        var locationCell = getCellById(id);
        locationCell = getCellById(id);
        if (!gBoard[locationCell.i][locationCell.j].isMarked) {
            renderCell(locationCell, FLAG);
            var currCell = gBoard[locationCell.i][locationCell.j];
            currCell.isMarked = true;
            if (currCell.isMine) gGame.markedCount++;
            if (gGame.markedCount === gLevel.MINES) {
                gGame.isWin = true;
                gameOver();
            }
        } else if (gBoard[locationCell.i][locationCell.j].isMarked) {
            renderCell(locationCell, '');
            var currCell = gBoard[locationCell.i][locationCell.j];
            currCell.isMarked = false;
            if (currCell.isMine) gGame.markedCount--;
        }
    } else return;
}

function renderMinesInBoard() {
    for (let i = 0; i < gMinesLocations.length; i++) {
        gBoard[gMinesLocations[i].i][gMinesLocations[i].j].isMine = true;
    }
}

function gameOver() {
    if (gGame.isWin) {
        console.log('Winner');
        renderEmojiMood(WIN_EMOJI);
        gGame.isOn = false;
    } else {
        console.log('Loser')
        renderEmojiMood(LOSE_EMOJI);
        gGame.isOn = false;
    }
    pauseTimer();
}

function renderEmojiMood(emoji) {
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerText = emoji;
}

function renderLifesCount(lifes) {
    var elLifes = document.querySelector('.life')
    if (lifes === 3) elLifes.innerText = '❤️❤️❤️';
    else if (lifes === 2) elLifes.innerText = '❤️❤️';
    else if (lifes === 1) elLifes.innerText = '❤️';
    else elLifes.innerText = '';
}

function levelChose(size, mines) {

}

function restart() {
    init();
    resetTime();
}
