// Global Variables
// These are for the various functions to access them throughout the game. THey get referenced mainly to set speech cycles and 
let knightName = "";
let letter1 = "";
let letter2 = "";
let letter3 = "";

// Button element event listeners
// Once the DOM is loaded, all the buttons throughout the game will have an event listener and will be directed to the corresponding function
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("id") === "start-game-button") {
                changeSection(this);
            }
        })
    }
})

// Global JavaScript code. The following apply throughout the whole game and are used for multiple sections
/**
 * The changing section function
 * This is the first thing a player does. They input their name, and it gets stored to the global variable knightName
 */
function changeSection(e) {
    console.log(e);
    let currentLink = e.getAttribute("data-current-page-id");
    let nextLink = e.getAttribute("data-next-page-id");
    console.log(currentLink);
    console.log(nextLink);
    document.getElementById(nextLink).classList.remove("hidden");
    document.getElementById(currentLink).classList.add("hidden");
    if (nextLink === "loading-area") {
        loadingScreen(currentLink);
    }
}

/**
 * The loading screen function
 * This is reused every time a player moves from one area to the next
 */
function loadingScreen(loadingTextChange) {
    const hero = document.getElementById("hero");
    let heroWidth = parseInt(hero.style.width);
    let width = parseInt(document.getElementById("loading-area").offsetWidth);
    let position = 0;
    let maxPosition = 20;
    hero.style.left = 3 + "px";
    hero.style.bottom = 10 + "px";
    document.getElementById("loading-link").innerHTML = '';
    const heading = document.getElementById("loading-text");
    if (loadingTextChange = "front-page") {
        heading.innerHTML = "SEARCHING FOR DANGER<br>...";
    } else {
        heading.innerHTML = "LOADING<br>...";
    }
    const loadingAnimation = setInterval(function () {
        position++;
        hero.style.left = (width / maxPosition * position - ((heroWidth / maxPosition) * position)) + "px";
        if (position % 2 === 0) {
            hero.setAttribute("src", "assets/images/sprite-hero-still-right.png");
        } else if (position % 2 === 1) {
            hero.setAttribute("src", "assets/images/sprite-hero-walk-right.png");
            heading.innerText = heading.innerText + ".";
        }
        if (position === maxPosition) {
            clearInterval(loadingAnimation);
            hero.style.right = 3 + "px";
            hero.style.left = "";
            document.getElementById("loading-link").innerHTML += '<a href="#" onclick="changeDiv(this);" id="to-hub-area-button" data-current-page-id="loading-area" data-next-page-id="game-hub-area">You hear a scream. Click here to explore</a>';
            hero.style.bottom = parseInt(hero.style.bottom) + 18.4 + "px";
        }
    }, 250)
}


// Front page code
/**
 * The naming of the knight function
 * This is the first thing a player does. They input their name, and it gets stored to the global variable knightName
 */
document.getElementById("knight-name-container").addEventListener("submit", function (e) {
    e.preventDefault();
    knightName = document.getElementById("knight-name").value;
    if (knightName === "") {
        alert("You must give your knight a name so the masses can recognise you across the land (and so we know what to put on your gravestone)");
        return;
    }
    console.log(knightName);
    document.getElementById("knight-name-container").innerHTML = `<p>Knight ${knightName} is ready for action!<br>Click below to start being a hero</p>`;
    document.getElementById("start-game-button").classList.remove("hidden");
})

// Game hub area code
/**
 * The text area function specifically for the game hub area
 * This will carry out all combinations of the text area copy in the correct order and based on the corect text tree. The number within the text cycle custom attribute will also change various elements visually
 */


















// Challenge one area code
/**
 * The text area function specifically for challenge one
 * This will carry out all combinations of the text area copy in the correct order and based on the corect text tree. The number within the text cycle custom attribute will also change various elements visually
 */



/**
 * Challenge one game function
 */



















// Challenge two area code
/**
 * The text area function specifically for challenge two
 * This will carry out all combinations of the text area copy in the correct order and based on the corect text tree. The number within the text cycle custom attribute will also change various elements visually
 */



/**
 * Challenge two game function
 */



























// Challenge three area code
/**
 * The text area function specifically for challenge three
 * This will carry out all combinations of the text area copy in the correct order and based on the corect text tree. The number within the text cycle custom attribute will also change various elements visually
 */



/**
 * Challenge three game function
 */























// Challenge four area code
/**
 * The text area function specifically for challenge four
 * This will carry out all combinations of the text area copy in the correct order and based on the corect text tree. The number within the text cycle custom attribute will also change various elements visually
 */



/**
 * Challenge four game function
 */

























// Final area code