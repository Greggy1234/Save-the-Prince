const validPaths = ["/Save-the-Prince/", "/Save-the-Prince/index.html", "/index.html"];
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const isKnown = validPaths.includes(currentPath);
    if (!isKnown) {
        if (window.location.hostname === "127.0.0.1") {
            window.location.replace("/index.html");
        } else if (window.location.hostname === "greggy1234.github.io") {
            window.location.replace("/Save-the-Prince/");
        }
    }
})