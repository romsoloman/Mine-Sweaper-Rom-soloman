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

function renderCell(location, value) {
    var elCell = document.querySelector(`#cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomLocationOfMines(size, mines) {
    var minesLocations = [];
    for (let i = 0; i < mines; i++) {
        var randomI = getRandomIntInclusive(1, size - 1)
        var randomJ = getRandomIntInclusive(1, size - 1)
        var location = { i: randomI, j: randomJ }
        minesLocations.push(location);
    }
    return minesLocations;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function renderMineCell(location, value) {
    var elCell = document.querySelector(`#cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
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