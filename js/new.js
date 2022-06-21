var isNI = false;
var isSettingOpen = false;
var isSavesOpen = false;
var isLoadsOpen = false;

function toggleNameInput() {
    if (canChangeSeat) {
        if (!isNI) {
            getel('nameInput').style.display = 'inline';
            getel('closeNameInput').style.display = 'inline';
            getel('nameInputBlack').style.display = 'block';
            isNI = true;
        } else {
            getel('nameInput').style.display = 'none';
            getel('closeNameInput').style.display = 'none';
            getel('nameInputBlack').style.display = 'none';
            isNI = false;
        }
        getel('nameInput').select();

    }
}

function openSetting() {
    if (canChangeSeat) {
        if (!isSettingOpen) {
            document.getElementsByClassName('setting')[0].style.boxShadow = 'rgb(69, 52, 218) 0px 0px 0px 5px';
            var els = document.querySelectorAll('.st:not(.saves):not(.loads)');
            Array.from(els).forEach(function (el) {
                el.style.display = 'inline-block';
            });
            getel('stCover').style.display = 'inline-block';

            isSettingOpen = true;

        } else {
            document.getElementsByClassName('setting')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
            var els = document.querySelectorAll('.st:not(.saves):not(.loads)');
            Array.from(els).forEach(function (el) {
                el.style.display = 'none';
            });
            getel('stCover').style.display = 'none';

            isSettingOpen = false;
            if (isSavesOpen) {
                openSaves();
            }
            if (isLoadsOpen) {
                openLoads();
            }
        }
    }
}

function setSettings() {
    var els = document.querySelectorAll('.st:not(.saves):not(.loads)');
    for (let i = 0; i < els.length; i++) {
        const el = els[i];
        el.style.marginTop = `calc(220px + (90px * ${i}))`;
    }
}

setSettings();

function EsaveSeats() {
    var seatsTable = document.createElement('table');
    var seatsTbody = document.createElement('tbody');
    seatsTable.appendChild(seatsTbody);

    var seatsTr = {};
    var seatsTd = {};
    var tableids = 0;

    for (let i = 0; i < nowHei; i++) {
        seatsTr[i] = document.createElement('tr');
        seatsTbody.appendChild(seatsTr[i]);

        for (let j = 0; j < nowWid; j++) {
            seatsTd[j] = document.createElement('td');
            seatsTd[j].innerHTML = seats[tableids] ? seats[tableids] : 'ㅤ';
            seatsTr[i].appendChild(seatsTd[j]);
            tableids ++;
        }
    }

    var wb = XLSX.utils.table_to_book(seatsTable, {sheet:"seat",raw:true});
    XLSX.writeFile(wb, ('자리배치.xlsx'));
}


function EopenTextFile() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx";
    input.onchange = function (event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            var data = XLSX.read(reader.result, { type: 'binary' });
            var dataSeat = data.Sheets.seat;
            var temp = [];
            for (let i = 1; i < Object.keys(dataSeat).length; i++) {
                if (dataSeat[Object.keys(dataSeat)[i]].v != 'ㅤ') {
                    temp.push(dataSeat[Object.keys(dataSeat)[i]].v);
                } else {
                    temp.push('');
                }
            }
            seats = temp;
            formatSeat();
        };
        reader.readAsBinaryString(input.files[0]);
    };
    input.click();
}

function openSaves() {
    if (!isSavesOpen) {
        document.getElementsByClassName('save')[0].style.boxShadow = 'rgb(60, 218, 52) 0px 0px 0px 5px';
        var els = document.querySelectorAll('.saves');
        Array.from(els).forEach(function (el) {
            el.style.display = 'inline-block';
        });
        getel('savesCover').style.display = 'inline-block';

        isSavesOpen = true;

        if (isLoadsOpen) {
            openLoads();
        }
    } else {
        document.getElementsByClassName('save')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
        var els = document.querySelectorAll('.saves');
        Array.from(els).forEach(function (el) {
            el.style.display = 'none';
        });
        getel('savesCover').style.display = 'none';

        isSavesOpen = false;
    }
}

function openLoads() {
    if (!isLoadsOpen) {
        document.getElementsByClassName('load')[0].style.boxShadow = 'rgb(60, 218, 52) 0px 0px 0px 5px';
        var els = document.querySelectorAll('.loads');
        Array.from(els).forEach(function (el) {
            el.style.display = 'inline-block';
        });
        getel('loadsCover').style.display = 'inline-block';

        isLoadsOpen = true;

        if (isSavesOpen) {
            openSaves();
        }
    } else {
        document.getElementsByClassName('load')[0].style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
        var els = document.querySelectorAll('.loads');
        Array.from(els).forEach(function (el) {
            el.style.display = 'none';
        });
        getel('loadsCover').style.display = 'none';

        isLoadsOpen = false;
    }
}

function setSLs() {
    var elss = document.querySelectorAll('.saves');
    var elsl = document.querySelectorAll('.loads');
    for (let i = 0; i < elss.length; i++) {
        const el = elss[i];
        el.style.marginLeft = `calc((-451px + (75px * var(--num5))) + (90px * ${i + 1}))`;
    }
    for (let i = 0; i < elsl.length; i++) {
        const el = elsl[i];
        el.style.marginTop = `calc(220px + (90px * 1))`;
        el.style.marginLeft = `calc((-451px + (75px * var(--num5))) + (90px * ${i + 1}))`;
    }
}

setSLs();