document.addEventListener("DOMContentLoaded", function () {
    window.setTimeout(function () {
        if (window.location.hostname === "127.0.0.1") {
            window.location.replace("/index.html");
        } else {
            window.location.replace("/Save-the-Prince/");
        }
    }, 2000);
});