'use strict';

const MAIN_PLACHEHOLDER_ID = "main-countdown-placeholder";
const BIRTHDAY_PLACHEHOLDER_ID = "birthday-countdown-placeholder"

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

function getDiv(title, diff, date) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `
        <div class="countdown" title="${date}">
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

function insertInHTMLIf(element, html, condition) {
    if (condition) {
        element.innerHTML = html;
    } else {
        element.insertAdjacentHTML("beforeend", html);
    }
}

function mainTimerTick() {
    timers.forEach((timer, index) => {
        const title = timer[0];
        const currentDate = new Date().getTime();
        const endDate = new Date(timer[1]);
        const diff = endDate - currentDate;

        const html = diff > 0 ? getDiv(title, diff, timer[1]) : getDivTimeout(title);

        insertInHTMLIf(document.getElementById(MAIN_PLACHEHOLDER_ID), html, index === 0)
    });
}

function isToday(date) {
    return new Date().getDate() === date.getDate() && new Date().getMonth() === date.getMonth();
}

function birthdayTimerTick() {
    const todayBirthdays = [];
    const futureBirthdays = [];
    const pastBirthdays = [];

    birthdays.forEach((timer) => {
        const title = timer[0];
        const birthday_str = timer[1];
        const currentDate = new Date().getTime();
        const birthday = new Date(timer[1] + ", " + new Date().getFullYear());
        const diff = birthday - currentDate;

        // Birthday today
        if (isToday(birthday)) {
            todayBirthdays.push({title, diff: 0, birthday_str});
        }
        // Birthday this year
        else if (currentDate < birthday) {
            futureBirthdays.push({title, diff, birthday_str});
        }
        // Birthday was this year
        else if (currentDate > birthday) {
            const new_diff = new Date(timer[1] + ", " + (new Date().getFullYear() + 1)) - currentDate;
            pastBirthdays.push({title, diff: new_diff, birthday_str});
        }
    });

    let inserted = 0;
    todayBirthdays.forEach(({title}) => {
        insertInHTMLIf(
            document.getElementById(BIRTHDAY_PLACHEHOLDER_ID),
            getDivTimeout(title),
            inserted === 0);
        inserted++;
    })
    futureBirthdays.forEach(({title, diff, birthday_str}) => {
        insertInHTMLIf(
            document.getElementById(BIRTHDAY_PLACHEHOLDER_ID),
            getDiv(title, diff, birthday_str),
            inserted === 0);
        inserted++;
    })
    pastBirthdays.forEach(({title, diff, birthday_str}) => {
        insertInHTMLIf(
            document.getElementById(BIRTHDAY_PLACHEHOLDER_ID),
            getDiv(title, diff, birthday_str),
            inserted === 0);
        inserted++;
    })
}

function timerTick() {
    mainTimerTick()
    birthdayTimerTick()
}

function setTimer() {
    timerTick();
    setInterval(timerTick, 1000);
}

document.addEventListener("DOMContentLoaded", setTimer);

const tabs = Tabs();
