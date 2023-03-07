var a;
var b;
var all;

var isSelectSeat = false;
var selectedSeat;
var pinnedSeat = [];

function changeSeat(n) {
    if (canChangeSeat) {
        if (nowMode == 0) {
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
        } else if (nowMode == 1) {
            if (getel(n).classList[2] != 'pin') {
                getel(n).style.backgroundColor = 'rgba(255, 251, 37, 0.5)';
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
        } else if (nowMode == 2) {
            if (seats[n - 1] != undefined && seats[n - 1] != '') {
                seats[n - 1] = '';
                formatSeat();
            } else if (seats[n - 1] == '') {
                confirmBox('주의!', '공백을 삭제하시겠습니까?<br><span>(공백 삭제시 자리가 한칸씩 당겨짐)</span>', 'none', '예', '아니요', (res) => {
                    if (res) {
                        seats.splice(n - 1, 1);
                        formatSeat();
                    }
                });
            }
        } else if (nowMode == 3) {
            while (seats[n - 1] == undefined) {
                seats.push('');
            }
            confirmBox('이름 변경', '변경할 이름은?', 'block', '수정', '취소', (res, input) => {
                if (res) {
                    seats[n - 1] = input;
                    formatSeat();
                }
            });
        }
    }
}

function setHover() {
    var els = document.querySelectorAll('div[seat]');
    Array.from(els).forEach(function (el) {
        el.addEventListener('mouseover', (e) => {
            el.style.transition = '0.1s';
            if (nowMode == 0) {
                el.style.boxShadow = 'rgb(69, 52, 218) 0px 0px 0px 5px';
            } else if (nowMode == 1) {
                el.style.boxShadow = 'rgb(255, 251, 37) 0px 0px 0px 5px';
            } else if (nowMode == 2) {
                el.style.boxShadow = 'rgb(255, 95, 95) 0px 0px 0px 5px';
            } else {
                el.style.boxShadow = 'rgb(0, 0, 0) 0px 0px 0px 5px';
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
    // getel('nameList').innerHTML = '';

    var ids = 1

    for (let i = 1; i <= a; i++) {
        for (let j = 1; j <= b; j++) {
            detectBlank(ids - 1, 0);
            if (pinnedSeat.indexOf(`a${i} b${j}`) == -1) {
                if (seats[ids - 1]) {
                    getel('content').innerHTML += `<div seat='true' class='a${i} b${j}' id='${ids}' onclick='changeSeat(${ids});'>${seats[ids - 1]}</div>`;
                    // getel('nameList').innerHTML += `<li onclick='removeSeat(${ids - 1});'>${seats[ids - 1]}</li>`;
                } else {
                    getel('content').innerHTML += `<div seat='true' class='a${i} b${j}' id='${ids}' onclick='changeSeat(${ids});'></div>`;
                    // getel('nameList').innerHTML += `<li onclick='removeSeat(${ids - 1});'>[_____]</li>`;
                }
            } else {
                if (seats[ids - 1]) {
                    getel('content').innerHTML += `<div seat='true' class='a${i} b${j} pin' id='${ids}' onclick='changeSeat(${ids});'>${seats[ids - 1]}</div>`;
                    getel(ids).style.backgroundColor = 'rgba(255, 251, 37, 0.5)';
                    // getel('nameList').innerHTML += `<li onclick='removeSeat(${ids - 1});'>${seats[ids - 1]}</li>`;
                } else {
                    getel('content').innerHTML += `<div seat='true' class='a${i} b${j} pin' id='${ids}' onclick='changeSeat(${ids});'></div>`;
                    getel(ids).style.backgroundColor = 'rgba(255, 251, 37, 0.5)';
                    // getel('nameList').innerHTML += `<li onclick='removeSeat(${ids - 1});'>[_____]</li>`;
                }
            }
            ids++;
        }
    }
    setHover();
}

function formatVars(_a, _b) {
    a = _a;
    b = _b;
    all = a * b;

    document.documentElement.style.setProperty('--num3', b);
    document.documentElement.style.setProperty('--num4', a);

    formatSeat();
}

formatVars(5, 5);

function detectBlank(n, _b) {
    if (seats[n] == '' || seats[n] == undefined) {
        if (n == all - 1) {
            seats.splice(n - _b, _b + 1);
        } else {
            detectBlank(n + 1, _b + 1);
        }
    }
}

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

var canChangeSeat = true;

function setSeat() {
    if (canChangeSeat) {
        if (getel(selectedSeat)) getel(selectedSeat).style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        selectedSeat = '';
        isSelectSeat = false;

        if (isSettingOpen) {
            openSetting();
        }

        canChangeSeat = false;
        document.getElementsByClassName('btn1')[0].style.boxShadow = 'rgb(255, 95, 95) 0px 0px 0px 5px';
        document.getElementsByClassName('mode')[0].style.boxShadow = 'rgb(255, 95, 95) 0px 0px 0px 5px';
        document.getElementsByClassName('btn2')[0].style.boxShadow = 'rgb(255, 95, 95) 0px 0px 0px 5px';
        document.getElementsByClassName('setting')[0].style.boxShadow = 'rgb(255, 95, 95) 0px 0px 0px 5px';

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
                                canChangeSeat = true;
                                document.getElementsByClassName('btn1')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
                                document.getElementsByClassName('mode')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
                                document.getElementsByClassName('btn2')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
                                document.getElementsByClassName('setting')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
                            }, 1000);
                        }
                    }, 150 * x);
                })(i);
            }

        }, 1000);

    }
}

getel('nameInput').addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        if (getel('nameInput').value != '') {
            if (seats.length >= all) {
                confirmBox('주의!', '자리가 꽉 찼습니다.<br>공백을 채우시겠습니까?<br><span>(공백이 없을시 그냥 넘어감)</span>', 'none', '예', '아니요', (res) => {
                    if (res) {
                        for (let i = 0; i < seats.length; i++) {
                            if (seats[i] == undefined || seats[i] == '') {
                                seats[i] = getel('nameInput').value
                                break;
                            }
                        }
                    }
                    getel('nameInput').value = '';
                    formatSeat();
                });
            } else {
                seats.push(getel('nameInput').value);
                getel('nameInput').value = '';
                formatSeat();
            }
        }
    }
});

var isPopup = false;

function option() {
    if (canChangeSeat) {
        if (!isPopup) {
            getel('popup').style.height = `${a * 110 + 130}px`;
            getel('nameOuter').style.height = `${a * 110 - 50}px`;
            getel('nameList').style.height = `${a * 110 - 80}px`;
            getel('nameInput').style.display = 'inline';
            document.getElementsByClassName('saveload')[0].style.display = 'block';
            document.getElementsByClassName('widhei')[0].style.display = 'block';

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
    if (seats[n] == undefined || seats[n] == '') {
        seats.splice(n, 1);
        formatSeat();
    } else {
        seats[n] = '';
        formatSeat();
    }
}

var nowMode = 0;

function changeMode() {
    if (canChangeSeat) {
        if (nowMode == 0) {
            document.documentElement.style.setProperty('--mode', '\'모드: 자리고정\'');
            document.getElementsByClassName('mode')[0].innerHTML = '<i class="fa-solid fa-thumbtack"></i>';
            nowMode = 1;

            if (getel(selectedSeat)) getel(selectedSeat).style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            formatSeat();
            selectedSeat = '';
            isSelectSeat = false;
        } else if (nowMode == 1) {
            document.documentElement.style.setProperty('--mode', '\'모드: 자리삭제\'');
            document.getElementsByClassName('mode')[0].innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            nowMode = 2;
        } else if (nowMode == 2) {
            document.documentElement.style.setProperty('--mode', '\'모드: 이름변경\'');
            document.getElementsByClassName('mode')[0].innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            nowMode = 3;
        } else {
            document.documentElement.style.setProperty('--mode', '\'모드: 자리변경\'');
            document.getElementsByClassName('mode')[0].innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';
            nowMode = 0;
        }
        setHover();
    }
}

var nowWid = 5;
var nowHei = 5;

function changeWid() {
    nowWid++;
    document.documentElement.style.setProperty('--num5', '0');
    if (nowWid == 6) {
        document.documentElement.style.setProperty('--num5', '-1');
    } else if (nowWid == 7) {
        nowWid = 4;
        document.documentElement.style.setProperty('--num5', '1');
    }
    formatVars(nowHei, nowWid);

    // document.getElementsByClassName('wid')[0].innerHTML = `<i class="fa-solid fa-${nowWid}"></i>`;
    document.documentElement.style.setProperty('--whw', `\'가로: ${nowWid}\'`);
}

function changeHei() {
    nowHei++;
    if (nowHei == 7) {
        nowHei = 4;
    }
    formatVars(nowHei, nowWid);

    // document.getElementsByClassName('hei')[0].innerHTML = `<i class="fa-solid fa-${nowHei}"></i>`;
    document.documentElement.style.setProperty('--whh', `\'세로: ${nowHei}\'`);
    getel('popup').style.height = `${a * 110 + 130}px`;
    getel('nameOuter').style.height = `${a * 110 - 50}px`;
    getel('nameList').style.height = `${a * 110 - 80}px`;
}

function closeMenus() {
    document.getElementsByClassName('widhei')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
    document.getElementsByClassName('wid')[0].style.display = 'none';
    document.getElementsByClassName('hei')[0].style.display = 'none';
    getel('whMenuCover').style.display = 'none';

    isWHMenuOpen = false;

    document.getElementsByClassName('saveload')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
    document.getElementsByClassName('save')[0].style.display = 'none';
    document.getElementsByClassName('load')[0].style.display = 'none';
    getel('slMenuCover').style.display = 'none';

    isSLMenuOpen = false;
}

function confirmBox(title, msg, input, ok, no, f) {
    getel('confirmBlack').style.display = 'block';
    getel('confirm').style.display = 'block';
    getel('confirmInput').style.display = input;
    getel('confirmTitle').innerHTML = title;
    getel('confirmMessage').innerHTML = msg;
    getel('confirmOk'). innerHTML = ok;
    getel('confirmNo'). innerHTML = no;
    getel('confirmInput').value = '';
    getel('nameInput').blur();

    getel('confirmOk').addEventListener('click', () => {
        if (input == 'none') {
            f(true);
        } else {
            f(true, getel('confirmInput').value);
        }
        getel('confirmBlack').style.display = 'none';
        getel('confirm').style.display = 'none';
        return;
    }, { once: true });

    getel('confirmNo').addEventListener('click', () => {
        f(false);
        getel('confirmBlack').style.display = 'none';
        getel('confirm').style.display = 'none';
        return;
    }, { once: true });

}

function openHtml(name) {
    getel('indexHtml').style.display = 'none';
    getel('helpHtml').style.display = 'none';
    getel('logHtml').style.display = 'none';

    getel(`${name}Html`).style.display = 'block';
    if (name == 'log') {
        document.getElementsByClassName('adBanner')[0].top = '305px';
    } else {
        document.getElementsByClassName('adBanner')[0].top = '0px';
    }

}

// function enterkey() {
// 	if (window.event.keyCode == 13) {
//     	alert("test");
//     }
// }