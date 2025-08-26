// Global Variables
// These are for the various functions to access them throughout the game. They get referenced by multiple functions throughout. 
let knightName = "";
let key1 = false;
let key2 = false;
let key3 = false;
let gameOneAnswer = []

// Button element event listeners
// Once the DOM is loaded, all the buttons throughout the game will have an event listener and will be directed to the corresponding function
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        let changeSectionOptions = ["start-full-game-button", "loading-screen-button", "to-game-one-area-button"]
        button.addEventListener("click", function () {
            if (changeSectionOptions.includes(this.getAttribute("id"))) {
                changeSection(this);
            } else if (button.getAttribute("id") === "hub-area-action-button") {
                speechUpdateGameHub();
            } else if (button.getAttribute("id") === "game-one-area-action-button") {
                speechUpdateGameOne();
            } else if (button.getAttribute("id") === "game-one-start-button") {
                setThenRunGameOne();
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
})

// Global JavaScript code. The following apply throughout the whole game and are used for multiple sections
/**
 * The changing section function
 * This is the first thing a player does. They input their name, and it gets stored to the global variable knightName
 */
function changeSection(e) {
    let currentLink = e.getAttribute("data-current-page-id");
    let nextLink = e.getAttribute("data-next-page-id");
    console.log(currentLink);
    console.log(nextLink);
    document.getElementById(nextLink).classList.remove("hidden");
    document.getElementById(currentLink).classList.add("hidden");
    let buttonID = e.getAttribute("id");
    if (buttonID === "start-full-game-button") {
        loadingScreen(buttonID);
    } else if (buttonID === "to-game-one-area-button") {
        document.getElementById("loading-screen-button").setAttribute("data-next-page-id", "game-one-area");
        document.getElementById("loading-screen-button").innerText = "Click to face the minotaur in his domain!";
        document.getElementById("loading-text").innerHTML = "ON THE WAY TO CHALLENGE 1<br>...";
        loadingScreen(buttonID);
    }
}

/**
 * The loading screen function
 * This is reused every time a player moves from one area to the next
 */
function loadingScreen(buttonID) {
    const hero = document.getElementById("hero-loading");
    let heroWidth = parseInt(document.getElementById("hero-loading").offsetWidth);
    let width = parseInt(document.getElementById("loading-area").offsetWidth);
    let position = 0;
    let maxPosition = 20;
    hero.classList.add("hero-left-position-left");
    hero.style.bottom = 10 + "px";
    document.getElementById("loading-link").classList.add("hidden");
    console.log(buttonID);
    const heading = document.getElementById("loading-text");
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
                gameHubTextArea.innerText = `Oh thank god you showed up knight ${knightName}!                        
                        My name's Eric, and this is the Grasslands. Something awful has happened`;
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
                gameHubTextArea.innerText = `You've found your danger knight ${knightName}. Are you up for the challenge? 
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
    if (gameOneMonster.getAttribute("data-game-one-text-tree") === "A") {
        switch (parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle"))) {
            case 1:
                gameOneTextArea.innerText = `Welcome to my domain knight ${knightName}!`
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
                gameOneTextArea.innerText = `I can't believe you defeated me!`
                break;
            case 2:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `You don't deserve this key, you scrawny, disgusting knight.`
                break;
            case 3:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `As I die here from you beating me in a copy game, I curse you and your entire family forever.`
                break;
            case 4:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `The minotaur falls to the ground covered in blood (somehow) and you get the key from challenge 1!`
                gameOneSpeakerName.classList.add("hidden");
                break;
            case 5:
                gameOneMonster.setAttribute("data-game-one-text-cycle", parseInt(gameOneMonster.getAttribute("data-game-one-text-cycle")) + 1);
                gameOneTextArea.innerText = `There's nothing else to do here apart form looking at the dead minotaur.`
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
        let randomNumber = Math.ceil(Math.random() * 12);
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
    }, 500 - ((parseInt(boxArea.getAttribute("data-game-one-level")) - 1) * 100));
    gameOneAnswer = answer;
    console.log(gameOneAnswer);
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
            }, 300 - ((parseInt(boxArea.getAttribute("data-game-one-level")) - 1) * 50));
        }
    }
}

/**
 * This checks the blocks that the player clicks to match it with the correct answer and sets the next levels of the game
 */
function gameOneCheckAnswer(playerAnswer) {
    let realAnswer = gameOneAnswer;
    let realAnswerLength = realAnswer.length;
    let boxArea = document.getElementById("game-one-all-boxes");
    let checkNumber = parseInt(boxArea.getAttribute("data-game-one-check"));
    const gameOneAreaButton = document.getElementById("game-one-area-action-button");
    const gameOneStartButton = document.getElementById("game-one-start-button");
    const gameOneSpeakerName = document.getElementById("game-one-speaker-name");
    const gameOneMonster = document.getElementById("game-one-monster");
    const gameOneTextArea = document.getElementById("game-one-text-area");
    if (playerAnswer === gameOneAnswer[checkNumber]) {
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
                boxArea.setAttribute("data-game-one-level", "2");
                gameOneSpeakerName.classList.remove("hidden");
                gameOneMonster.setAttribute("data-game-one-text-cycle", "1");
                gameOneAreaButton.classList.remove("hidden");
                gameOneAreaButton.innerText = "Next"
            } else if (parseInt(boxArea.getAttribute("data-game-one-level-score")) === 6) {
                gameOneTextArea.innerText = "OK OK. You're slightly better than I thought you would be";
                gameOneMonster.setAttribute("data-game-one-text-tree", "C");
                boxArea.setAttribute("data-game-one-level", "3");
                gameOneSpeakerName.classList.remove("hidden");
                gameOneMonster.setAttribute("data-game-one-text-cycle", "1");
                gameOneAreaButton.classList.remove("hidden");
                gameOneAreaButton.innerText = "Next"
            } else if (parseInt(boxArea.getAttribute("data-game-one-level-score")) === 10) {
                alert("WELL DONE, YOU BEAT THE MINOTAUR");
                gameOneTextArea.innerText = "Nooooooooooooooooo";
                gameOneSpeakerName.classList.remove("hidden");
                gameOneMonster.setAttribute("data-game-one-text-cycle", "1");
                gameOneMonster.setAttribute("data-game-one-text-tree", "D");
                key1 = true;
            } else {
                gameOneTextArea.innerText = "CORRECT! Well Done"
                gameOneStartButton.classList.remove("hidden");
                gameOneStartButton.innerText = "Next Stage";
            }
        }
    } else {
        gameOneTextArea.innerText = "WONRG! YOU IDIOT! TRY AGAIN!"
        boxArea.setAttribute("data-game-one-check", "0");
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

//gameOneSuccess()

//gameOneFailure()





















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