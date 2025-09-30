// Global Variables
// These are for the various functions to access them throughout the game. They get referenced by multiple functions throughout. 
const globalVars = {
    knightName: "",
    key1: false,
    key2: false,
    gameOneAnswer: [],
    gameTwoOptions: [],
    gameTwoSetAnswers: [],
    gameTwoPlayerAnswer: [],
};

// Button element event listeners
// Once the DOM is loaded, all the buttons throughout the game will have an event listener and will be directed to the corresponding function
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        const changeSectionOptions = ["start-full-game-button", "loading-screen-button", "to-game-one-area-button", "game-one-to-hub-area-button", "to-game-two-area-button"];
        button.addEventListener("click", function () {
            if (changeSectionOptions.includes(this.getAttribute("id"))) {
                changeSection(this);
            } else if (button.id === "hub-area-action-button") {
                speechUpdateGameHub();
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
            }
        })
    }
    let gameOneBoxes = document.getElementsByClassName("game-one-indivdual-box");
    for (boxes of gameOneBoxes) {
        boxes.addEventListener("click", function (e) {
            if (boxes.getAttribute("data-game-box-one-status") === "active") {
                let gameOneBoxNumber = parseInt(e.target.getAttribute("data-game-one-box-number"));
                gameOneCheckAnswer(gameOneBoxNumber);
                gameOnePlayerBoxLight(gameOneBoxNumber);
            }
        })
    }
    let gameTwoBoxes = document.getElementsByClassName("game-two-indivdual-box");
    for (boxes of gameTwoBoxes) {
        boxes.addEventListener("click", function (e) {
            let gameTwoBoxNumber = parseInt(e.target.getAttribute("data-game-two-box-number"));
            console.log(e.target);
            console.log(gameTwoBoxNumber)
            gameTwoPlayerBoxLightToggle(gameTwoBoxNumber);
        })
    }
})

// Global JavaScript code. The following apply throughout the whole game and are used for multiple sections
/**
 * The changing section function
 * This is used to change the div to the correct one so the player can progress through the game
 */
function changeSection(e) {
    let currentLink = e.getAttribute("data-current-page-id");
    let nextLink = e.getAttribute("data-next-page-id");
    const heading = document.getElementById("loading-text");
    const loadingScreenButton = document.getElementById("loading-screen-button");
    console.log(currentLink);
    console.log(nextLink);
    document.getElementById(nextLink).classList.remove("hidden");
    document.getElementById(currentLink).classList.add("hidden");
    let buttonID = e.getAttribute("id");
    if (buttonID === "start-full-game-button") {
        loadingScreen(buttonID);
    } else if (buttonID === "to-game-one-area-button") {
        loadingScreenButton.setAttribute("data-next-page-id", "game-one-area");
        loadingScreenButton.innerText = "Click to face the minotaur in his domain!";
        heading.innerHTML = "ON THE WAY TO CHALLENGE 1<br>...";
        loadingScreen(buttonID);
    } else if (buttonID === "to-game-two-area-button") {
        loadingScreenButton.setAttribute("data-next-page-id", "game-two-area");
        loadingScreenButton.innerText = "Click to face the evil necromancer in his castle!";
        heading.innerHTML = "ON THE WAY TO CHALLENGE 2<br>...";
        loadingScreen(buttonID);
    } else if (buttonID === "game-one-to-hub-area-button" || buttonID === "game-two-to-hub-area-button") {
        loadingScreenRight(buttonID);
    }
}

/**
 * The loading screen function from left to right
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
    loadingLink.classList.add("hidden");
    const heading = document.getElementById("loading-text");
    console.log(buttonID);
    hero.classList.add("hero-left-position-left");
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
            loadingLink.classList.remove("hidden");
            hero.style.bottom = parseInt(hero.style.bottom) + 18.4 + "px";
        }
    }, 250)
}

/**
 * The loading screen function from right to left
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
    loadingLink.classList.add("hidden");
    const heading = document.getElementById("loading-text-right");
    console.log(buttonID);
    hero.classList.add("hero-right-position-right");
    const loadingAnimation = setInterval(function () {
        position++;
        hero.style.right = ((width / maxPosition) * position - ((heroWidth / maxPosition) * position)) + "px";
        if (position % 2 === 0) {
            hero.setAttribute("src", "assets/images/sprite-hero-still-left.png");
        } else if (position % 2 === 1) {
            hero.setAttribute("src", "assets/images/sprite-hero-walk-left.png");
            heading.innerText = heading.innerText + ".";
        }
        if (position === maxPosition) {
            clearInterval(loadingAnimation);
            hero.style.left = 3 + "px";
            hero.style.right = "";
            hero.classList.remove("hero-left-position-right");
            loadingLink.classList.remove("hidden");
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
    globalVars.knightName = document.getElementById("knight-name").value;
    if (globalVars.knightName === "") {
        alert("You must give your knight a name so the masses can recognise you across the land (and so we know what to put on your gravestone)");
        return;
    }
    console.log(globalVars.knightName);
    document.getElementById("knight-name-container").innerHTML = `<p>Knight ${globalVars.knightName} is ready for action!<br>Click below to start being a hero</p>`;
    document.getElementById("start-full-game-button").classList.remove("hidden");
})

// Game hub area code
/**
 * The text area function specifically for the game hub area
 * This will carry out all combinations of the text area copy in the correct order and based on the corect text tree. The number within the text cycle custom attribute will also change various elements visually
 */

function speechUpdateGameHub() {
    const npcSpeakerName = document.getElementById("npc-speaker-name");
    const gameHubTextArea = document.getElementById("game-hub-text-area");
    const hubAreaButton = document.getElementById("hub-area-action-button");
    const npc = document.getElementById("npc");
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
                gameHubTextArea.innerText = `You can complete the first 3 challenges in any order, and each one grants a key. Once you get all 3 keys, you can unlock the door to the fourth and final challenge.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 6:
                gameHubTextArea.innerText = `Challenge 1 is in the minotaur's lava domain. You have to copy his patterns to defeat him.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                document.getElementById("game-one-hub-area").style.backgroundColor = "red";
                break;
            case 7:
                gameHubTextArea.innerText = `Challenge 2 is the penguin's maths game held in his ice domain. If you can prove you're good enough at quick maths, he'll give you his key.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                document.getElementById("game-two-hub-area").style.backgroundColor = "blue";
                break;
            case 8:
                gameHubTextArea.innerText = `If you can avoid the attacks being thrown at you in challenge 3, you'll get the rock golem's key.`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                document.getElementById("game-three-hub-area").style.backgroundColor = "yellow";
                break;
            case 9:
                gameHubTextArea.innerText = `I'll explain what lies in challenge 4 when you get all the keys!`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                document.getElementById("game-four-hub-area").style.backgroundColor = "grey";
                break;
            case 10:
                gameHubTextArea.innerText = `That's the end of my info du- I mean explanation. 
                        Please hurry. I'm terrified of what's happening to our dear prince!`;
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 11:
                gameHubTextArea.innerText = `You've found your danger knight ${globalVars.knightName}. Are you up for the challenge? 
                        (If you're not you can just exit the game)`;
                npcSpeakerName.classList.add("hidden");
                hubAreaButton.innerText = "Yes. I'm ready for the challenge";
                npc.setAttribute("data-npc-text-cycle", parseInt(npc.getAttribute("data-npc-text-cycle")) + 1);
                break;
            case 12:
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
function speechUpdateGameOne() {
    const gameOneSpeakerName = document.getElementById("game-one-speaker-name");
    const gameOneTextArea = document.getElementById("game-one-text-area");
    const gameOneAreaButton = document.getElementById("game-one-area-action-button");
    const gameOneStartButton = document.getElementById("game-one-start-button");
    const gameOneMonster = document.getElementById("game-one-monster");
    const gameOneIntroCard = document.getElementById("game-one-game-intro-card-container");
    const gameOneToHubAreaButton = document.getElementById("game-one-to-hub-area-button");
    const gameOneBoxesContainer = document.getElementById("game-one-all-box-container");
    if (gameOneMonster.getAttribute("data-game-one-text-tree") === "A") {
        switch (parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle"))) {
            case 1:
                gameOneTextArea.innerText = `Welcome to my domain knight ${globalVars.knightName}!`
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneSpeakerName.classList.remove("hidden");
                break;
            case 2:
                gameOneTextArea.innerText = `I've been expecting you.`
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 3:
                gameOneTextArea.innerText = `To get my key, you'll need to copy my pattern on the lava below.`
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 4:
                gameOneTextArea.innerText = `If you can get 10 patterns right, you'll defeat me.`
                gameOneIntroCard.classList.add("hidden");
                gameOneBoxesContainer.classList.remove("hidden");
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 5:
                gameOneTextArea.innerText = `But don't think it will be easy!`
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 6:
                gameOneTextArea.innerText = `This will test your memory like its never been tested before. I'm not just going to hand over the key!`
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 7:
                gameOneTextArea.innerText = `Tell me when you're ready, and we shall begin.`
                gameOneAreaButton.innerText = "Next";
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                break;
            case 8:
                gameOneTextArea.innerText = `Challenge rules: The minotaur will light a pattern on the lava tiles below. When the pattern has been shown, you will have to click the correct tiles. For each correct sequence, you will receive a point. Get to 10 points to get the key.`
                gameOneAreaButton.classList.add("hidden");
                gameOneSpeakerName.classList.add("hidden");
                gameOneStartButton.classList.remove("hidden");
                break;
        }
    } else if (gameOneMonster.getAttribute("data-game-one-text-tree") === "B") {
        switch (parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle"))) {
            case 1:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `Although let's be honest, that was incredibly easy.`
                break;
            case 2:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `It would have been shameful if you had got anything wrong on that level.`
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
                gameOneStartButton.innerText = "Start Level 2"
                break;
        }
    } else if (gameOneMonster.getAttribute("data-game-one-text-tree") === "C") {
        switch (parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle"))) {
            case 1:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `But now I'll get you.`
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
                gameOneStartButton.innerText = "Start Level 3"
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
                gameOneAreaButton.classList.add("hidden");
                let deathPose = 1;
                let gameOneDeathAnimaton = setInterval(function () {
                    switch (deathPose) {
                        case 1:
                            gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-2.png";
                            deathPose++;
                            break;
                        case 2:
                            gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-3.png";
                            deathPose++;
                            break;
                        case 3:
                            gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-4.png";
                            deathPose++;
                            break;
                        case 4:
                            gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-5.png";
                            deathPose++;
                            break;
                        case 5:
                            gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-6.png";
                            deathPose++;
                            break;
                    }
                    if (deathPose === 6) {
                        clearInterval(gameOneDeathAnimaton);
                        gameOneAreaButton.classList.remove("hidden");
                    }
                }, 750);
                break;
            case 5:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `There's nothing else to do here apart from looking at the dead minotaur.`;
                gameOneAreaButton.classList.add("hidden");
                gameOneToHubAreaButton.classList.remove("hidden")
                break;
        }
    }
}

// Challenge one game function
/**
 * This sets the blocks which the player has to copy and shows an animation to display those blocks
 */
function setThenRunGameOne() {
    const gameOneStartButton = document.getElementById("game-one-start-button");
    gameOneStartButton.classList.add("hidden");
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
        throw "Something has gone wrong"
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
            for (boxes of gameOneBox) {
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
    let boxArea = document.getElementById("game-one-all-boxes");
    let gameOneBox = document.getElementsByClassName("game-one-indivdual-box");
    for (boxes of gameOneBox) {
        if (parseInt(boxes.getAttribute("data-game-one-box-number")) === boxToLight) {
            let gameOneBoxNumber = parseInt(boxes.getAttribute("data-game-one-box-number"));
            console.log(boxes.getAttribute("data-game-one-box-number"));
            boxes.classList.add("game-one-box-background");
            setTimeout(function () {
                gameOneBox[gameOneBoxNumber - 1].classList.remove("game-one-box-background");
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
            boxArea.setAttribute("data-game-one-check", "0");
            boxArea.setAttribute("data-game-one-level-score", parseInt(boxArea.getAttribute("data-game-one-level-score")) + 1);
            gameOneMonsterHurtAnimation();
            let gameOneBox = document.getElementsByClassName("game-one-indivdual-box");
            for (boxes of gameOneBox) {
                boxes.setAttribute("data-game-box-one-status", "inactive");
            }
            if (parseInt(boxArea.getAttribute("data-game-one-level-score")) === 3) {
                gameOneTextArea.innerText = "Ahhh! I've underestimated you!";
                gameOneMonster.setAttribute("data-game-one-text-tree", "B");
                gameOneMonster.setAttribute("data-game-one-text-cycle", "1");
                gameOneMonster.src = "assets/images/sprite-game-one-enemy-pose-2.png"
                boxArea.setAttribute("data-game-one-level", "2");
                gameOneSpeakerName.classList.remove("hidden");
                gameOneAreaButton.classList.remove("hidden");
                gameOneAreaButton.innerText = "Next"
            } else if (parseInt(boxArea.getAttribute("data-game-one-level-score")) === 6) {
                gameOneTextArea.innerText = "OK OK. You're slightly better than I thought you would be";
                gameOneMonster.setAttribute("data-game-one-text-tree", "C");
                gameOneMonster.setAttribute("data-game-one-text-cycle", "1");
                gameOneMonster.src = "assets/images/sprite-game-one-enemy-pose-3.png"
                boxArea.setAttribute("data-game-one-level", "3");
                gameOneSpeakerName.classList.remove("hidden");
                gameOneAreaButton.classList.remove("hidden");
                gameOneAreaButton.innerText = "Next"
            } else if (parseInt(boxArea.getAttribute("data-game-one-level-score")) === 10) {
                gameOneTextArea.innerText = "Nooooooooooooooooo";
                gameOneSpeakerName.classList.remove("hidden");
                gameOneMonster.setAttribute("data-game-one-text-cycle", "1");
                gameOneMonster.setAttribute("data-game-one-text-tree", "D");
                gameOneMonster.src = "assets/images/sprite-game-one-enemy-death-1.png";
                gameOneAreaButton.classList.remove("hidden");
                globalVars.key1 = true;
            } else {
                gameOneTextArea.innerText = "CORRECT! Well Done"
                gameOneStartButton.classList.remove("hidden");
                gameOneStartButton.innerText = "Next Stage";
            }
        }
    } else {
        gameOneTextArea.innerText = "WRONG! YOU IDIOT! TRY AGAIN!";
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
    }, 100)
}

/**
 * This lights up the box that the player chose
 */
function gameOnePlayerBoxLight(PlayerBoxChosen) {
    let gameOneBox = document.getElementsByClassName("game-one-indivdual-box");
    for (boxes of gameOneBox) {
        if (parseInt(boxes.getAttribute("data-game-one-box-number")) === PlayerBoxChosen) {
            let gameOneBoxNumber = parseInt(boxes.getAttribute("data-game-one-box-number"));
            console.log(boxes.getAttribute("data-game-one-box-number"));
            boxes.classList.add("game-one-box-background");
            setTimeout(function () {
                gameOneBox[gameOneBoxNumber - 1].classList.remove("game-one-box-background");
            }, 100)
        }
    }
}

/**
 * This repeats the pattern if the player wants the pattern to be repeated
 */
function gameOneRepeatPattern() {
    const gameOneReplayPatternButton = document.getElementById("game-one-repeat-pattern");
    gameOneReplayPatternButton.classList.add("hidden");
    let boxArea = document.getElementById("game-one-all-boxes");
    let counter = 0;
    let answer = globalVars.gameOneAnswer;
    let lengthOfAnswer = answer.length;
    let gameOneBox = document.getElementsByClassName("game-one-indivdual-box");
    for (boxes of gameOneBox) {
        boxes.setAttribute("data-game-box-one-status", "inactive");
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
            for (boxes of gameOneBox) {
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
                gameTwoTextArea.innerText = `Greetings ${globalVars.knightName}! Please, make yourself welcome in my humble abode.`
                gameTwoAreaButton.innerText = "Next";
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                gameTwoSpeakerName.classList.remove("hidden");
                break;
            case 2:
                gameTwoTextArea.innerText = `I know you're here for my key, and I don't like that at all.`
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 3:
                gameTwoTextArea.innerText = `BUT, if you can show you've got brains, I will give it over willingly.`
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 4:
                gameTwoTextArea.innerText = `All you have to do is find the connections between the words in the hall below.`
                gameTwoIntroCard.classList.add("hidden");
                gameTwoBoxesContainer.classList.remove("hidden");
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 5:
                gameTwoTextArea.innerText = `Do you think you beat my game of wits?`
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 6:
                gameTwoTextArea.innerText = `There will be three levels with three rounds in each. I would wish you luck, but I don't care enough about you.`
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 7:
                gameTwoTextArea.innerText = `Challenge rules: The necromancer will present 9 words in the boxes. You will have to find 3 groups of 3 words, with each group of words having a connection between them.`
                gameTwoAreaButton.classList.add("hidden");
                gameTwoSpeakerName.classList.add("hidden");
                gameTwoStartButton.classList.remove("hidden");
                break;
        }
    } else if ((gameTwoMonster.getAttribute("data-game-two-text-tree") === "B")) {
        switch (parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle"))) {
            case 1:
                gameTwoTextArea.innerText = `Ok, you got through the first round, but those connections were easy.`
                gameTwoAreaButton.innerText = "Next";
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 2:
                gameTwoTextArea.innerText = `Round 2 is going to be so much harder.`
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 3:
                gameTwoTextArea.innerText = `When you're ready, we shall begin round 2!`;
                gameTwoAreaButton.classList.add("hidden");
                gameTwoStartButton.innerText = "Begin round 2"
                gameTwoStartButton.classList.remove("hidden");
                break;
        }
    } else if ((gameTwoMonster.getAttribute("data-game-two-text-tree") === "C")) {
        switch (parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle"))) {
            case 1:
                gameTwoTextArea.innerText = `...I'm very impressed actually.`
                gameTwoAreaButton.innerText = "Next";
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 2:
                gameTwoTextArea.innerText = `You've beaten 2 rounds!`
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
                case 3:
                gameTwoTextArea.innerText = `Round 3 will beat you though. I know you;re not clever enough to guess these connections.`
                gameTwoMonster.setAttribute("data-game-two-text-cycle", parseInt(gameTwoMonster.getAttribute("data-game-two-text-cycle")) + 1);
                break;
            case 4:
                gameTwoTextArea.innerText = `Let me know when you'ree ready to begin round 3.`;
                gameTwoAreaButton.classList.add("hidden");
                gameTwoStartButton.innerText = "Begin round 3"
                gameTwoStartButton.classList.remove("hidden");
                break;
        }
    } else if ((gameTwoMonster.getAttribute("data-game-two-text-tree") === "D")) {

    }
}

/**
 * Challenge two game function
 */

/**
 * This creates the random order which the sets of connections will appear for each level ensuring that there is some randomness for replayability value
 */
function GameTwoSetRandomTextOptions() {
    const gameTwoLevelOneOptions = [["SCROLL", "SWIPE", "TAP"], ["RANK", "RATE", "SCORE"], ["DOOR", "GATE", "HATCH"], ["DENT", "DING", "SCRATCH"], ["COMPLETE", "DONE", "OVER"], ["DAWN", "GENESIS", "START"], ["METAL", "POP", "CLASSICAL"], ["CHARM", "RIVET", "THRILL"], ["COACH", "DIRECT", "GUIDE"]];
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
    gameTwoDisplayWords(globalVars.gameTwoSetAnswers)
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
    gameTwoSpeakerName.classList.add("hidden");
    gameTwoTextArea.innerText = "Find the connections";
    for (let boxes of gameTwoIndividualBoxes) {
        let gameTwoBoxNumber = parseInt(boxes.getAttribute("data-game-two-box-number"));
        let arrayPosition = 0;
        let round = parseInt(allGameTwoBoxes.getAttribute("data-game-two-level-score"));
        boxes.classList.remove("game-two-box-background-correct");
        boxes.setAttribute("data-game-box-two-status", "active");
        boxes.innerHTML = `<p></p>`
        for (let i = arrayPosition; i < 9; i++) {
            if (gameTwoBoxNumber === i + 1) {
                setTimeout(function () {
                    boxes.innerHTML = `<p class="prevent-select" data-game-two-box-number=${gameTwoBoxNumber}>${allSetAnswers[round][i]}<p>`;
                }, i * 100);
            }
        }
        boxes.setAttribute("data-game-box-two-status", "active");
    }
    gameTwoStartButton.classList.add("hidden");
    gameTwoCheckAnswersButton.classList.remove("hidden");
}

/**
* This function lights up a box when a player clicks on it and adds/removes the text of the box clicked to the player answer
*/
function gameTwoPlayerBoxLightToggle(PlayerBoxChosen) {
    let gameTwoBox = document.getElementsByClassName("game-two-indivdual-box");
    let gameTwoPlayerAnswer = globalVars.gameTwoPlayerAnswer;
    for (boxes of gameTwoBox) {
        if (parseInt(boxes.getAttribute("data-game-two-box-number")) === PlayerBoxChosen && boxes.getAttribute("data-game-box-two-status") === "active") {
            boxes.classList.toggle("game-two-box-background");
            const gameBoxTwoInnerText = boxes.innerText;
            let elementIndex = gameTwoPlayerAnswer.indexOf(gameBoxTwoInnerText)
            if (gameTwoPlayerAnswer.includes(gameBoxTwoInnerText)) {
                gameTwoPlayerAnswer.splice(elementIndex, 1);
            } else {
                gameTwoPlayerAnswer.push(gameBoxTwoInnerText)
            }
            console.log(gameTwoPlayerAnswer);
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
            boxArea.setAttribute("data-game-two-check", parseInt(boxArea.getAttribute("data-game-two-check")) + 1);
            for (boxes of gameTwoBox) {
                if (boxes.classList.contains("game-two-box-background")) {
                    boxes.setAttribute("data-game-box-two-status", "inactive");
                    boxes.classList.remove("game-two-box-background");
                    boxes.classList.add("game-two-box-background-correct");
                }
            }
            globalVars.gameTwoPlayerAnswer = [];
            if (parseInt(boxArea.getAttribute("data-game-two-check")) < 3) {
                gameTwoTextArea.innerText = `Correct! That is a connection where they are all "INSERT VARIABLE HERE"`;
            } else if (parseInt(boxArea.getAttribute("data-game-two-check")) > 3) {
                alert("SOMETHING HAS GONE WRONG. PLEASE RELOAD THE PAGE");
                throw "Something has gone wrong"
            } else if (parseInt(boxArea.getAttribute("data-game-two-level-score")) === 2) {
                boxArea.setAttribute("data-game-two-level-score", parseInt(boxArea.getAttribute("data-game-two-level-score")) + 1);
                boxArea.setAttribute("data-game-two-check", "0");
                gameTwoMonster.setAttribute("data-game-two-text-tree", "B");
                gameTwoMonster.setAttribute("data-game-two-text-cycle", "1");
                gameTwoTextArea.innerText = `Correct! That is a connection where all the words are "INSERT VARIABLE HERE"`;
                gameTwoAreaButton.classList.remove("hidden");
                gameTwoAreaButton.innerText = "Complete Level"
                gameTwoCheckAnswersButton.classList.add("hidden");
            } else if (parseInt(boxArea.getAttribute("data-game-two-level-score")) === 5) {
                boxArea.setAttribute("data-game-two-level-score", parseInt(boxArea.getAttribute("data-game-two-level-score")) + 1);
                boxArea.setAttribute("data-game-two-check", "0");
                gameTwoMonster.setAttribute("data-game-two-text-tree", "C");
                gameTwoMonster.setAttribute("data-game-two-text-cycle", "1");
                gameTwoTextArea.innerText = `Correct! That is a connection where all the words are "INSERT VARIABLE HERE"`;
                gameTwoAreaButton.classList.remove("hidden");
                gameTwoAreaButton.innerText = "Complete Level"
                gameTwoCheckAnswersButton.classList.add("hidden");
            } else if (parseInt(boxArea.getAttribute("data-game-two-level-score")) === 8) {
                boxArea.setAttribute("data-game-two-check", "0");
                gameTwoMonster.setAttribute("data-game-two-text-tree", "D");
                gameTwoMonster.setAttribute("data-game-two-text-cycle", "1");
                gameTwoTextArea.innerText = `Correct! That is a connection where all the words are "INSERT VARIABLE HERE"`;
                gameTwoAreaButton.classList.remove("hidden");
                gameTwoAreaButton.innerText = "Complete Level"
                gameTwoCheckAnswersButton.classList.add("hidden");
            } else {
                boxArea.setAttribute("data-game-two-level-score", parseInt(boxArea.getAttribute("data-game-two-level-score")) + 1);
                boxArea.setAttribute("data-game-two-check", "0");
                gameTwoStartButton.classList.remove("hidden");
                gameTwoStartButton.innerText = "Next round"
                gameTwoCheckAnswersButton.classList.add("hidden");
                gameTwoTextArea.innerText = `Correct! That is a connection where all the wods are "INSERT VARIABLE HERE". And you've managed complete this round. I'm slightly more impressed than before`;
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
    })
    return checkedArray;
}






// Final area code