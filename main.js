function getel(e) {
    return document.getElementById(e)
}

function go() {
    var list = document.getElementsByClassName('fly');

    for (let i = 0; i < list.length; i++) {
        var e = list[i];
        e.classList.remove('a1');
        e.classList.remove('a2');
        e.classList.remove('a3');
        e.classList.remove('b1');
        e.classList.remove('b2');
        e.classList.remove('b3');
    }

    var seats = [];

    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 5; j++) {
            seats.push([i, j]);
        }
    }

    for (let i = 0; i < 25; i++) {
        var r = Math.floor(Math.random() * seats.length);
        var seat = seats[r];
        getel(i + 1).classList.add(seat[0], seat[1]);
        seats.splice(r, 1);
        console.log(seats);
    }
}

var seats = [];

    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 5; j++) {
            seats.push([i, j]);
        }
    }

    console.log(seats);

function batch(n) {
    var list = document.getElementsByClassName(n);

    for (let i = 0; i < list.length; i++) {
        var e = list[i];
        e.style.marginTop = '105px';

    }
}

var ids = 1

for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
        document.getElementById('content').innerHTML += `<div class='fly a${i} b${j}' id='${ids}'>${ids}</div>`;
        ids ++;
    }
}

