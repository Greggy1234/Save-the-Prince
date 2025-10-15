// Global Variables
// These are for the various functions to access them throughout the game. They get referenced by multiple functions throughout
const globalVars = {
    knightName: "",
    key1: false,
    key2: false,
    gameOneAnswer: [],
    gameTwoOptions: [],
    gameTwoSetAnswers: [],
    gameTwoPlayerAnswer: []
};

// Button element event listeners
// Once the DOM is loaded, all the buttons throughout the game will have an event listener and will be directed to the corresponding function
document.addEventListener("DOMContentLoaded", function () {
    const checkErrorPage = document.getElementById("error-page");
    if (document.body.contains(checkErrorPage)) {
        flashingLogoErrorPage();
    } else {
        flashingLogo();
    }
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        const changeSectionOptions = ["intro-page-button", "start-full-game-button", "loading-screen-button", "to-game-one-area-button", "game-one-to-hub-area-button", "to-game-two-area-button", "loading-screen-button-right", "game-one-to-hub-area-no-key-button", "game-two-to-hub-area-no-key-button"];
        button.addEventListener("click", function () {
            if (changeSectionOptions.includes(this.getAttribute("id"))) {
                changeSection(this);
            } else if (button.id === "hub-area-action-button" || button.id === "hub-area-option-one-button" || button.id === "hub-area-option-two-button") {
                if (button.id === "hub-area-option-one-button") {
                    document.getElementById("npc").setAttribute("data-npc-text-tree", "B");
                    speechUpdateGameHub();
                } else if (button.id === "hub-area-option-two-button") {
                    document.getElementById("npc").setAttribute("data-npc-text-tree", "C");
                    speechUpdateGameHub();
                } else {
                    speechUpdateGameHub();
                }
            } else if (button.id === "game-one-area-action-button") {
                speechUpdateGameOne();
            } else if (button.id === "game-one-start-button") {
                setThenRunGameOne();
            } else if (button.id === "game-one-repeat-pattern") {
                gameOneRepeatPattern();
            } else if (button.id === "game-two-area-action-button") {
                speechUpdateGameTwo();
            } else if (button.id === "game-two-start-button") {
                if (globalVars.gameTwoSetAnswers.length < 1) {
                    GameTwoSetRandomTextOptions();
                } else {
                    gameTwoDisplayWords(globalVars.gameTwoSetAnswers);
                }
            } else if (button.id === "game-two-check-answers-button") {
                gameTwoCheckAnswer();
            } else if (button.id === "final-area-action-button") {
                speechUpdateFinalArea();
            } else if (button.id === "final-area-celebrate-button") {
                finalAreaCelebration();
            } else if (button.id === "reset-button") {
                resetGame();
            }
        });
    }
    //Game box event listeners
    let gameOneBoxes = document.getElementsByClassName("game-one-indivdual-box");
    for (let boxes of gameOneBoxes) {
        boxes.addEventListener("click", function (e) {
            if (boxes.getAttribute("data-game-box-one-status") === "active") {
                let gameOneBoxNumber = parseInt(e.target.getAttribute("data-game-one-box-number"));
                gameOneCheckAnswer(gameOneBoxNumber);
                gameOnePlayerBoxLight(gameOneBoxNumber);
            }
        });
    }
    let gameTwoBoxes = document.getElementsByClassName("game-two-indivdual-box");
    for (let boxes of gameTwoBoxes) {
        boxes.addEventListener("click", function (e) {
            let gameTwoBoxNumber = parseInt(e.target.getAttribute("data-game-two-box-number"));
            gameTwoPlayerBoxLightToggle(gameTwoBoxNumber);
        });
    }
});

// Global JavaScript code. The following apply throughout the whole game and are used for multiple sections
/**
 * This is used to change the div to the correct one so the player can progress through the game
 */
function changeSection(e) {
    let currentLink = e.getAttribute("data-current-page-id");
    let nextLink = e.getAttribute("data-next-page-id");
    const heading = document.getElementById("loading-text");
    const headingRight = document.getElementById("loading-text-right");
    const loadingScreenButton = document.getElementById("loading-screen-button");
    const npc = document.getElementById("npc");
    const gameHubTextArea = document.getElementById("game-hub-text-area");
    const hubAreaButton = document.getElementById("hub-area-action-button");
    const npcSpeakerName = document.getElementById("npc-speaker-name");
    const heroRight = document.getElementById("hero-loading-right");
    const hubAreaButtonOptionOne = document.getElementById("hub-area-option-one-button");
    const hubAreaButtonOptionTwo = document.getElementById("hub-area-option-two-button");
    console.log(currentLink);
    console.log(nextLink);
    document.getElementById(nextLink).classList.remove("hidden");
    document.getElementById(currentLink).classList.add("hidden");
    let buttonID = e.getAttribute("id");
    if (buttonID === "start-full-game-button") {
        loadingScreen(buttonID);
    } else if (buttonID === "to-game-one-area-button") {
        loadingScreenButton.setAttribute("data-next-page-id", "game-one-area");
        loadingScreenButton.innerText = "Click to face the minotaur!";
        heading.innerHTML = "ON THE WAY TO CHALLENGE 1<br>...";
        loadingScreen(buttonID);
    } else if (buttonID === "to-game-two-area-button") {
        loadingScreenButton.setAttribute("data-next-page-id", "game-two-area");
        loadingScreenButton.innerText = "Click to face the evil necromancer!";
        heading.innerHTML = "ON THE WAY TO CHALLENGE 2<br>...";
        loadingScreen(buttonID);
    } else if (buttonID === "game-one-to-hub-area-button" || buttonID === "game-two-to-hub-area-button") {
        headingRight.innerHTML = "RETURNING TO GRASSLANDS<br>...";
        loadingScreenRight(buttonID);
    } else if (buttonID == "game-one-to-hub-area-no-key-button") {
        headingRight.innerHTML = "RETURNING TO GRASSLANDS<br>...";
        heroRight.style.left = "";
        if (globalVars.key1 === false) {
            const gameOneSpeakerName = document.getElementById("game-one-speaker-name");
            const gameOneTextArea = document.getElementById("game-one-text-area");
            const gameOneAreaButton = document.getElementById("game-one-area-action-button");
            const gameOneStartButton = document.getElementById("game-one-start-button");
            const gameOneMonster = document.getElementById("game-one-monster");
            const gameOneReplayPatternButton = document.getElementById("game-one-repeat-pattern");
            const boxArea = document.getElementById("game-one-all-boxes");
            gameOneAreaButton.classList.remove("hidden");
            gameOneSpeakerName.classList.remove("hidden");
            gameOneReplayPatternButton.classList.add("hidden");
            gameOneStartButton.classList.add("hidden");
            gameOneMonster.setAttribute("data-game-one-text-tree", "E");
            gameOneMonster.setAttribute("data-game-one-text-cycle", "1");
            gameOneTextArea.innerText = "Welcome back! You leaving was just delaying your demise.";
            gameOneAreaButton.innerText = "Next";
            boxArea.setAttribute("data-game-one-check", "0");
            boxArea.setAttribute("data-game-one-level-score", "0");
            boxArea.setAttribute("data-game-one-level", "1");
            npc.setAttribute("data-npc-text-tree", "H");
        }
        loadingScreenRight(buttonID);
    } else if (buttonID === "game-two-to-hub-area-no-key-button") {
        headingRight.innerHTML = "RETURNING TO GRASSLANDS<br>...";
        heroRight.style.left = "";
        if (globalVars.key2 === false) {
            const gameTwoSpeakerName = document.getElementById("game-two-speaker-name");
            const gameTwoTextArea = document.getElementById("game-two-text-area");
            const gameTwoAreaButton = document.getElementById("game-two-area-action-button");
            const gameTwoStartButton = document.getElementById("game-two-start-button");
            const gameTwoMonster = document.getElementById("game-two-monster");
            const gameTwoToHubAreaButton = document.getElementById("game-two-to-hub-area-button");
            const boxArea = document.getElementById("game-two-all-boxes");
            gameTwoAreaButton.classList.remove("hidden");
            gameTwoSpeakerName.classList.remove("hidden");
            gameTwoTextArea.innerText = "You've come back! Good.";
            gameTwoStartButton.classList.add("hidden");
            gameTwoToHubAreaButton.classList.add("hidden");
            gameTwoMonster.setAttribute("data-game-two-text-tree", "E");
            gameTwoMonster.setAttribute("data-game-two-text-cycle", "1");
            boxArea.setAttribute("data-game-two-level", "1");
            boxArea.setAttribute("data-game-two-level-score", "0");
            boxArea.setAttribute("data-game-two-check", "0");
            globalVars.gameTwoSetAnswers = [];
            npc.setAttribute("data-npc-text-tree", "I");
            gameHubTextArea.innerText = "I see the wits of the evil necromancer were too much for you.";
            hubAreaButton.innerText = "Next";
            hubAreaButton.classList.remove("hidden");
            npcSpeakerName.classList.remove("hidden");
            hubAreaButtonOptionOne.classList.add("hidden");
            hubAreaButtonOptionTwo.classList.add("hidden");
        }
        else if (globalVars.key2 === true && globalVars.key1 === false) {
            npc.setAttribute("data-npc-text-tree", "E");
            gameHubTextArea.innerText = "You beat the the evil necromance at his own game. Well done!";
            hubAreaButton.innerText = "Next";

        }
        loadingScreenRight(buttonID);
    }
}

/**
 * This is reused every time a player moves from one area to the next excluding returning from a game area
 */
function loadingScreen(buttonID) {
    const hero = document.getElementById("hero-loading");
    let heroWidth = parseInt(document.getElementById("hero-loading").offsetWidth);
    let width = parseInt(document.getElementById("loading-area").offsetWidth);
    let position = 0;
    let maxPosition = 20;
    const loadingLink = document.getElementById("loading-link");
    hero.style.bottom = "10 + px";
    loadingLink.classList.add("visible-hidden");
    const heading = document.getElementById("loading-text");
    console.log("LOADING SCREEN BUTTON ID NEXT");
    console.log(buttonID);
    hero.classList.add("hero-left-position-left");
    let flashPosition = 1;
    const loadingAnimation = setInterval(function () {
        position++;
        hero.style.left = ((width / maxPosition) * position - ((heroWidth / maxPosition) * position)) + "px";
        if (position % 2 === 0) {
            hero.setAttribute("src", "assets/images/sprite-hero-still-right.webp");
        } else if (position % 2 === 1) {
            hero.setAttribute("src", "assets/images/sprite-hero-walk-right.webp");
            heading.innerText = heading.innerText + ".";
            if (flashPosition === 1) {
                heading.classList.remove("black");
                heading.classList.add("blue");
                flashPosition++;
            } else if (flashPosition === 2) {
                heading.classList.add("yellow");
                heading.classList.remove("blue");
                flashPosition++;
            } else if (flashPosition === 3) {
                heading.classList.add("red");
                heading.classList.remove("yellow");
                flashPosition++;
            } else if (flashPosition === 4) {
                heading.classList.remove("red");
                heading.classList.add("black");
                flashPosition = 1;
            }
        }
        if (position === maxPosition) {
            clearInterval(loadingAnimation);
            hero.style.right = 3 + "px";
            hero.style.left = "";
            hero.classList.remove("hero-left-position-left");
            loadingLink.classList.remove("visible-hidden");
            hero.style.bottom = parseInt(hero.style.bottom) + "px";
            heading.classList.remove("red");
            heading.classList.remove("yellow");
            heading.classList.remove("blue");
            heading.classList.add("black");
        }
    }, 250);
}

/**
 * This is reused every time a player moves from one of the game areas to the hub area
 */
function loadingScreenRight(buttonID) {
    const hero = document.getElementById("hero-loading-right");
    let heroWidth = parseInt(document.getElementById("hero-loading-right").offsetWidth);
    let width = parseInt(document.getElementById("loading-area-right").offsetWidth);
    let position = 0;
    let maxPosition = 20;
    const loadingLink = document.getElementById("loading-link-right");
    hero.style.bottom = "10 + px";
    loadingLink.classList.add("visible-hidden");
    const heading = document.getElementById("loading-text-right");
    console.log(buttonID);
    hero.classList.add("hero-right-position-right");
    let flashPosition = 1;
    const loadingAnimation = setInterval(function () {
        position++;
        hero.style.right = ((width / maxPosition) * position - ((heroWidth / maxPosition) * position)) + "px";
        if (position % 2 === 0) {
            hero.setAttribute("src", "assets/images/sprite-hero-still-left.webp");
        } else if (position % 2 === 1) {
            hero.setAttribute("src", "assets/images/sprite-hero-walk-left.webp");
            heading.innerText = heading.innerText + ".";
            if (flashPosition === 1) {
                heading.classList.remove("black");
                heading.classList.add("blue");
                flashPosition++;
            } else if (flashPosition === 2) {
                heading.classList.add("yellow");
                heading.classList.remove("blue");
                flashPosition++;
            } else if (flashPosition === 3) {
                heading.classList.add("red");
                heading.classList.remove("yellow");
                flashPosition++;
            } else if (flashPosition === 4) {
                heading.classList.remove("red");
                heading.classList.add("black");
                flashPosition = 1;
            }
        }
        if (position === maxPosition) {
            clearInterval(loadingAnimation);
            hero.style.left = 3 + "px";
            hero.style.right = "";
            hero.classList.remove("hero-left-position-right");
            loadingLink.classList.remove("visible-hidden");
            hero.style.bottom = parseInt(hero.style.bottom) + "px";
            heading.classList.remove("red");
            heading.classList.remove("yellow");
            heading.classList.remove("blue");
            heading.classList.add("black");
        }
    }, 250);
}

//Intro page code
/**
 * This is used to create the flashing logo at the beginning of the game
 */
function flashingLogo() {
    let position = 1;
    const introLogo = document.getElementById("intro-page-logo");
    const introPageSection = document.getElementById("intro-page");
    const logoFlash = setInterval(function () {
        if (introPageSection.classList.contains("hidden")) {
            clearInterval(logoFlash);
        }
        if (position === 1) {
            introLogo.classList.remove("red");
            introLogo.classList.add("blue");
            position++;
        } else if (position === 2) {
            introLogo.classList.add("yellow");
            introLogo.classList.remove("blue");
            position++;
        } else if (position === 3) {
            introLogo.classList.add("black");
            introLogo.classList.remove("yellow");
            position++;
        } else if (position === 4) {
            introLogo.classList.remove("black");
            introLogo.classList.add("red");
            position = 1;
        }
    }, 750);
}

// Front page code
/**
 * This is the first thing a player does. They input their name, and it gets stored to the global variable knightName
 */

document.getElementById("knight-name-container").addEventListener("submit", function (e) {
    e.preventDefault();
    globalVars.knightName = document.getElementById("knight-name").value;
    if (globalVars.knightName === "") {
        alert("You must give your knight a name so the masses can recognise you across the land (and so we know what to put on your gravestone)");
        return;
    }
    console.log(globalVars.knightName);
    document.getElementById("knight-name-container").innerHTML = `<p class="mt-no">Knight ${globalVars.knightName} is ready for action!<br>Click below to start being a hero.</p>`;
    document.getElementById("start-full-game-button").classList.remove("hidden");
});

// Game hub area code
/**
 * This will carry out all combinations of the text area copy in the correct order and based on the corect text tree. The number within the text cycle custom attribute will also change various elements visually
 */
function speechUpdateGameHub() {
    const npcSpeakerName = document.getElementById("npc-speaker-name");
    const gameHubTextArea = document.getElementById("game-hub-text-area");
    const hubAreaButton = document.getElementById("hub-area-action-button");
    const hubAreaButtonOptionOne = document.getElementById("hub-area-option-one-button");
    const hubAreaButtonOptionTwo = document.getElementById("hub-area-option-two-button");
    const npc = document.getElementById("npc");
    const hubAreaFinalAreaButton = document.getElementById("hub-area-save-the-prince-button");
    if (npc.getAttribute("data-npc-text-tree") === "A") {
        switch (parseInt(npc.getAttribute("data-npc-text-cycle"))) {
            case 1:
                gameHubTextArea.innerText = `Oh thank god you showed up knight ${globalVars.knightName}!                        
                        My name's Eric, and this is The Grasslands. Something awful has happened`;
                hubAreaButton.innerText = "Next";
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                npcSpeakerName.classList.remove("hidden");
                break;
            case 2:
                gameHubTextArea.innerText = `...you're a lot shorter than I thought you would be.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                npcSpeakerName.innerText = "Eric";
                document.getElementById("game-hub-area-text").innerText = "The Grasslands";
                break;
            case 3:
                gameHubTextArea.innerText = `Anyway, the prince has been locked away by 2 awful monsters.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 4:
                gameHubTextArea.innerText = `You have to complete the challenges these monsters have set to save him.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 5:
                gameHubTextArea.innerText = `You can complete these challenges in any order, and both grant a key. Once you have both keys, you can unlock the door to save the prince.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 6:
                gameHubTextArea.innerText = `That's the end of my info du- I mean explanation. 
                        Please hurry. I'm terrified of what's happening to our dear prince!`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 7:
                gameHubTextArea.innerText = `You've found your danger knight ${globalVars.knightName}. Are you up for the challenge? 
                        (If you're not you can just exit the game)`;
                npcSpeakerName.classList.add("hidden");
                hubAreaButton.innerText = "Yes. I'm ready for the challenge";
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 8:
                gameHubTextArea.innerText = `Excellent! When you're ready, choose one of the challenges to start, or click below to find out more about the challenges`;
                hubAreaButton.classList.add("hidden");
                hubAreaButtonOptionOne.classList.remove("hidden");
                hubAreaButtonOptionTwo.classList.remove("hidden");
                npc.setAttribute("data-npc-text-cycle", "1");
                break;
        }
    } else if (npc.getAttribute("data-npc-text-tree") === "B") {
        switch (parseInt(npc.getAttribute("data-npc-text-cycle"))) {
            case 1:
                hubAreaButtonOptionTwo.classList.add("hidden");
                hubAreaButtonOptionOne.innerText = "Next";
                gameHubTextArea.innerText = `Challenge 1 involves you picking the correct boxes that flash on your screen`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 2:
                gameHubTextArea.innerText = `It's a memory where a sequence of boxes will flash and you have to correctly replay the sequency back`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 3:
                gameHubTextArea.innerText = `There are three levels. Level one involves three box sequences, level 2 has four box squence, and round 3 has five box sequences.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 4:
                gameHubTextArea.innerText = `There are multiple rounds in each level, and the speed at which the boxes light up get quicker each level.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 5:
                gameHubTextArea.innerText = `You can return from the challenge at any time, but the monster's will reset the game so you will have to start from the beginning.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 6:
                gameHubTextArea.innerText = `If you want to repeat this information, or learn about challenge 2, click below. Otherwise, pick a challenge above.`;
                hubAreaButtonOptionTwo.classList.remove("hidden");
                hubAreaButtonOptionOne.innerText = "Challenge 1 info";
                npc.setAttribute("data-npc-text-cycle", "1");
                break;
        }
    } else if (npc.getAttribute("data-npc-text-tree") === "C") {
        switch (parseInt(npc.getAttribute("data-npc-text-cycle"))) {
            case 1:
                hubAreaButtonOptionOne.classList.add("hidden");
                hubAreaButtonOptionTwo.innerText = "Next";
                gameHubTextArea.innerText = `Challenge 2 involves you picking the correct boxes that flash on your screen.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 2:
                gameHubTextArea.innerText = `In each round, there will be a set of nine words and you have to pick three groups of three, with every group having a connection.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 3:
                gameHubTextArea.innerText = `There are three levels with three rounds in them each.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 4:
                gameHubTextArea.innerText = `You can return from the challenge at any time, but the monster's will reset the game so you will have to start from the beginning.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 5:
                gameHubTextArea.innerText = `If you want to repeat this information, or learn about challenge 1, click below. Otherwise, pick a challenge above.`;
                npc.setAttribute("data-npc-text-cycle", "1");
                hubAreaButtonOptionOne.classList.remove("hidden");
                hubAreaButtonOptionTwo.innerText = "Challenge 2 info";
                break;
        }
    } else if (npc.getAttribute("data-npc-text-tree") === "D") {
        switch (parseInt(npc.getAttribute("data-npc-text-cycle"))) {
            case 1:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                hubAreaButtonOptionOne.classList.add("hidden");
                hubAreaButtonOptionTwo.classList.add("hidden");
                npcSpeakerName.classList.remove("hidden");
                hubAreaButton.classList.remove("hidden");
                hubAreaButton.innerText = "Next";
                gameHubTextArea.innerText = `Well done on beating the minotaur!`;
                break;
            case 2:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                gameHubTextArea.innerText = `That's the first key received, only one more to go.`;
                break;
            case 3:
                npcSpeakerName.classList.add("hidden");
                hubAreaButton.classList.add("hidden");
                gameHubTextArea.innerText = `When you're ready, choose challenge 2 to get the second key, or click below to find out more about challenge 2.`;
                hubAreaButtonOptionTwo.classList.remove("hidden");
                npc.setAttribute("data-npc-text-cycle", "1");
                break;
        }
    } else if (npc.getAttribute("data-npc-text-tree") === "E") {
        switch (parseInt(npc.getAttribute("data-npc-text-cycle"))) {
            case 1:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                hubAreaButtonOptionOne.classList.add("hidden");
                hubAreaButtonOptionTwo.classList.add("hidden");
                npcSpeakerName.classList.remove("hidden");
                hubAreaButton.classList.remove("hidden");
                hubAreaButton.innerText = "Next";
                gameHubTextArea.innerText = `You beat the the evil necromance at his own game. Well done!`;
                break;
            case 2:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                gameHubTextArea.innerText = `That's the first key received, only one more to go.`;
                break;
            case 3:
                npcSpeakerName.classList.add("hidden");
                hubAreaButton.classList.add("hidden");
                gameHubTextArea.innerText = `When you're ready, choose challenge 1 to get the second key, or click below to find out more about challenge 1.`;
                hubAreaButtonOptionTwo.classList.remove("hidden");
                npc.setAttribute("data-npc-text-cycle", "1");
                break;
        }
    } else if (npc.getAttribute("data-npc-text-tree") === "F") {
        switch (parseInt(npc.getAttribute("data-npc-text-cycle"))) {
            case 1:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                hubAreaButtonOptionOne.classList.add("hidden");
                hubAreaButtonOptionTwo.classList.add("hidden");
                npcSpeakerName.classList.remove("hidden");
                hubAreaButton.classList.remove("hidden");
                hubAreaButton.innerText = "Next";
                gameHubTextArea.innerText = `With the minotaur beat, that's the second key!`;
                break;
            case 2:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                gameHubTextArea.innerText = `You can free the prince now.`;
                break;
            case 3:
                hubAreaButton.classList.add("hidden");
                gameHubTextArea.innerText = `Go to the prison and let him out of his cage!`;
                hubAreaFinalAreaButton.classList.remove("hidden");
                npc.setAttribute("data-npc-text-cycle", "1");
                break;
        }
    } else if (npc.getAttribute("data-npc-text-tree") === "G") {
        switch (parseInt(npc.getAttribute("data-npc-text-cycle"))) {
            case 1:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                hubAreaButtonOptionOne.classList.add("hidden");
                hubAreaButtonOptionTwo.classList.add("hidden");
                npcSpeakerName.classList.remove("hidden");
                hubAreaButton.classList.remove("hidden");
                hubAreaButton.innerText = "Next";
                gameHubTextArea.innerText = `With the evil necromance beat, that's the second key!`;
                break;
            case 2:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                gameHubTextArea.innerText = `You can free the prince now.`;
                break;
            case 3:
                hubAreaButton.classList.add("hidden");
                gameHubTextArea.innerText = `Go to the prison and let him out of his cage!`;
                hubAreaFinalAreaButton.classList.remove("hidden");
                npc.setAttribute("data-npc-text-cycle", "1");
                break;
        }
    } else if (npc.getAttribute("data-npc-text-tree") === "H") {
        switch (parseInt(npc.getAttribute("data-npc-text-cycle"))) {
            case 1:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                hubAreaButtonOptionOne.classList.add("hidden");
                hubAreaButtonOptionTwo.classList.add("hidden");
                npcSpeakerName.classList.remove("hidden");
                hubAreaButton.classList.remove("hidden");
                hubAreaButton.innerText = "Next";
                gameHubTextArea.innerText = `Oh no, I see no key! Is the minotaur still alive?`;
                break;
            case 2:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                gameHubTextArea.innerText = `At least you got out safe!`;
                break;
            case 3:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                gameHubTextArea.innerText = `I'm sure you'll get him next time!`;
                break;
            case 4:
                npcSpeakerName.classList.add("hidden");
                hubAreaButton.classList.add("hidden");
                gameHubTextArea.innerText = `When you're ready, choose one of the challenges to start, or click below to find out more about the challenges.`;
                hubAreaButtonOptionOne.classList.remove("hidden");
                hubAreaButtonOptionTwo.classList.remove("hidden");
                npc.setAttribute("data-npc-text-cycle", "1");
                break;
        }
    } else if (npc.getAttribute("data-npc-text-tree") === "I") {
        switch (parseInt(npc.getAttribute("data-npc-text-cycle"))) {
            case 1:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                gameHubTextArea.innerText = `I'm sure you'll beat his mind-bending puzzles next time!`;
                break;
            case 2:
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                gameHubTextArea.innerText = `The main thing is you're still alive.`;
                break;
            case 3:
                npcSpeakerName.classList.add("hidden");
                hubAreaButton.classList.add("hidden");
                gameHubTextArea.innerText = `When you're ready, choose one of the challenges to start, or click below to find out more about the challenges.`;
                hubAreaButtonOptionOne.classList.remove("hidden");
                hubAreaButtonOptionTwo.classList.remove("hidden");
                npc.setAttribute("data-npc-text-cycle", "1");
                break;
        }
    }
}

// Game one area - Speech pattern code
/**
 * This will carry out all combinations of the text area copy in the correct order and based on the corect text tree for game 1. The number within the text cycle custom attribute will also change various elements visually
 */
function speechUpdateGameOne() {
    const gameOneSpeakerName = document.getElementById("game-one-speaker-name");
    const gameOneTextArea = document.getElementById("game-one-text-area");
    const gameOneAreaButton = document.getElementById("game-one-area-action-button");
    const gameOneStartButton = document.getElementById("game-one-start-button");
    const gameOneMonster = document.getElementById("game-one-monster");
    const gameOneIntroCard = document.getElementById("game-one-game-intro-card-container");
    const gameOneToHubAreaButton = document.getElementById("game-one-to-hub-area-button");
    const gameOneBoxesContainer = document.getElementById("game-one-all-box-container");
    const gameOneReturnHubNoKeyButton = document.getElementById("game-one-to-hub-area-no-key-button");
    if (gameOneMonster.getAttribute("data-game-one-text-tree") === "A") {
        switch (parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle"))) {
            case 1:
                gameOneTextArea.innerText = `Welcome to my domain knight ${globalVars.knightName}!`;
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneSpeakerName.classList.remove("hidden");
                break;
            case 2:
                gameOneTextArea.innerText = `I've been expecting you.`;
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 3:
                gameOneTextArea.innerText = `To get my key, you'll need to copy my pattern on the lava tiles below.`;
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 4:
                gameOneTextArea.innerText = `If you can get 10 patterns right, you'll defeat me.`;
                gameOneIntroCard.classList.add("hidden");
                gameOneBoxesContainer.classList.remove("hidden");
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 5:
                gameOneTextArea.innerText = `But don't think it will be easy!`;
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 6:
                gameOneTextArea.innerText = `This will test your memory like its never been tested before. I'm not just going to hand over the key!`;
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 7:
                gameOneTextArea.innerText = `Tell me when you're ready, and we shall begin.`;
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 8:
                gameOneTextArea.innerText = `Challenge rules: Copy the pattern shown on the lava tiles above. For each correct sequence, you will receive a point. Get to 10 points to get the key.`;
                gameOneAreaButton.classList.add("hidden");
                gameOneSpeakerName.classList.add("hidden");
                gameOneStartButton.classList.remove("hidden");
                break;
        }
    } else if (gameOneMonster.getAttribute("data-game-one-text-tree") === "B") {
        switch (parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle"))) {
            case 1:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `Although let's be honest, that was incredibly easy.`;
                break;
            case 2:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `It would have been shameful if you had got anything wrong on that level.`;
                break;
            case 3:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `It's time to take it up a notch!`;
                break;
            case 4:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `Level 2 changes: The speed increases and there are now 4 boxes you need to watch for`;
                gameOneAreaButton.classList.add("hidden");
                gameOneSpeakerName.classList.add("hidden");
                gameOneStartButton.classList.remove("hidden");
                gameOneStartButton.innerText = "Start Level 2";
                break;
        }
    } else if (gameOneMonster.getAttribute("data-game-one-text-tree") === "C") {
        switch (parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle"))) {
            case 1:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `But now I'll get you.`;
                break;
            case 2:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `Prepare for the final level!`;
                break;
            case 3:
                gameOneTextArea.innerText = `Level 3 changes: The speed increases to the maximum and there are now 5 boxes you need to watch for`;
                gameOneAreaButton.classList.add("hidden");
                gameOneSpeakerName.classList.add("hidden");
                gameOneStartButton.classList.remove("hidden");
                gameOneStartButton.innerText = "Start Level 3";
                break;
        }
    } else if (gameOneMonster.getAttribute("data-game-one-text-tree") === "D") {
        switch (parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle"))) {
            case 1:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `I can't believe you defeated me!`;
                break;
            case 2:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `You don't deserve this key, you scrawny, disgusting knight.`;
                break;
            case 3:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `As I die here from you beating me in a copy game, I curse you and your entire family forever.`;
                break;
            case 4:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `The minotaur falls to the ground covered in blood (somehow) and you get the key from challenge 1!`;
                gameOneSpeakerName.classList.add("hidden");
                gameOneAreaButton.classList.add("visible-hidden");
                gameOneReturnHubNoKeyButton.classList.add("visible-hidden");
                let deathPose = 1;
                let gameOneDeathAnimaton = setInterval(function () {
                    switch (deathPose) {
                        case 1:
                            gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-2.webp";
                            deathPose++;
                            break;
                        case 2:
                            gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-3.webp";
                            deathPose++;
                            break;
                        case 3:
                            gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-4.webp";
                            deathPose++;
                            break;
                        case 4:
                            gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-5.webp";
                            deathPose++;
                            break;
                        case 5:
                            gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-6.webp";
                            deathPose++;
                            break;
                    }
                    if (deathPose === 6) {
                        clearInterval(gameOneDeathAnimaton);
                        gameOneAreaButton.classList.remove("visible-hidden");
                        gameOneReturnHubNoKeyButton.classList.remove("visible-hidden");
                    }
                }, 750);
                break;
            case 5:
                gameOneTextArea.innerText = `There's nothing else to do here apart from looking at the dead minotaur.`;
                gameOneAreaButton.classList.add("hidden");
                gameOneToHubAreaButton.classList.remove("hidden");
                break;
        }
    } else if (gameOneMonster.getAttribute("data-game-one-text-tree") === "E") {
        switch (parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle"))) {
            case 1:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `Let's go from the top now. My confidence has never been higher!`;
                break;
            case 2:
                gameOneTextArea.innerText = `As you left mid-game, the challenge completely restarts on level 1 round 1`;
                gameOneAreaButton.classList.add("hidden");
                gameOneSpeakerName.classList.add("hidden");
                gameOneStartButton.classList.remove("hidden");
                gameOneStartButton.innerText = "Restart Challenge";
                break;

        }
    }
}

// Game one area - Game code
/**
 * This sets the blocks which the player has to copy and shows an animation to display those blocks
 */
function setThenRunGameOne() {
    const gameOneStartButton = document.getElementById("game-one-start-button");
    const gameOneReturnHubNoKeyButton = document.getElementById("game-one-to-hub-area-no-key-button");
    const gameOneReplayPatternButton = document.getElementById("game-one-repeat-pattern");
    gameOneStartButton.classList.add("visible-hidden");
    gameOneReturnHubNoKeyButton.classList.add("visible-hidden");
    let answer = [];
    let counter = 0;
    let boxArea = document.getElementById("game-one-all-boxes");
    let lengthOfAnswer = "";
    if (parseInt(boxArea.getAttribute("data-game-one-level")) === 1) {
        lengthOfAnswer = 3;
    } else if (parseInt(boxArea.getAttribute("data-game-one-level")) === 2) {
        lengthOfAnswer = 4;
    } else if (parseInt(boxArea.getAttribute("data-game-one-level")) === 3) {
        lengthOfAnswer = 5;
    } else {
        alert("NO LEVEL DETECTED");
        throw "Something has gone wrong";
    }
    while (answer.length < lengthOfAnswer) {
        let randomNumber = Math.ceil(Math.random() * 9);
        answer.push(randomNumber);
    }
    const gameOneLightBoxes = setInterval(function () {
        let gameOneBoxNumber = answer[counter];
        if (counter < lengthOfAnswer) {
            gameOneBoxLight(gameOneBoxNumber);
            counter++;
        } else {
            clearInterval(gameOneLightBoxes);
            document.getElementById("game-one-text-area").innerText = "Now you copy the pattern";
            let gameOneBox = document.getElementsByClassName("game-one-indivdual-box");
            gameOneReturnHubNoKeyButton.classList.remove("visible-hidden");
            gameOneStartButton.classList.remove("visible-hidden");
            gameOneStartButton.classList.add("hidden");
            gameOneReplayPatternButton.classList.remove("hidden");
            for (let boxes of gameOneBox) {
                boxes.setAttribute("data-game-box-one-status", "active");
            }
        }
    }, 500 - ((parseInt(boxArea.getAttribute("data-game-one-level")) - 1) * 75));
    globalVars.gameOneAnswer = answer;
    console.log(globalVars.gameOneAnswer);
}

/**
 * This is the animation which lights ups the correct blocks
 */
function gameOneBoxLight(boxToLight) {
    const boxArea = document.getElementById("game-one-all-boxes");
    const gameOneBox = document.getElementsByClassName("game-one-indivdual-box");
    for (let boxes of gameOneBox) {
        if (parseInt(boxes.getAttribute("data-game-one-box-number")) === boxToLight) {
            let gameOneBoxNumber = parseInt(boxes.getAttribute("data-game-one-box-number"));
            console.log(boxes.getAttribute("data-game-one-box-number"));
            boxes.classList.remove("game-one-indivdual-box-flash-off");
            boxes.classList.add("game-one-indivdual-box-flash-on");
            setTimeout(function () {
                gameOneBox[gameOneBoxNumber - 1].classList.remove("game-one-indivdual-box-flash-on");
                gameOneBox[gameOneBoxNumber - 1].classList.add("game-one-indivdual-box-flash-off");
            }, 300 - ((parseInt(boxArea.getAttribute("data-game-one-level")) - 1) * 25));
        }
    }
}

/**
 * This checks the blocks that the player clicks to match it with the correct answer and sets the next levels of the game
 */
function gameOneCheckAnswer(playerAnswer) {
    let realAnswer = globalVars.gameOneAnswer;
    let realAnswerLength = realAnswer.length;
    const boxArea = document.getElementById("game-one-all-boxes");
    let checkNumber = parseInt(boxArea.getAttribute("data-game-one-check"));
    const gameOneAreaButton = document.getElementById("game-one-area-action-button");
    const gameOneStartButton = document.getElementById("game-one-start-button");
    const gameOneSpeakerName = document.getElementById("game-one-speaker-name");
    const gameOneMonster = document.getElementById("game-one-monster");
    const gameOneTextArea = document.getElementById("game-one-text-area");
    const gameOneReplayPatternButton = document.getElementById("game-one-repeat-pattern");
    if (playerAnswer === globalVars.gameOneAnswer[checkNumber]) {
        boxArea.setAttribute("data-game-one-check", checkNumber + 1);
        if (realAnswerLength - 1 === checkNumber) {
            gameOneReplayPatternButton.classList.add("hidden");
            boxArea.setAttribute("data-game-one-check", "0");
            boxArea.setAttribute("data-game-one-level-score", parseInt(boxArea.getAttribute("data-game-one-level-score")) + 1);
            gameOneMonsterHurtAnimation();
            let gameOneBox = document.getElementsByClassName("game-one-indivdual-box");
            for (let boxes of gameOneBox) {
                boxes.setAttribute("data-game-box-one-status", "inactive");
            }
            if (parseInt(boxArea.getAttribute("data-game-one-level-score")) === 3) {
                gameOneTextArea.innerText = "Ahhh! I've underestimated you!";
                gameOneMonster.setAttribute("data-game-one-text-tree", "B");
                gameOneMonster.setAttribute("data-game-one-text-cycle", "1");
                gameOneMonster.src = "assets/images/sprite-game-one-enemy-pose-2.webp";
                boxArea.setAttribute("data-game-one-level", "2");
                gameOneSpeakerName.classList.remove("hidden");
                gameOneAreaButton.classList.remove("hidden");
                gameOneAreaButton.innerText = "Next";
            } else if (parseInt(boxArea.getAttribute("data-game-one-level-score")) === 6) {
                gameOneTextArea.innerText = "OK OK. You're slightly better than I thought you would be";
                gameOneMonster.setAttribute("data-game-one-text-tree", "C");
                gameOneMonster.setAttribute("data-game-one-text-cycle", "1");
                gameOneMonster.src = "assets/images/sprite-game-one-enemy-pose-3.webp";
                boxArea.setAttribute("data-game-one-level", "3");
                gameOneSpeakerName.classList.remove("hidden");
                gameOneAreaButton.classList.remove("hidden");
                gameOneAreaButton.innerText = "Next";
            } else if (parseInt(boxArea.getAttribute("data-game-one-level-score")) === 10) {
                gameOneTextArea.innerText = "Nooooooooooooooooo";
                gameOneSpeakerName.classList.remove("hidden");
                gameOneMonster.setAttribute("data-game-one-text-cycle", "1");
                gameOneMonster.setAttribute("data-game-one-text-tree", "D");
                gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-1.webp";
                gameOneAreaButton.classList.remove("hidden");
                globalVars.key1 = true;
            } else {
                gameOneTextArea.innerText = "CORRECT! Well Done";
                gameOneStartButton.classList.remove("hidden");
                gameOneStartButton.innerText = "Next Stage";
            }
        }
    } else {
        gameOneTextArea.innerText = "WRONG! YOU IDIOT! TRY AGAIN! Or you can ask me to replay the pattern.";
        boxArea.setAttribute("data-game-one-check", "0");
        gameOneReplayPatternButton.classList.remove("hidden");
    }
}

/**
 * This is the animation which indicates the minotaur has been hurt
 */
function gameOneMonsterHurtAnimation() {
    let flash = 0;
    let gameOneEnemy = document.getElementById("game-one-monster");
    let gameOneMonsterHurtFlash = setInterval(function () {
        gameOneEnemy.classList.toggle("visible-hidden");
        flash++;
        if (flash === 6) {
            clearInterval(gameOneMonsterHurtFlash);
        }
    }, 100);
}

/**
 * This lights up the box that the player chose
 */
function gameOnePlayerBoxLight(PlayerBoxChosen) {
    let gameOneBox = document.getElementsByClassName("game-one-indivdual-box");
    for (let boxes of gameOneBox) {
        if (parseInt(boxes.getAttribute("data-game-one-box-number")) === PlayerBoxChosen) {
            let gameOneBoxNumber = parseInt(boxes.getAttribute("data-game-one-box-number"));
            console.log(boxes.getAttribute("data-game-one-box-number"));
            boxes.classList.remove("game-one-indivdual-box-flash-off");
            boxes.classList.add("game-one-indivdual-box-flash-on");
            setTimeout(function () {
                gameOneBox[gameOneBoxNumber - 1].classList.remove("game-one-indivdual-box-flash-on");
                gameOneBox[gameOneBoxNumber - 1].classList.add("game-one-indivdual-box-flash-off");
            }, 100);
        }
    }
}

/**
 * This repeats the pattern if the player wants the pattern to be repeated
 */
function gameOneRepeatPattern() {
    console.log("STEP 1");
    const gameOneReplayPatternButton = document.getElementById("game-one-repeat-pattern");
    const gameOneReturnHubNoKeyButton = document.getElementById("game-one-to-hub-area-no-key-button");
    gameOneReplayPatternButton.classList.add("visible-hidden");
    gameOneReturnHubNoKeyButton.classList.add("visible-hidden");
    let boxArea = document.getElementById("game-one-all-boxes");
    let counter = 0;
    let answer = globalVars.gameOneAnswer;
    let lengthOfAnswer = answer.length;
    let gameOneBox = document.getElementsByClassName("game-one-indivdual-box");
    for (let boxes of gameOneBox) {
        boxes.setAttribute("data-game-box-one-status", "inactive");
    }
    const gameOneLightBoxes = setInterval(function () {
        let gameOneBoxNumber = answer[counter];
        if (counter < lengthOfAnswer) {
            gameOneBoxLight(gameOneBoxNumber);
            counter++;
            console.log("STEPs 2");
        } else {
            clearInterval(gameOneLightBoxes);
            document.getElementById("game-one-text-area").innerText = "Now you copy the pattern";
            gameOneReplayPatternButton.classList.remove("visible-hidden");
            gameOneReturnHubNoKeyButton.classList.remove("visible-hidden");
            console.log("STEP 3");
            let gameOneBox = document.getElementsByClassName("game-one-indivdual-box");
            for (let boxes of gameOneBox) {
                boxes.setAttribute("data-game-box-one-status", "active");
            }
        }
    }, 500 - ((parseInt(boxArea.getAttribute("data-game-one-level")) - 1) * 100));

}

// Challenge two area code
/**
 * The text area function specifically for challenge two
 * This will carry out all combinations of the text area copy in the correct order and based on the corect text tree. The number within the text cycle custom attribute will also change various elements visually
 */
function speechUpdateGameTwo() {
    const gameTwoSpeakerName = document.getElementById("game-two-speaker-name");
    const gameTwoTextArea = document.getElementById("game-two-text-area");
    const gameTwoAreaButton = document.getElementById("game-two-area-action-button");
    const gameTwoStartButton = document.getElementById("game-two-start-button");
    const gameTwoMonster = document.getElementById("game-two-monster");
    const gameTwoIntroCard = document.getElementById("game-two-game-intro-card-container");
    const gameTwoToHubAreaButton = document.getElementById("game-two-to-hub-area-button");
    const gameTwoBoxesContainer = document.getElementById("game-two-all-box-container");
    if (gameTwoMonster.getAttribute("data-game-two-text-tree") === "A") {
        switch (parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle"))) {
            case 1:
                gameTwoTextArea.innerText = `Greetings ${globalVars.knightName}! Please, make yourself welcome in my humble abode.`;
                gameTwoAreaButton.innerText = "Next";
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                gameTwoSpeakerName.classList.remove("hidden");
                break;
            case 2:
                gameTwoTextArea.innerText = `I know you're here for my key, and I don't like that at all.`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 3:
                gameTwoTextArea.innerText = `BUT, if you can show you've got brains, I will give it over willingly.`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 4:
                gameTwoTextArea.innerText = `All you have to do is find the connections on the broken bits of wall over there.`;
                gameTwoIntroCard.classList.add("hidden");
                gameTwoBoxesContainer.classList.remove("hidden");
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 5:
                gameTwoTextArea.innerText = `If you get them right, the wall will repair itself, so at least I get some DIY done.`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 6:
                gameTwoTextArea.innerText = `Do you think you beat my game of wits?`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 7:
                gameTwoTextArea.innerText = `There will be three levels with three rounds in each. I would wish you luck, but I don't care enough about you.`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 8:
                gameTwoTextArea.innerText = `Challenge rules: The necromancer will present 9 words in the boxes. You will have to find 3 groups of 3 words, with each group of words having a connection between them.`;
                gameTwoAreaButton.classList.add("hidden");
                gameTwoSpeakerName.classList.add("hidden");
                gameTwoStartButton.classList.remove("hidden");
                break;
        }
    } else if ((gameTwoMonster.getAttribute("data-game-two-text-tree") === "B")) {
        switch (parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle"))) {
            case 1:
                gameTwoTextArea.innerText = `Ok, you got through the first round, but those connections were easy.`;
                gameTwoAreaButton.innerText = "Next";
                gameTwoMonster.src = "assets/images/sprite-game-two-enemy-pose-2.webp";
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 2:
                gameTwoTextArea.innerText = `Round 2 is going to be so much harder.`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 3:
                gameTwoTextArea.innerText = `When you're ready, we shall begin round 2!`;
                gameTwoAreaButton.classList.add("hidden");
                gameTwoStartButton.innerText = "Begin round 2";
                gameTwoStartButton.classList.remove("hidden");
                break;
        }
    } else if ((gameTwoMonster.getAttribute("data-game-two-text-tree") === "C")) {
        switch (parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle"))) {
            case 1:
                gameTwoTextArea.innerText = `...I'm very impressed actually.`;
                gameTwoAreaButton.innerText = "Next";
                gameTwoMonster.src = "assets/images/sprite-game-two-enemy-pose-3.webp";
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 2:
                gameTwoTextArea.innerText = `You've beaten 2 rounds!`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 3:
                gameTwoTextArea.innerText = `Round 3 will beat you though. I know you;re not clever enough to guess these connections.`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 4:
                gameTwoTextArea.innerText = `Let me know when you'ree ready to begin round 3.`;
                gameTwoAreaButton.classList.add("hidden");
                gameTwoStartButton.innerText = "Begin round 3";
                gameTwoStartButton.classList.remove("hidden");
                break;
        }
    } else if ((gameTwoMonster.getAttribute("data-game-two-text-tree") === "D")) {
        switch (parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle"))) {
            case 1:
                gameTwoTextArea.innerText = `Oh my God!`;
                gameTwoAreaButton.innerText = "Next";
                gameTwoMonster.src = "assets/images/sprite-game-two-enemy-death-1.webp";
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 2:
                gameTwoTextArea.innerText = `You did it!`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 3:
                gameTwoTextArea.innerText = `I am nothing. I am worthless. I am...`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 4:
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                gameTwoAreaButton.classList.add("visible-hidden");
                let deathPose = 1;
                let gameTwoDefeatAnimaton = setInterval(function () {
                    switch (deathPose) {
                        case 1:
                            gameTwoMonster.src = "assets/images/sprite-game-two-enemy-death-2.webp";
                            deathPose++;
                            break;
                        case 2:
                            gameTwoMonster.src = "assets/images/sprite-game-two-enemy-death-3.webp";
                            deathPose++;
                            break;
                        case 3:
                            gameTwoMonster.src = "assets/images/sprite-game-two-enemy-death-4.webp";
                            deathPose++;
                            break;
                        case 4:
                            gameTwoMonster.src = "assets/images/sprite-game-two-enemy-death-5.webp";
                            deathPose++;
                            break;
                        case 5:
                            gameTwoMonster.src = "assets/images/sprite-game-two-enemy-death-6.webp";
                            deathPose++;
                            break;
                        case 6:
                            gameTwoMonster.src = "assets/images/sprite-game-two-enemy-death-7.webp";
                            deathPose++;
                            break;
                        case 7:
                            gameTwoMonster.src = "assets/images/sprite-game-two-enemy-death-8.webp";
                            deathPose++;
                            break;
                    }
                    if (deathPose === 8) {
                        clearInterval(gameTwoDefeatAnimaton);
                        gameTwoAreaButton.classList.remove("visible-hidden");
                    }
                }, 300);
                break;
            case 5:
                gameTwoTextArea.innerText = `Useless. *embarassing sobbing from the skeleton*`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 6:
                gameTwoTextArea.innerText = `Take the key, and leave me be`;
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 7:
                gameTwoTextArea.innerText = `He throws the key at you and continues sobbing loudly.`;
                gameTwoSpeakerName.classList.add("hidden");
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 8:
                gameTwoTextArea.innerText = `There's nothing else to do here apart from watching the evil necromancer cry...`;
                gameTwoToHubAreaButton.classList.remove("hidden");
                gameTwoAreaButton.classList.add("hidden");
                break;
        }
    } else if ((gameTwoMonster.getAttribute("data-game-two-text-tree") === "E")) {
        switch (parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle"))) {
            case 1:
                gameTwoTextArea.innerText = `I want to see you fail.`;
                gameTwoAreaButton.innerText = "Next";
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 2:
                gameTwoTextArea.innerText = `When you're ready, we will begin from the beginning! All the options have been randomised so you can't rely on your preious knowledge`;
                gameTwoAreaButton.classList.add("hidden");
                gameTwoStartButton.innerText = "Begin challenge 2";
                gameTwoStartButton.classList.remove("hidden");
                break;
        }
    }
}

/**
 * Challenge two game function
 */

/**
 * This creates the random order which the sets of connections will appear for each level ensuring that there is some randomness for replayability value
 */
function GameTwoSetRandomTextOptions() {
    const gameTwoLevelOneOptions = [["SCROLL", "SWIPE", "TAP"], ["RANK", "RATE", "SCORE"], ["DOOR", "GATE", "HATCH"], ["DENT", "DING", "SCRATCH"], ["COMPLETE", "DONE", "OVER"], ["DAWN", "GENESIS", "START"], ["METAL", "POP", "CLASSICAL"], ["AMAZE", "RIVET", "THRILL"], ["COACH", "DIRECT", "GUIDE"]];
    const gameTwoLevelTwoOptions = [["BILLY", "JACK", "RAM"], ["PLAYWRIGHT", "SWORD", "WRAP"], ["RESORT", "STRAW", "SUPPER"], ["AID", "LADY", "NATIONS"], ["GEODUCK", "SEAHORSE", "WOMBAT"], ["DRY", "GIN", "SHAKEN"], ["FLOSS", "MOONWALK", "ROBOT"], ["EUPHORIA", "SUCCESSION", "WESTWORLD"], ["CHARM", "FRIENDSHIP", "TENNIS"]];
    const gameTwoLevelThreeOptions = [["ORGANISM", "SOLAR PANEL", "SPREADSHEET"], ["BOWLING PINS", "COMMANDMENTS", "DECADE"], ["ABUT", "GROAN", "VOILA"], ["BET", "LAMB", "THE"], ["LORDING", "MISSING", "SIRING"], ["HEAL", "SOUL", "TOW"], ["CHINSTRAP", "EMPEROR", "KING"], ["HELL", "ILL", "SHELL"], ["CHORUS", "HERO", "HUBRIS"]];
    globalVars.gameTwoOptions = [gameTwoLevelOneOptions, gameTwoLevelTwoOptions, gameTwoLevelThreeOptions];
    let gameTwoLevelOneRoundOne = [];
    let gameTwoLevelOneRoundTwo = [];
    let gameTwoLevelOneRoundThree = [];
    let gameTwoLevelTwoRoundOne = [];
    let gameTwoLevelTwoRoundTwo = [];
    let gameTwoLevelTwoRoundThree = [];
    let gameTwoLevelThreeRoundOne = [];
    let gameTwoLevelThreeRoundTwo = [];
    let gameTwoLevelThreeRoundThree = [];
    let gameTwoLevelOneSetOrder = fisherYatesMethod(gameTwoLevelOneOptions);
    let gameTwoLevelTwoSetOrder = fisherYatesMethod(gameTwoLevelTwoOptions);
    let gameTwoLevelThreeSetOrder = fisherYatesMethod(gameTwoLevelThreeOptions);
    for (j = 0; j < 3; j++) {
        for (i = 0; i < 3; i++) {
            gameTwoLevelOneRoundOne.push(gameTwoLevelOneSetOrder[i][j]);
            gameTwoLevelTwoRoundOne.push(gameTwoLevelTwoSetOrder[i][j]);
            gameTwoLevelThreeRoundOne.push(gameTwoLevelThreeSetOrder[i][j]);
        }
        for (i = 3; i < 6; i++) {
            gameTwoLevelOneRoundTwo.push(gameTwoLevelOneSetOrder[i][j]);
            gameTwoLevelTwoRoundTwo.push(gameTwoLevelTwoSetOrder[i][j]);
            gameTwoLevelThreeRoundTwo.push(gameTwoLevelThreeSetOrder[i][j]);
        }
        for (i = 6; i < 9; i++) {
            gameTwoLevelOneRoundThree.push(gameTwoLevelOneSetOrder[i][j]);
            gameTwoLevelTwoRoundThree.push(gameTwoLevelTwoSetOrder[i][j]);
            gameTwoLevelThreeRoundThree.push(gameTwoLevelThreeSetOrder[i][j]);
        }
    }
    gameTwoLevelOneRoundOne = fisherYatesMethod(gameTwoLevelOneRoundOne);
    gameTwoLevelOneRoundTwo = fisherYatesMethod(gameTwoLevelOneRoundTwo);
    gameTwoLevelOneRoundThree = fisherYatesMethod(gameTwoLevelOneRoundThree);
    gameTwoLevelTwoRoundOne = fisherYatesMethod(gameTwoLevelTwoRoundOne);
    gameTwoLevelTwoRoundTwo = fisherYatesMethod(gameTwoLevelTwoRoundTwo);
    gameTwoLevelTwoRoundThree = fisherYatesMethod(gameTwoLevelTwoRoundThree);
    gameTwoLevelThreeRoundOne = fisherYatesMethod(gameTwoLevelThreeRoundOne);
    gameTwoLevelThreeRoundTwo = fisherYatesMethod(gameTwoLevelThreeRoundTwo);
    gameTwoLevelThreeRoundThree = fisherYatesMethod(gameTwoLevelThreeRoundThree);
    globalVars.gameTwoSetAnswers = [gameTwoLevelOneRoundOne, gameTwoLevelOneRoundTwo, gameTwoLevelOneRoundThree, gameTwoLevelTwoRoundOne, gameTwoLevelTwoRoundTwo, gameTwoLevelTwoRoundThree, gameTwoLevelThreeRoundOne, gameTwoLevelThreeRoundTwo, gameTwoLevelThreeRoundThree];
    console.log(globalVars.gameTwoSetAnswers);
    gameTwoDisplayWords(globalVars.gameTwoSetAnswers);
}

/**
* This the Fisher Yates method for randomly shuffling an array. This code was taken from https://www.w3schools.com/js/js_array_sort.asp  
*/
function fisherYatesMethod(a) {
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = a[i];
        a[i] = a[j];
        a[j] = k;
    }
    return a;
}

/**
* This function shows the words to the player for them to choose the connections
*/
function gameTwoDisplayWords(allSetAnswers) {
    const gameTwoIndividualBoxes = document.getElementsByClassName("game-two-indivdual-box");
    const gameTwoTextArea = document.getElementById("game-two-text-area");
    const allGameTwoBoxes = document.getElementById("game-two-all-boxes");
    const gameTwoStartButton = document.getElementById("game-two-start-button");
    const gameTwoCheckAnswersButton = document.getElementById("game-two-check-answers-button");
    const gameTwoSpeakerName = document.getElementById("game-two-speaker-name");
    const gameTwoReturnHubNoKeyButton = document.getElementById("game-two-to-hub-area-no-key-button");
    gameTwoSpeakerName.classList.add("hidden");
    gameTwoStartButton.classList.add("hidden");
    gameTwoCheckAnswersButton.classList.remove("hidden");
    gameTwoCheckAnswersButton.classList.add("visible-hidden");
    gameTwoReturnHubNoKeyButton.classList.add("visible-hidden");
    gameTwoTextArea.innerText = "Find the connections";
    for (let boxes of gameTwoIndividualBoxes) {
        let gameTwoBoxNumber = parseInt(boxes.getAttribute("data-game-two-box-number"));
        let round = parseInt(allGameTwoBoxes.getAttribute("data-game-two-level-score"));
        boxes.classList.remove("game-two-box-background-correct");
        boxes.setAttribute("data-game-box-two-status", "active");
        boxes.innerHTML = `<p></p>`;
        for (let i = 0; i < 9; i++) {
            if (gameTwoBoxNumber === i + 1) {
                setTimeout(function () {
                    boxes.innerHTML = `<p data-game-two-box-number=${gameTwoBoxNumber}>${allSetAnswers[round][i]}<p>`;
                    if (i === 8) {
                        gameTwoReturnHubNoKeyButton.classList.remove("visible-hidden");
                        gameTwoCheckAnswersButton.classList.remove("visible-hidden");
                    }
                }, i * 100);
            }
        }
        boxes.setAttribute("data-game-box-two-status", "active");
    }
}

/**
* This function lights up a box when a player clicks on it and adds/removes the text of the box clicked to the player answer
*/
function gameTwoPlayerBoxLightToggle(PlayerBoxChosen) {
    let gameTwoBox = document.getElementsByClassName("game-two-indivdual-box");
    let gameTwoPlayerAnswer = globalVars.gameTwoPlayerAnswer;
    for (let boxes of gameTwoBox) {
        if (parseInt(boxes.getAttribute("data-game-two-box-number")) === PlayerBoxChosen && boxes.getAttribute("data-game-box-two-status") === "active") {
            boxes.classList.toggle("game-two-indivdual-box-no");
            boxes.classList.toggle("game-two-indivdual-box-selected");
            const gameBoxTwoInnerText = boxes.innerText;
            let elementIndex = gameTwoPlayerAnswer.indexOf(gameBoxTwoInnerText);
            if (gameTwoPlayerAnswer.includes(gameBoxTwoInnerText)) {
                gameTwoPlayerAnswer.splice(elementIndex, 1);
            } else {
                gameTwoPlayerAnswer.push(gameBoxTwoInnerText);
            }
        }
    }
}

/**
*This checks the answer from the player giving feedback if it's wrong and continuing on if it's right
*/
function gameTwoCheckAnswer() {
    const gameTwoPlayerAnswerLength = globalVars.gameTwoPlayerAnswer.length;
    const gameTwoSpeakerName = document.getElementById("game-two-speaker-name");
    const gameTwoTextArea = document.getElementById("game-two-text-area");
    const boxArea = document.getElementById("game-two-all-boxes");
    const gameTwoStartButton = document.getElementById("game-two-start-button");
    const gameTwoCheckAnswersButton = document.getElementById("game-two-check-answers-button");
    const gameTwoLevelIndex = parseInt(boxArea.getAttribute("data-game-two-level")) - 1;
    const gameTwoBox = document.getElementsByClassName("game-two-indivdual-box");
    const gameTwoMonster = document.getElementById("game-two-monster");
    const gameTwoAreaButton = document.getElementById("game-two-area-action-button");
    const gameTwoReturnHubNoKeyButton = document.getElementById("game-two-to-hub-area-no-key-button");
    console.log(gameTwoLevelIndex);
    console.log(globalVars.gameTwoOptions[gameTwoLevelIndex]);
    console.log(globalVars.gameTwoPlayerAnswer);
    gameTwoSpeakerName.classList.remove("hidden");
    if (gameTwoPlayerAnswerLength === 0) {
        gameTwoTextArea.innerText = `Idiot! You have to actually pick a word.`;
    } else if (gameTwoPlayerAnswerLength < 3) {
        gameTwoTextArea.innerText = `You fool, you've not picked enough words! All connections have 3 words associated with them. Not ${gameTwoPlayerAnswerLength}`;
    } else if (gameTwoPlayerAnswerLength > 3) {
        gameTwoTextArea.innerText = `You've picked ${gameTwoPlayerAnswerLength} words. That is clearly more than 3. Please, sort your brain out and pick 3 words`;
    } else if (gameTwoPlayerAnswerLength === 3) {
        let gameTwoCorrectAnswer = globalVars.gameTwoOptions[gameTwoLevelIndex].some(function (value) {
            return arrayCheck(value, globalVars.gameTwoPlayerAnswer);
        });
        console.log(gameTwoCorrectAnswer);
        if (gameTwoCorrectAnswer) {
            let connectionType = gameTwoConnection(globalVars.gameTwoPlayerAnswer);
            boxArea.setAttribute("data-game-two-check", parseInt(boxArea.getAttribute("data-game-two-check")) + 1);
            for (let boxes of gameTwoBox) {
                if (boxes.classList.contains("game-two-indivdual-box-selected")) {
                    boxes.setAttribute("data-game-box-two-status", "inactive");
                    boxes.classList.remove("game-two-indivdual-box-selected");
                    boxes.classList.add("game-two-indivdual-box-yes");
                    boxes.innerHTML = ""
                }
            }
            globalVars.gameTwoPlayerAnswer = [];
            if (parseInt(boxArea.getAttribute("data-game-two-check")) < 3) {
                gameTwoTextArea.innerText = `Correct! That is a connection where they are all ${connectionType}. Pick the next connections.`;
            } else if (parseInt(boxArea.getAttribute("data-game-two-check")) > 3) {
                alert("SOMETHING HAS GONE WRONG. PLEASE RELOAD THE PAGE");
                throw "Something has gone wrong";
            } else if (parseInt(boxArea.getAttribute("data-game-two-level-score")) === 2) {
                boxArea.setAttribute("data-game-two-level-score", parseInt(boxArea.getAttribute("data-game-two-level-score")) + 1);
                boxArea.setAttribute("data-game-two-level", parseInt(boxArea.getAttribute("data-game-two-level")) + 1);
                boxArea.setAttribute("data-game-two-check", "0");
                gameTwoMonster.setAttribute("data-game-two-text-tree", "B");
                gameTwoMonster.setAttribute("data-game-two-text-cycle", "1");
                gameTwoTextArea.innerText = `Correct! That is a connection where all the words are ${connectionType}`;
                gameTwoAreaButton.classList.remove("hidden");
                gameTwoAreaButton.innerText = "Complete Level";
                gameTwoCheckAnswersButton.classList.add("hidden");
            } else if (parseInt(boxArea.getAttribute("data-game-two-level-score")) === 5) {
                boxArea.setAttribute("data-game-two-level-score", parseInt(boxArea.getAttribute("data-game-two-level-score")) + 1);
                boxArea.setAttribute("data-game-two-level", parseInt(boxArea.getAttribute("data-game-two-level")) + 1);
                boxArea.setAttribute("data-game-two-check", "0");
                gameTwoMonster.setAttribute("data-game-two-text-tree", "C");
                gameTwoMonster.setAttribute("data-game-two-text-cycle", "1");
                gameTwoTextArea.innerText = `Correct! That is a connection where all the words are ${connectionType}`;
                gameTwoAreaButton.classList.remove("hidden");
                gameTwoAreaButton.innerText = "Complete Level";
                gameTwoCheckAnswersButton.classList.add("hidden");
            } else if (parseInt(boxArea.getAttribute("data-game-two-level-score")) === 8) {
                boxArea.setAttribute("data-game-two-check", "0");
                gameTwoMonster.setAttribute("data-game-two-text-tree", "D");
                gameTwoMonster.setAttribute("data-game-two-text-cycle", "1");
                gameTwoTextArea.innerText = `Correct! That is a connection where all the words are ${connectionType}`;
                gameTwoAreaButton.classList.remove("hidden");
                gameTwoAreaButton.innerText = "Complete Level";
                gameTwoCheckAnswersButton.classList.add("hidden");
                gameTwoReturnHubNoKeyButton.classList.add("visible-hidden");
            } else {
                boxArea.setAttribute("data-game-two-level-score", parseInt(boxArea.getAttribute("data-game-two-level-score")) + 1);
                boxArea.setAttribute("data-game-two-check", "0");
                gameTwoStartButton.classList.remove("hidden");
                gameTwoStartButton.innerText = "Next round";
                gameTwoCheckAnswersButton.classList.add("hidden");
                gameTwoTextArea.innerText = `Correct! That is a connection where all the words are ${connectionType}. And you've managed complete this round. I'm slightly more impressed than before`;
            }
        } else {
            gameTwoTextArea.innerText = `INCORRECT. Have another try!`;
        }
    }
}

/**
*This compares the elements of arrays, for use in the gameTwoCheckAnswer function
*/
function arrayCheck(option, answer) {
    let optionSort = option.sort();
    let answerSort = answer.sort();
    let checkedArray = optionSort.every(function (value, index) {
        return value === answerSort[index];
    });
    return checkedArray;
}

/**
 * This matches the correct answer with the description of the what the connection is
 */
function gameTwoConnection(correctAnswer) {
    correctAnswer.sort();
    const connectionMeaning = {
        "SCROLL": "touchscreen gestures",
        "RANK": "evaluating words",
        "DOOR": "entryways",
        "DENT": "blemishes",
        "COMPLETE": "words about finishing",
        "DAWN": "words describing beginnings",
        "CLASSICAL": "musical genres",
        "AMAZE": "captivating words",
        "COACH": "instructing words",
        "BILLY": "male animals",
        "PLAYWRIGHT": "words with a silent 'W'",
        "RESORT": "words that can be preceeded by 'Last'",
        "AID": "words that can be preceeded by 'First'",
        "GEODUCK": "animals ending with animals",
        "DRY": "types of martini",
        "FLOSS": "dance moves",
        "EUPHORIA": "HBO shows (whatever that means)",
        "CHARM": "types of bracelets",
        "ORGANISM": "things with cells",
        "BOWLING PINS": "groups of ten items",
        "ABUT": "anagrams of musical instruments",
        "BET": "starts of greek letters",
        "LORDING": "words starting with official titles",
        "HEAL": "homophones for parts of the foot",
        "CHINSTRAP": "types of penguins",
        "HELL": "contractions of 'HE WILL', SHE WILL' and 'I WILL' without the apostraphe",
        "CHORUS": "elements of a Greek tragedy",
    };
    let firstTerm = correctAnswer[0];
    return connectionMeaning[firstTerm];
}



// Final area code
/**
*This will run the final speech section of the game between the player and the prince 
*/
function speechUpdateFinalArea() {
    const princeSpeakerName = document.getElementById("prince-speaker-name");
    const headingText = document.getElementById("final-area-h3-text");
    const finalAreaTextArea = document.getElementById("final-area-text-area");
    const finalAreaButton = document.getElementById("final-area-action-button");
    const prince = document.getElementById("prince");
    const resetGameButton = document.getElementById("reset-button");
    const finalAreaCelebrateButton = document.getElementById("final-area-celebrate-button");
    switch (parseInt(prince.getAttribute("data-game-two-text-cycle"))) {
        case 1:
            prince.setAttribute("data-game-two-text-cycle", parseInt(prince.getAttribute("data-game-two-text-cycle")) + 1);
            princeSpeakerName.classList.remove("hidden");
            finalAreaTextArea.innerText = "You did it! You saved me from those savages. I can't thank you enough.";
            finalAreaButton.innerText = "Next";
            break;
        case 2:
            prince.setAttribute("data-game-two-text-cycle", parseInt(prince.getAttribute("data-game-two-text-cycle")) + 1);
            finalAreaTextArea.innerText = "Ah how I've missed the sun on my face and the air through my hair.";
            break;
        case 3:
            prince.setAttribute("data-game-two-text-cycle", parseInt(prince.getAttribute("data-game-two-text-cycle")) + 1);
            finalAreaTextArea.innerText = "You've been the best hero these lands have ever seen.";
            break;
        case 4:
            prince.setAttribute("data-game-two-text-cycle", parseInt(prince.getAttribute("data-game-two-text-cycle")) + 1);
            finalAreaTextArea.innerText = "For now, it's time to celebrate";
            finalAreaButton.classList.add("hidden");
            finalAreaCelebrateButton.classList.remove("hidden");
            break;
        case 5:
            prince.setAttribute("data-game-two-text-cycle", parseInt(prince.getAttribute("data-game-two-text-cycle")) + 1);
            finalAreaTextArea.innerText = `You have my eternal gratitude`;
            break;
        case 6:
            prince.setAttribute("data-game-two-text-cycle", parseInt(prince.getAttribute("data-game-two-text-cycle")) + 1);
            finalAreaTextArea.innerText = `Well done knight ${globalVars.knightName}`;
            headingText.innerHTML = `Peace is upon all the land!`
            princeSpeakerName.classList.add("hidden");
            break;
        case 7:
            prince.setAttribute("data-game-two-text-cycle", parseInt(prince.getAttribute("data-game-two-text-cycle")) + 1);
            finalAreaTextArea.innerText = `You managed to vanquish the danger and in turn save the day.`;
            break;
        case 8:
            prince.setAttribute("data-game-two-text-cycle", parseInt(prince.getAttribute("data-game-two-text-cycle")) + 1);
            finalAreaTextArea.innerText = `You can retire now and leave the life of a knight (exit the game) or you can retry this adventure again.`;
            finalAreaButton.innerHTML = `Let me replay the adventure`;
            break;
        case 9:
            prince.setAttribute("data-game-two-text-cycle", parseInt(prince.getAttribute("data-game-two-text-cycle")) + 1);
            finalAreaTextArea.innerText = `...wait. No. PLease don't make me go back into the prison!`;
            princeSpeakerName.classList.remove("hidden");
            finalAreaButton.innerHTML = `I don't care.`;
            break;
        case 10:
            prince.setAttribute("data-game-two-text-cycle", parseInt(prince.getAttribute("data-game-two-text-cycle")) + 1);
            finalAreaTextArea.innerText = `NO NO NO NO NO. I beg you. Hasn't my skin suffered enough from that musty prison???`;
            finalAreaButton.classList.add("hidden");
            resetGameButton.classList.remove("hidden");
            break;
    }
}

/**
*This will run the celebration function
*/
function finalAreaCelebration() {
    const headingText = document.getElementById("final-area-h3-text");
    const partyPopper = document.getElementsByClassName("final-area-celebration-individual-container");
    const finalAreaCelebrateButton = document.getElementById("final-area-celebrate-button");
    const finalAreaButton = document.getElementById("final-area-action-button");
    const finalAreaTextArea = document.getElementById("final-area-text-area");
    finalAreaCelebrateButton.classList.add("hidden");
    finalAreaButton.classList.remove("hidden");
    finalAreaButton.classList.add("visible-hidden");
    headingText.innerHTML = `CONGRATS!!!!
                    <br>
                    CONGRATS!!!!`;
    let flashPosition = 1;
    const textFlash = setInterval(function () {
        if (flashPosition === 1) {
            headingText.classList.remove("black");
            headingText.classList.add("blue");
            flashPosition++;
        } else if (flashPosition === 2) {
            headingText.classList.add("yellow");
            headingText.classList.remove("blue");
            flashPosition++;
        } else if (flashPosition === 3) {
            headingText.classList.add("red");
            headingText.classList.remove("yellow");
            flashPosition++;
        } else if (flashPosition === 4) {
            headingText.classList.remove("red");
            headingText.classList.add("black");
            flashPosition = 1;
        }
    }, 500);
    for (let i = 0; i < 5; i++) {
        setTimeout(function () {
            partyPopper[i].classList.remove("visible-hidden");
            if (i === 4) {
                clearInterval(textFlash);
                finalAreaTextArea.innerText = `OK, celebration over. Thank you again knight ${globalVars.knightName}`;
                finalAreaButton.classList.remove("visible-hidden");
                headingText.innerHTML = `Celebration over!
                    <br>
                    Stop celebrating!`;
            }
        }, i * 1000);
    }
}


// Error code
/**
*This will flash the error message 
*/
function flashingLogoErrorPage() {
    let position = 1;
    const errorLogo = document.getElementById("error-page-logo");
    const introLogo = document.getElementById("intro-page-logo");
    const logoFlash = setInterval(function () {
        if (document.body.contains(introLogo)) {
            clearInterval(logoFlash);
        }
        if (position === 1) {
            errorLogo.classList.remove("red");
            errorLogo.classList.add("blue");
            position++;
        } else if (position === 2) {
            errorLogo.classList.add("yellow");
            errorLogo.classList.remove("blue");
            position++;
        } else if (position === 3) {
            errorLogo.classList.add("black");
            errorLogo.classList.remove("yellow");
            position++;
        } else if (position === 4) {
            errorLogo.classList.remove("black");
            errorLogo.classList.add("red");
            position = 1;
        }
    }, 750);
}