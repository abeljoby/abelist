const colors = ['red','gold','green','cornflowerblue','black','white'];

class guess {
    constructor(num) {
        this.num = num;
        this.color = -1;
        this.button = document.querySelector(`#pick${num}`);
        this.button.addEventListener("click",(e)=> this.changeColor());
    }
    changeColor() {
        if(this.color === -1) {
            this.button.classList.toggle("pick");
            this.button.classList.toggle("picked");
        } else {
            this.button.classList.remove("picked");
            void this.button.offsetWidth; // Trigger reflow to restart the animation
            this.button.classList.add("picked");
        }
        this.color = (this.color+1)%colors.length;
        this.button.style.setProperty("--bg-color",colors[this.color]);
        this.button.blur();
    }
}

let guess1 = new guess(1);
let guess2 = new guess(2);
let guess3 = new guess(3);
let guess4 = new guess(4);
const guesses = [guess1,guess2,guess3,guess4];

const confirm = document.querySelector("#confirm");
const warning = document.querySelector(".warning");
const instruction = document.querySelector("#instructions");
const instructionclose = document.querySelector("#close-instructions");
const result = document.querySelector("#result");
const resultclose = document.querySelector("#close-result");
const resultHeader = document.querySelector("#result-header h1");
const resultText = document.querySelector("#result-content p");
const resultContent = document.querySelector("#result-content");

const answerTile = document.createElement("div");

let guessno = 1;
let answer = [];

confirm.addEventListener("click",makeGuess);

function closeInstruction(e) {
    instruction.classList.remove("info-open");
}

function closeResult(e) {
    result.classList.remove("info-open");
}

instructionclose.addEventListener("click",closeInstruction);
resultclose.addEventListener("click",closeResult);

function logKey(e) {
    const regex = /(?:Digit|Numpad)([1-4])/;
    const digit = e.code.match(regex);
    if (digit) {
        guesses[digit[1]-1].button.click();
    }
    else if (e.code === "Enter") {
        confirm.click();
    }
    else if (e.code === "KeyI") {
        showInstruction();
    }
    else if (e.code === "Escape") {
        closeInstruction();
        closeResult();
    }
}

const getFormattedDate = () => {
    const date = new Date();
    const day = date.getDate(); // Day of the month (1-31)
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getFullYear(); // Year (e.g., 2024)

    return `${day} ${month} ${year}`;
};

function startGame() {
    answerTile.classList.add("tile");
    answerTile.classList.add("answer-tile");
    for(let i=0;i<4;i++) {
        let colorCode = Math.floor(colors.length*Math.random());
        answer.push(colors[colorCode]);
        const pick = document.createElement("div");
        pick.classList.add("picked");
        pick.style.setProperty("--bg-color",colors[colorCode]);
        answerTile.appendChild(pick);
    }
    // answer = ["red","white","black","gold"];
    // console.log(document.cookie);
    if(!document.cookie) {
        setTimeout(() => {
            showInstruction();
        }, 500);
        document.cookie = "instruction=true";
    }
    console.log(answer);
}

function shufflePins(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getResults(secretCode, guess) {
    let blackPegs = 0;
    let whitePegs = 0;
  
    const secret = [...secretCode];
    const guessCopy = [...guess];

    for (let i = 0; i < secret.length; i++) {
        if (guessCopy[i] === secret[i]) {
            blackPegs++;
            secret[i] = guessCopy[i] = null;
        }
    }

    for (let i = 0; i < guessCopy.length; i++) {
        if (guessCopy[i] !== null && secret.includes(guessCopy[i])) {
            whitePegs++;
            secret[secret.indexOf(guessCopy[i])] = null;
        }
    }

    return { blackPegs, whitePegs };
}

function winState() {
    setTimeout(() => {
        resultText.textContent = `Congratulations! You got the answer in ${guessno-1} guesses!`;
        showResult();
        confirm.removeEventListener("click",makeGuess);
    }, 2500);
}

function loseState() {
    setTimeout(() => {
        resultHeader.textContent = "You lost!";
        resultText.textContent = "You have run out of guesses. The correct answer was:";
        resultContent.appendChild(answerTile);
        showResult();
        confirm.removeEventListener("click",makeGuess);
    }, 2000);
}

function showInstruction() {
    instruction.classList.toggle("info-open");
}

function showResult() {
    result.classList.toggle("info-open");
}

function makeGuess() {
    for (g of guesses) {
        if(g.color === -1) {
            warning.textContent = "Please select a colour!";
            return;
        }
    }

    const tile = document.querySelector(`#guess${guessno}`);
    const guessedColors = guesses.map(pin => colors[pin.color]);
    const pins = document.querySelector(`#answer${guessno}`);
    let pinsOrder = [pins.childNodes.item(1),pins.childNodes.item(3),pins.childNodes.item(5),pins.childNodes.item(7)];
    shufflePins(pinsOrder);
    tile.classList.add("guessed");
    tile.addEventListener("click",repeatGuess);

    for(g of guesses) {
        const pick = document.createElement("div");
        pick.classList.add("picked");
        pick.style.setProperty("--bg-color",colors[g.color]);
        tile.appendChild(pick);
        g.button.classList.toggle("pick");
        g.button.classList.toggle("picked");
        g.button.style.setProperty("--bg-color","gray");
        g.color = -1;
    }

    let feedback = getResults(answer,guessedColors);
    const blackPins = feedback.blackPegs;
    let i = 0;
    setTimeout(() => {
        const addPin = (color, count) => {
            if (count > 0) {
                pinsOrder[i].classList.add("answer-pin");
                pinsOrder[i++].style.setProperty("--bg-color", color);
                setTimeout(() => addPin(color, count - 1), 400);
            }
        };

        addPin("white", feedback.whitePegs);
        setTimeout(() => addPin("black", feedback.blackPegs), feedback.whitePegs * 400);
    }, 800);

    if (blackPins === 4) {
        winState();
    }
    else if (guessno >= 7) {
        loseState();
    }

    guessno += 1;

}

function repeatGuess() {
    // console.log(this.className);
    for([i,p] of this.childNodes.entries()) {
        let colored = p.style.getPropertyValue("--bg-color");
        guesses[i].color = colors.indexOf(colored);
        guesses[i].button.style.setProperty("--bg-color",colored);
        guesses[i].button.classList.remove("pick");
        guesses[i].button.classList.add("picked");
    }
}

document.addEventListener("keydown", logKey);
const date = document.querySelector(".date");
date.textContent = getFormattedDate();

const tip = document.querySelector(".tip");
tip.addEventListener("click",showInstruction);

startGame();


