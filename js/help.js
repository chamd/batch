function openHelp(n) {
    if (getel(`hp${n}c`).style.display == 'block') {
        closeHelp(n);
    } else {
        var hcs = document.getElementsByClassName('helpcontent');
        for (let i = 0; i < hcs.length; i++) {
            if (hcs[i].style.display == 'block') {
                closeHelp(i + 1);
            }
        }
        getel(`hp${n}c`).style.display = 'block';
        document.querySelector(`#hp${n} span`).innerHTML = '<i class="fa-solid fa-angle-up"></i>';
    }
    if (getel(`hp5c`).style.display == 'block') {
        getel(`hp5`).style.borderBottom = '2px solid rgb(156, 156, 156)';
        getel(`hp5c`).style.borderBottom = 'none';
    } else if (getel(`hp5c`).style.display == 'none') {
        getel(`hp5`).style.borderBottom = 'none';
        getel(`hp5c`).style.borderBottom = '2px solid rgb(156, 156, 156)';
    }
}

function closeHelp(n) {
    getel(`hp${n}c`).style.display = 'none';
    document.querySelector(`#hp${n} span`).innerHTML = '<i class="fa-solid fa-angle-down"></i>';

}