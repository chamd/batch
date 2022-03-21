var a;
var b;
var all;

var isSelectSeat = false;
var selectedSeat;
var pinnedSeat = [];

function changeSeat(n) {
    if (nowMode == 1) {
        if (getel(n).classList[2] != 'pin') {
            getel(n).style.backgroundColor = 'rgba(255, 95, 95, 0.5)';
            pinnedSeat.push(getel(n).className);
            getel(n).classList.add('pin');
        } else {
            getel(n).style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            getel(n).classList.remove('pin');
            var _index = pinnedSeat.indexOf(getel(n).className);
            if (_index != -1) {
                pinnedSeat.splice(_index, 1);
            }
        }
    } else {
        if (!isSelectSeat) {
            getel(n).style.backgroundColor = 'rgba(69, 52, 218, 0.5)';
            selectedSeat = n;
            isSelectSeat = true
        } else {
            getel(n).style.transition = '0.3s';
            getel(selectedSeat).style.transition = '0.3s';
            getel(selectedSeat).style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            var _change = getel(selectedSeat).className;
            getel(selectedSeat).className = getel(n).className;
            getel(n).className = _change;
            [seats[n - 1], seats[selectedSeat - 1]] = [seats[selectedSeat - 1], seats[n - 1]];
            setTimeout(() => {
                formatSeat();
            }, 300);
            selectedSeat = '';
            isSelectSeat = false;
        }    
    }
}

function setHover() {
    var els = document.querySelectorAll('div[seat]');
    Array.from(els).forEach(function (el) {
        el.addEventListener('mouseover', (e) => {
            el.style.transition = '0.1s';
            if (nowMode == 1) {
                el.style.boxShadow = 'rgb(255, 95, 95) 0px 0px 0px 5px';
            } else {
                el.style.boxShadow = 'rgb(69, 52, 218) 0px 0px 0px 5px';
            }
        });
        el.addEventListener('mouseout', (e) => {
            el.style.transition = '1s';
            el.style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
        });
    });
}

var seats = [];

function formatSeat() {
    getel('content').innerHTML = '';
    getel('nameList').innerHTML = '';

    var ids = 1

    for (let i = 1; i <= a; i++) {
        for (let j = 1; j <= b; j++) {
            if (pinnedSeat.indexOf(`a${i} b${j}`) == -1) {
                if (seats[ids - 1]) {
                    getel('content').innerHTML += `<div seat='true' class='a${i} b${j}' id='${ids}' onclick='changeSeat(${ids});'>${seats[ids - 1]}</div>`;
                    getel('nameList').innerHTML += `<li onclick='removeSeat(${ids - 1});'>${seats[ids - 1]}</li>`;
                } else {
                    getel('content').innerHTML += `<div seat='true' class='a${i} b${j}' id='${ids}' onclick='changeSeat(${ids});'></div>`;
                }
            } else {
                if (seats[ids - 1]) {
                    getel('content').innerHTML += `<div seat='true' class='a${i} b${j} pin' id='${ids}' onclick='changeSeat(${ids});'>${seats[ids - 1]}</div>`;
                    getel(ids).style.backgroundColor = 'rgba(255, 95, 95, 0.5)';
                    getel('nameList').innerHTML += `<li onclick='removeSeat(${ids - 1});'>${seats[ids - 1]}</li>`;
                } else {
                    getel('content').innerHTML += `<div seat='true' class='a${i} b${j} pin' id='${ids}' onclick='changeSeat(${ids});'></div>`;
                    getel(ids).style.backgroundColor = 'rgba(255, 95, 95, 0.5)';
                }
            }
            ids++;
        }
    }
    setHover();
}

var isSaveload = true;

function formatVars(_a, _b) {
    a = _a;
    b = _b;
    all = a * b;
    
    document.documentElement.style.setProperty('--num3', b);
    document.documentElement.style.setProperty('--num4', a);

    if (b == 4) {
        isSaveload = false;
        document.getElementsByClassName('save')[0].style.display = 'none';
        document.getElementsByClassName('load')[0].style.display = 'none';
        document.getElementsByClassName('save')[0].style.marginLeft = '135px';
        document.getElementsByClassName('load')[0].style.marginLeft = '225px';
        document.getElementsByClassName('wid')[0].style.display = 'none';
        document.getElementsByClassName('hei')[0].style.display = 'none';
        document.getElementsByClassName('wid')[0].style.marginRight = '225px';
        document.getElementsByClassName('hei')[0].style.marginRight = '135px';
    }

    formatSeat();
}

formatVars(6, 4);

function getel(e) {
    return document.getElementById(e)
}

var isSLMenuOpen = false;

function openSLMenu() {
    if (!isSLMenuOpen) {
        document.getElementsByClassName('saveload')[0].style.boxShadow = 'rgb(69, 52, 218) 0px 0px 0px 5px';
        document.getElementsByClassName('save')[0].style.display = 'block';
        document.getElementsByClassName('load')[0].style.display = 'block';
        getel('slMenuCover').style.display = 'block';

        isSLMenuOpen = true;    
        if (isWHMenuOpen) {
            openWHMenu();
        }
    } else {
        document.getElementsByClassName('saveload')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
        document.getElementsByClassName('save')[0].style.display = 'none';
        document.getElementsByClassName('load')[0].style.display = 'none';
        getel('slMenuCover').style.display = 'none';

        isSLMenuOpen = false;    
    }
}

var isWHMenuOpen = false;

function openWHMenu() {
    if (!isWHMenuOpen) {
        document.getElementsByClassName('widhei')[0].style.boxShadow = 'rgb(69, 52, 218) 0px 0px 0px 5px';
        document.getElementsByClassName('wid')[0].style.display = 'block';
        document.getElementsByClassName('hei')[0].style.display = 'block';
        getel('whMenuCover').style.display = 'block';

        isWHMenuOpen = true;    
        if (isSLMenuOpen) {
            openSLMenu();
        }
    } else {
        document.getElementsByClassName('widhei')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
        document.getElementsByClassName('wid')[0].style.display = 'none';
        document.getElementsByClassName('hei')[0].style.display = 'none';
        getel('whMenuCover').style.display = 'none';

        isWHMenuOpen = false;    
    }
}

function setSeat() {
    var list = document.querySelectorAll('div[seat]');

    for (let i = 0; i < list.length; i++) {
        var e = list[i];
        if (e.classList[2] != 'pin') {
            e.className = '';
            e.classList.add('dispenser');    
        }
    }

    setTimeout(() => {
        var _seats = [];

        for (let i = 1; i <= a; i++) {
            for (let j = 1; j <= b; j++) {
                if (!document.getElementsByClassName(`a${i} b${j} pin`)[0]) {
                    _seats.push(['a' + i, 'b' + j]);
                }
            }
        }

        for (let i = 0; i < all; i++) {
            (function (x) {
                setTimeout(function () {
                    var r = Math.floor(Math.random() * _seats.length);
                    if (getel(i + 1).classList[2] != 'pin') {
                        var seat = _seats[r];
                        getel(i + 1).classList.remove('dispenser');
                        getel(i + 1).classList.add(seat[0], seat[1]);  
                        _seats.splice(r, 1);  
                    }
                    if (i == all - 1) {
                        setTimeout(() => {
                            seats = [];
                            for (let i = 1; i <= a; i++) {
                                for (let j = 1; j <= b; j++) {
                                    seats.push(document.getElementsByClassName(`a${i} b${j}`)[0].innerHTML);
                                }
                            }
                            formatSeat();
                        }, 1000);
                    }
                }, 150 * x);
            })(i);
        }

    }, 1000);
}

getel('nameInput').addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        if (getel('nameInput').value != '') {
            seats.push(getel('nameInput').value);
            // seats.sort();
            getel('nameInput').value = '';
            formatSeat();
        }
    }
});

var isPopup = false;

function option() {
    if (!isPopup) {
        getel('popup').style.height = `${a * 110 + 130}px`;
        getel('nameOuter').style.height = `${a * 110 - 50}px`;
        getel('nameList').style.height = `${a * 110 - 80}px`;
        getel('nameInput').style.display = 'inline';
        if (isSaveload) {
            document.getElementsByClassName('save')[0].style.display = 'block';
            document.getElementsByClassName('load')[0].style.display = 'block';
            document.getElementsByClassName('wid')[0].style.display = 'block';
            document.getElementsByClassName('hei')[0].style.display = 'block';   
        } else {
            document.getElementsByClassName('saveload')[0].style.display = 'block';    
            document.getElementsByClassName('widhei')[0].style.display = 'block';    
        }
         

        isPopup = true;
    } else {
        getel('popup').style.height = '0';
        getel('nameOuter').style.height = '0';
        getel('nameList').style.height = '0';

        setTimeout(() => {
            getel('nameInput').style.display = 'none';
            document.getElementsByClassName('save')[0].style.display = 'none';
            document.getElementsByClassName('load')[0].style.display = 'none';
            document.getElementsByClassName('saveload')[0].style.display = 'none';
            document.getElementsByClassName('saveload')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
            document.getElementsByClassName('wid')[0].style.display = 'none';
            document.getElementsByClassName('hei')[0].style.display = 'none';    
            document.getElementsByClassName('widhei')[0].style.display = 'none';
            document.getElementsByClassName('widhei')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
    
            isSLMenuOpen = false;
            getel('slMenuCover').style.display = 'none';
            isWHMenuOpen = false;
            getel('whMenuCover').style.display = 'none';
        }, 150);

        isPopup = false;
    }
    getel('nameInput').select();
}

function saveSeats() {
    var blob = new Blob([seats], { type: 'text/plain' });
    objURL = window.URL.createObjectURL(blob);

    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
    var a = document.createElement('a');
    a.download = '자리배치';
    a.href = objURL;
    a.click();
}

function loadSeats(file) {
    var reader = new FileReader();
    reader.onload = function () {
        seats = reader.result.split(',');
        formatSeat();
    };
    reader.readAsText(file);
}

function openTextFile() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain";
    input.onchange = function (event) {
        loadSeats(event.target.files[0]);
    };
    input.click();
}

function removeSeat(n) {
    seats.splice(n, 1);
    formatSeat();
}

var nowMode = 0;

function changeMode() {
    if (nowMode == 0) {
        document.documentElement.style.setProperty('--mode', '\'모드: 자리고정\'');
        document.getElementsByClassName('mode')[0].innerHTML = '<i class="fa-solid fa-thumbtack"></i>';    
        nowMode = 1;

        getel(selectedSeat).style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        formatSeat();
        selectedSeat = '';
        isSelectSeat = false;

    } else if (nowMode == 1) {
        // document.documentElement.style.setProperty('--mode', '\'모드: 이름변경\'');
        // document.getElementsByClassName('mode')[0].innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';    
        // nowMode = 2;
        document.documentElement.style.setProperty('--mode', '\'모드: 자리변경\'');
        document.getElementsByClassName('mode')[0].innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';    
        nowMode = 0;
    } else {
        document.documentElement.style.setProperty('--mode', '\'모드: 자리변경\'');
        document.getElementsByClassName('mode')[0].innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';    
        nowMode = 0;
    }
    setHover();
}

var nowWid = 5;
var nowHei = 5;

function changeWid() {
    nowWid ++;
    if (nowWid == 6) {
        nowWid = 4;
    }
    formatVars(nowHei, nowWid);
}

function changeHei() {
    nowHei ++;
    if (nowHei == 7) {
        nowHei = 4;
    }
    formatVars(nowHei, nowWid);
}