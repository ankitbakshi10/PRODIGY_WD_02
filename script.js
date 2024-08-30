const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const lapClearButton = document.getElementsByClassName("lap-clear")[0];
const second = document.getElementsByClassName("sec")[0];
const minute = document.getElementsByClassName("minute")[0];
const msec = document.getElementsByClassName("msec")[0];
const lapsContainer = document.querySelector(".laps");

let isPlaying = false;
let sec = 0;
let min = 0;
let ms = 0;
let timerInterval;

const toggleButtonVisibility = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
    lapClearButton.classList.remove("hidden");
}

const play = () => {
    if (!isPlaying) {
        playButton.innerHTML = 'Pause';
        startTimer();
        isPlaying = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(timerInterval);
        isPlaying = false;
    }
    toggleButtonVisibility();
}

const startTimer = () => {
    timerInterval = setInterval(() => {
        ms++;
        if (ms == 100) {
            ms = 0;
            sec++;
        }
        if (sec == 60) {
            sec = 0;
            min++;
        }
        updateDisplay();
    }, 10);
}

const updateDisplay = () => {
    msec.innerHTML = ms < 10 ? "0" + ms : ms;
    second.innerHTML = sec < 10 ? "0" + sec : sec;
    minute.innerHTML = min < 10 ? "0" + min : min;
}

const reset = () => {
    clearInterval(timerInterval);
    isPlaying = false;
    sec = 0;
    min = 0;
    ms = 0;
    updateDisplay();
    playButton.innerHTML = 'Play';
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    lapClearButton.classList.add("hidden");
    lapsContainer.innerHTML = '';
}

const addLap = () => {
    const lapItem = document.createElement("li");
    lapItem.classList.add("lap-item");
    lapItem.innerHTML = `
        <span class="number">#${lapsContainer.getElementsByTagName("li").length + 1}</span>
        <span class="time-stamp"> ${minute.innerHTML} : ${second.innerHTML} : ${msec.innerHTML} </span>
    `;
    lapsContainer.insertBefore(lapItem, lapClearButton);
}

const clearLaps = () => {
    lapsContainer.innerHTML = '';
    lapClearButton.classList.add("hidden");
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", addLap);
lapClearButton.addEventListener("click", clearLaps);
