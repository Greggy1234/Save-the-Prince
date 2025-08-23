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
        let changeSectionOptions = ["start-game-button", "to-hub-area-button"]
        button.addEventListener("click", function () {
            if (changeSectionOptions.includes(this.getAttribute("id"))) {
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
    let heroWidth = parseInt(document.getElementById("hero").offsetWidth);
    let width = parseInt(document.getElementById("loading-area").offsetWidth);
    let position = 0;
    let maxPosition = 20;
    hero.classList.add("hero-left-position-left");
    hero.style.bottom = 10 + "px";
    document.getElementById("loading-link").classList.add("hidden");
    const heading = document.getElementById("loading-text");
    if (loadingTextChange = "front-page") {
        heading.innerHTML = "SEARCHING FOR DANGER<br>...";
    } else {
        heading.innerHTML = "LOADING<br>...";
    }
    const loadingAnimation = setInterval(function () {
        position++;
        hero.style.left = ((width / maxPosition) * position - ((heroWidth / maxPosition) * position)) + "px";
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
            hero.classList.remove("hero-left-position-left");
            document.getElementById("loading-link").classList.remove("hidden");
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

function speechUpdateGameHub() {
            let npcSpeakerName = document.getElementById("npc-speaker-name");
            let gameHubTextArea = document.getElementById("game-hub-text-area");
            let hubAreaButton = document.getElementById("hub-area-action-button");
            let npc = document.getElementById("npc");
            if (npc.getAttribute("data-npc-text-tree") === "A") {
                switch (parseInt(npc.getAttribute("data-npc-text-cycle"))) {
                    case 1:
                        gameHubTextArea.innerText = `Oh thank god you showed up knight ${knightName}!                        
                        My name's Eric, and this is the Grasslands. Something awful has happened`;
                        hubAreaButton.innerText = "Next";
                        npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                        npcSpeakerName.style.display = "block";
                        break;
                    case 2:
                        gameHubTextArea.innerText = `...you're a lot shorter than I thought you would be.`;
                        npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                        npcSpeakerName.innerText = "Eric:";
                        document.getElementById("game-hub-area-text").innerText = "The Grasslands"
                        break;
                    case 3:
                        gameHubTextArea.innerText = `Anyway, the prince has been locked away by 4 awful monsters.`;
                        npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                        break;
                    case 4:
                        gameHubTextArea.innerText = `You have to complete the challenges these monsters have set to save him.`;
                        npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                        break;
                    case 5:
                        gameHubTextArea.innerText = `You can complete the first 3 challenges in any order, and each one grants a letter. Once you get all 3 letters, you can unlock the door to the fourth and final challenge.`;
                        npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                        break;
                    case 6:
                        gameHubTextArea.innerText = `Challenge 1 is in the minotaur's lava domain. You have to copy his patterns to confuse him.`;
                        npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                        document.getElementById("game-one-hub-area").style.backgroundColor = "red";
                        break;
                    case 7:
                        gameHubTextArea.innerText = `Challenge 2 is the penguin's maths game held in his ice domain. If you can prove you're good enough at quick maths, he'll give you his letter.`;
                        npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                        document.getElementById("game-two-hub-area").style.backgroundColor = "blue";
                        break;
                    case 8:
                        gameHubTextArea.innerText = `If you can avoid the attacks being thrown at you in challenge 3, you'll get the rock golem's letter.`;
                        npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                        document.getElementById("game-three-hub-area").style.backgroundColor = "yellow";
                        break;
                    case 9:
                        gameHubTextArea.innerText = `That's the end of my info du- I mean explanation of the challenges. 
                        Please hurry. I'm terrified of what's happening to our dear prince!`;
                        npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                        break;
                    case 10:
                        gameHubTextArea.innerText = `You've found your danger knight ${knightName}. Are you up for the challenge? 
                        (If you're not you can just exit the game)`;
                        npcSpeakerName.style.display = "none";
                        hubAreaButton.innerText = "Yes. I'm ready for the challenge";
                        npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                        break;
                    case 11:
                        gameHubTextArea.innerText = `Excellent! When you're ready, Choose one of the 3 available options above for your first challenge`;
                        hubAreaButton.style.display = "none";
                        break;
                }
            }
        }
















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