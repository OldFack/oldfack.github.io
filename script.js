const timers = [
    ["Дембель Карима", "June 02, 2021 09:00:00"],
    ["Дембель Сани", "Dec 06, 2021 09:00:00"],
    ["Новый год", "Jan 01, 2022 00:00:00"]
];

const birthdays = [
    ["Рома", "Feb 10"],
    ["Данил", "Mar 07"],
    ["Дима", "Apr 06"],
    ["Михаил", "Apr 13"],
    ["Саня", "Jun 18"],
    ["Володя", "Jul 13"],
    ["Максим", "Aug 28"],
    ["Тимур", "Nov 04"],
    ["Женя", "Nov 17"],
    ["Никита", "Nov 23"]
];

function getDiv(title, diff) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `
        <div class="countdown">
            <div class="countdown-title">${title}</div>
            <div class="countdown-numbers">
                <div class="countdown-number">
                    <span class="days countdown-time">${days}</span>
                    <span class="countdown-text">Дней</span>
                </div>
                <div class="countdown-number">
                    <span class="hours countdown-time">${hours}</span>
                    <span class="countdown-text">Часов</span>
                </div>
                <div class="countdown-number">
                    <span class="minutes countdown-time">${minutes}</span>
                    <span class="countdown-text">Минут</span>
                </div>
                <div class="countdown-number">
                    <span class="seconds countdown-time">${seconds}</span>
                    <span class="countdown-text">Секунд</span>
                </div>
            </div>
        </div>
        <br>
    `;
}

function getDivTimeout(title) {
    return `
        <div class="countdown">
            <div class="countdown-title">${title}</div>
            <div class="countdown-numbers">
                <div class="countdown-number">
                    <span class="days countdown-time">Случилось!</span>
                </div>
            </div>
        </div>
        <br>
    `;
}

function timerTick() {
    timers.forEach((element, index) => {
        const title = element[0];
        const currentDate = new Date().getTime();
        const endDate = new Date(element[1]);
        const diff = endDate - currentDate;

        if (index === 0) {
            if (diff > 0)
                document.getElementById("placeholder").innerHTML = getDiv(title, diff);
            else
                document.getElementById("placeholder").innerHTML = getDivTimeout(title);
        } else {
            if (diff > 0)
                document.getElementById("placeholder").insertAdjacentHTML("beforeend", getDiv(
                    title, diff
                ));
            else
                document.getElementById("placeholder").insertAdjacentHTML("beforeend", getDivTimeout(
                    title
                ));
        }
    });

    const nextYearBD = [];

    birthdays.forEach((element) => {
        const title = element[0]
        const currentDate = new Date().getTime();
        const birthday = new Date(element[1] + ", " + new Date().getFullYear());
        const diff = birthday - currentDate;

        // Birthday today
        if (new Date().getDate() === birthday.getDate() && new Date().getMonth() === birthday.getMonth()) {
            document.getElementById("placeholder").insertAdjacentHTML("beforeend", getDivTimeout(title));
        }
        // Birthday this year
        else if (currentDate < birthday) {
            document.getElementById("placeholder").insertAdjacentHTML("beforeend", getDiv(title, diff));
        }
        // Birthday was this year
        else if (currentDate > birthday) {
            const new_diff = new Date(element[1] + ", " + (new Date().getFullYear() + 1)) - currentDate;
            nextYearBD.push([title, new_diff]);
        }
    });

    nextYearBD.forEach(element => {
        const title = element[0];
        const diff = element[1];

        document.getElementById("placeholder").insertAdjacentHTML("beforeend", getDiv(title, diff));
    });
}

function setTimer() {
    timerTick();
    setInterval(timerTick, 1000);
}

document.addEventListener("DOMContentLoaded", setTimer);
