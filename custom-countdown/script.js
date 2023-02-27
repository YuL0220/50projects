// Container
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

// Countdown
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

// Complete
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeElBtn = document.getElementById('complete-button');

// Globle elements
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour) + 5;
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input 
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // populate countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}

// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(e)
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    // Check for valid date 
    if (countdownTitle === '') {
        alert('Please select a title for the countdown.')
    } else if (countdownDate === '') {
        alert('Please select a date for the countdown.');
    } else {
        //Get number version of current date, updateDOM
        localStorage.setItem('countdown', JSON.stringify(savedCountdown));

        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }

}

// Reset All values
function reset() {
    // hide countdowns, show input
    countdownEl.hidden = true;
    // hide complete element
    completeEl.hidden = true;
    // show input element
    inputContainer.hidden = false;
    // stop the countdown
    clearInterval(countdownActive);
    // reset values
    // countdownTitle = '';
    // countdownDate = '';
    document.querySelector('#title').value = '';
    document.querySelector('#date-picker').value = '';
    localStorage.removeItem('countdown');
}

// function restore previous countdown
function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}
// Event Listeners 
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeElBtn.addEventListener('click', reset);


// On Load, check local storage
restorePreviousCountdown();