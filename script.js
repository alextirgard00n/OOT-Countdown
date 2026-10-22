const daysEl = document.querySelector(".days");
const hoursEl = document.querySelector(".hours");
const minsEl = document.querySelector(".mins");
const secondsEl = document.querySelector(".seconds");
const headlineEl = document.querySelector(".headline");
const dateEl = document.querySelector(".date");

// local midnight on release day (month is 0-indexed, so 10 = November)
const releaseDate = new Date(2026, 10, 5).getTime();

function setNumber(el, value) {
    const text = String(value);
    if (el.innerText !== text) {
        el.innerText = text;
        animateCSS(el);
    }
}

function countdown() {
    const distance = releaseDate - Date.now();

    // release day: stop at zero instead of going negative
    if (distance <= 0) {
        [daysEl, hoursEl, minsEl, secondsEl].forEach((el) => (el.innerText = "0"));
        headlineEl.innerText = "Out Now on Nintendo Switch 2";
        dateEl.innerText = "Released November 5th, 2026";
        clearInterval(timer);
        return;
    }

    setNumber(daysEl, Math.floor(distance / (1000 * 60 * 60 * 24)));
    setNumber(hoursEl, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setNumber(minsEl, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setNumber(secondsEl, Math.floor((distance % (1000 * 60)) / 1000));
}

function animateCSS(element) {
    element.classList.remove("animation");
    void element.offsetWidth; // restart the animation
    element.classList.add("animation");
}

const timer = setInterval(countdown, 1000);
countdown();
