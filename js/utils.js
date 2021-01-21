'use strict';

var gStartTime;
var gElapsedTime = 0;
var gTimerInterval;


function minesAroundCount(location) {
    var countNegs = 0;
    for (var i = location.i - 1; i <= location.i + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = location.j - 1; j <= location.j + 1; j++) {
            if (j < 0 || j > gBoard.length - 1) continue;
            if (i === location.i && j === location.j) continue;
            if (gBoard[i][j].isMine) countNegs++
        }
    }
    return countNegs;
}

function expandShown(board, location) {
    for (var i = location.i - 1; i <= location.i + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = location.j - 1; j <= location.j + 1; j++) {
            if (j < 0 || j > gBoard.length - 1) continue;
            if (i === location.i && j === location.j) continue;
            board[i][j].isShown = true;
            setMinesNegsCount({ i: i, j: j });
        }
    }
}

function renderCell(location, value) {
    var elCell = document.querySelector(`#cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function renderMineCell(location, value) {
    var elCell = document.querySelector(`#cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function renderSafetyCell(location, bool) {
    var elCell = document.querySelector(`#cell${location.i}-${location.j}`);
    if (bool) {
        elCell.style.border = '3px solid red';
    } else {
        elCell.style.border = 'none';
    }
}

function getEmptyPositions(board) {
    var emptys = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j].isMine) continue;
            if (board[i][j].isShown) continue;
            emptys.push({ i: i, j: j });
        }
    }
    return emptys
}

function getRandomPosSafe(emptys) {
    var randomI = getRandomIntInclusive(0, emptys.length - 1);
    var location;
    for (let i = 0; i < emptys.length; i++) {
        if (randomI === i) location = { i: emptys[i].i, j: emptys[i].j }
    }
    return location;
}

function getRandomLocationOfMines(size, mines) {
    var minesLocations = [];
    var randomI;
    var randomJ;
    var location;

    for (let i = 0; i < mines; i++) {
        randomI = getRandomIntInclusive(1, size - 1);
        randomJ = getRandomIntInclusive(1, size - 1);
        location = { i: randomI, j: randomJ }
        minesLocations.push(location);
    }
    return minesLocations;
}

function getCellById(id) {
    var getCellId = id.split('cell')[1];
    var locationI = +getCellId.split('-')[0];
    var locationJ = +getCellId.split('-')[1];
    var locationCell = { i: locationI, j: locationJ };

    return locationCell;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function displayTimer(txt) {
    document.querySelector(".timer").innerText = txt;
}

function startTimer() {
    gStartTime = Date.now();
    gTimerInterval = setInterval(function () {
        gElapsedTime = Date.now() - gStartTime;
        displayTimer(timeToString(gElapsedTime));
    }, 10);
}

function pauseTimer() {
    clearInterval(gTimerInterval);
}

function resetTime() {
    clearInterval(gTimerInterval);
    displayTimer("00:00:00");
    gElapsedTime = 0;
}

function timeToString(time) {
    var diffInHrs = time / 3600000;
    var hh = Math.floor(diffInHrs);

    var diffInMin = (diffInHrs - hh) * 60;
    var mm = Math.floor(diffInMin);

    var diffInSec = (diffInMin - mm) * 60;
    var ss = Math.floor(diffInSec);

    var diffInMs = (diffInSec - ss) * 100;
    var ms = Math.floor(diffInMs);

    var formattedMM = mm.toString().padStart(2, "0");
    var formattedSS = ss.toString().padStart(2, "0");
    var formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}