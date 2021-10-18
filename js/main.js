// Select our DOM Elements
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const username = document.getElementById("username");
const userFocus = document.getElementById("focus");

// Buttons
const militaryButton = document.getElementById("show-military-time");
const amPmButton = document.getElementById("show-am-pm");

// Time display options
var showAmPm = localStorage.getItem("show-am-pm") === null
    ? true : localStorage.getItem("show-am-pm");
var showMilitaryTime = localStorage.getItem("show-military-time") === null
    ? false : localStorage.getItem("show-military-time");


// Show Time
const showTime = (repeat = true) => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    // Set AM or PM
    let amPM = hours >= 12 ? "PM" : "AM";

    // 12-hour format
    standardTime = hours % 12 || 12;

    // Output time
    time.innerHTML = `${showMilitaryTime ? hours : standardTime}:${appendZero(minutes)}:${appendZero(seconds)} ${showAmPm ? amPM : ''}`

    // Set repeating task
    if (repeat) setTimeout(showTime, 1000);
}

// Add zero to numbers less than 10
const appendZero = (num) => {
    return (parseInt(num, 10) < 10 ? '0' : '') + num;
}

// Set background and greeting
const setBackground = () => {
    let hour = 18;//new Date().getHours();

    if (hour < 12) {
        // Morning
        document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')"
        greeting.textContent = "Good Morning";
        document.body.style.color = "black";
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')"
        greeting.textContent = "Good Afternoon";
    } else {
        // Evening
        document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
        greeting.textContent = "Good Evening";
    }

    // Set repeating task
    setTimeout(setBackground, 60000);
}

// Get User Name
const getUsername = () => {
    if (localStorage.getItem("username") === null) {
        username.textContent = '[Enter Name]';
    } else {
        username.textContent = localStorage.getItem("username");
    }
}

// Set User Name
const setUsername = (event) => {
    if (event.type == "keypress") {
        // on key press
        if (event.which == 13 || event.keycode == 13) {
            username.blur();
        }
    } else {
        // on blur
        localStorage.setItem("username", event.target.innerHTML);
    }
}

// Get User Focus
const getFocus = () => {
    if (localStorage.getItem("focus") === null) {
        userFocus.textContent = '[Enter Focus]';
    } else {
        userFocus.textContent = localStorage.getItem("focus");
    }
}

// Set User Focus
const setFocus = (event) => {
    if (event.type == "keypress") {
        // on key press
        if (event.which == 13 || event.keycode == 13) {
            userFocus.blur();
        }
    } else {
        // on blur
        localStorage.setItem("focus", event.target.innerHTML);
    }
}

// Military Button Click
const onMilitaryClick = (event) => {
    showMilitaryTime = !showMilitaryTime;
    localStorage.setItem("show-military-time", showMilitaryTime);
    showTime(false);
}

// am / pm click
const onAmPmClick = (event) => {
    showAmPm = !showAmPm;
    localStorage.setItem("show-am-pm", showAmPm);
    showTime(false);
}

// Register event listeners
username.addEventListener("keypress", setUsername);
username.addEventListener("blur", setUsername);
userFocus.addEventListener("keypress", setFocus);
userFocus.addEventListener("blur", setFocus);
militaryButton.addEventListener("click", onMilitaryClick);
amPmButton.addEventListener("click", onAmPmClick);

// Run
showTime();
setBackground();
getUsername();
getFocus();