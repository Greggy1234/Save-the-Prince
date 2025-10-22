document.addEventListener("DOMContentLoaded", function () {
    const countdownSeconds = document.getElementById("countdown");
    let seconds = 5;
    const countdownTimer = setInterval(function () {
        seconds--;
        countdownSeconds.innerText = `${seconds}`;
        if (seconds === 0) {
            clearInterval(countdownTimer);
            if (window.location.hostname === "127.0.0.1") {
                window.location.replace("/index.html");
            } else {
                window.location.replace("/Save-the-Prince/");
            }
        }
    }
        , 1000)


});

