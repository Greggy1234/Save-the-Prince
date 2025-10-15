const validPaths = ["Save-the-Prince/", "Save-the-Prince/index.html"];
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const isKnown = validPaths.includes(currentPath);
    if (!isKnown) {
        window.location.replace("Save-the-Prince/");
    }
})