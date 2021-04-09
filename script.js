const timers = [
    ["Дембель Сани", "Dec 05, 2021 09:00:00"],
    ["Дембель Карима", "June 02, 2021 09:00:00"],
    ["Конец командировки Максима", "Feb 20, 2021 20:00:00"]
];

function timerTick() {
    timers.forEach((element, index) => {
        const currentDate = new Date().getTime();
        const endDate = new Date(element[1]);

        const diff = endDate - currentDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const div = `
            <div class="countdown">
                <div class="countdown-title">${element[0]}</div>
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
        const div_timeout = `
            <div class="countdown">
                <div class="countdown-title">${element[0]}</div>
                <div class="countdown-numbers">
                    <div class="countdown-number">
                        <span class="days countdown-time">Случилось!</span>
                    </div>
                </div>
            </div>
            <br>
        `;

        if (index === 0) {
            if (diff > 0)
                document.getElementById("placeholder").innerHTML = div;
            else
                document.getElementById("placeholder").innerHTML = div_timeout;
        } else {
            if (diff > 0)
                document.getElementById("placeholder").insertAdjacentHTML("beforeend", div);
            else
                document.getElementById("placeholder").insertAdjacentHTML("beforeend", div_timeout);
        }
    });
}

function setTimer() {
    timerTick();
    setInterval(timerTick, 1000);
}

document.addEventListener("DOMContentLoaded", setTimer);
