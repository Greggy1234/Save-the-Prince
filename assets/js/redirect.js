const validPaths = ["/", "/index.html"];
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const isKnown = validPaths.includes(currentPath);
    if (!isKnown) {
        window.location.replace("/index.html");
    }
})