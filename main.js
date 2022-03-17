function getel(e) {
    return document.getElementById(e)
}

function setSeat() {
    var list = document.getElementsByClassName('seat');

    for (let i = 0; i < list.length; i++) {
        var e = list[i];
        e.classList.remove('a1');
        e.classList.remove('a2');
        e.classList.remove('a3');
        e.classList.remove('a4');
        e.classList.remove('a5');
        e.classList.remove('b1');
        e.classList.remove('b2');
        e.classList.remove('b3');
        e.classList.remove('b4');
        e.classList.remove('b5');
        e.classList.add('dispenser');
    }

    setTimeout(() => {
        for (let i = 0; i < list.length; i++) {
            var e = list[i];
            e.classList.remove('a1');
            e.classList.remove('a2');
            e.classList.remove('a3');
            e.classList.remove('a4');
            e.classList.remove('a5');
            e.classList.remove('b1');
            e.classList.remove('b2');
            e.classList.remove('b3');
            e.classList.remove('b4');
            e.classList.remove('b5');
        }

        var seats = [];

        for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 5; j++) {
                seats.push(['a' + i, 'b' + j]);
            }
        }

        for(let i = 0; i < 25; i++){
            (function(x){
              setTimeout(function(){
                var r = Math.floor(Math.random() * seats.length);
                var seat = seats[r];
                getel(i + 1).classList.remove('dispenser');
                getel(i + 1).classList.add(seat[0], seat[1]);
                seats.splice(r, 1);
              }, 100*x);
            })(i);
          }
    }, 1000);
}

var test = [];

for (let i = 1; i <= 25; i++) {
    test.push(`조찬아${i}`);
}

var ids = 1

for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
        document.getElementById('content').innerHTML += `<div class='seat a${i} b${j}' id='${ids}'>${test[ids-1]}</div>`;
        ids++;
    }
}

document.body.addEventListener("keydown", function(e){
    if(e.keyCode == 13){
        getel('nameInput').value = '';
    }
});

function setName() {
    getel('nameInput').classList.toggle('inv');
    getel('nameInput').select();
}