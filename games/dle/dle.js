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
        }
        this.color = (this.color+1)%colors.length;
        this.button.style.setProperty("--bg-color",colors[this.color]);
    }
}

let guess1 = new guess(1);
let guess2 = new guess(2);
let guess3 = new guess(3);
let guess4 = new guess(4);
const guesses = [guess1,guess2,guess3,guess4];

const confirm = document.querySelector("#confirm");
const info = document.querySelector(".info");
const warning = document.querySelector(".warning");

let guessno = 1;
let answer = [];

confirm.addEventListener("click",(e) => makeGuess());

function startGame() {
    for(let i=0;i<4;i++) {
        let colorCode = Math.floor(colors.length*Math.random());
        answer.push(colors[colorCode]);
    }
    console.log(answer);
}

function shufflePins(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getFeedback(secretCode, guess) {
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

    for(g of guesses) {
        const pick = document.createElement("div");
        pick.classList.add("picked");
        pick.style.setProperty("--bg-color",colors[g.color]);
        tile.appendChild(pick);
    }

    let feedback = getFeedback(answer,guessedColors);
    let i = 0;
    while(feedback.whitePegs > 0) {
        pinsOrder[i].classList.add("answer-pin");
        pinsOrder[i++].style.setProperty("--bg-color","white");
        feedback.whitePegs -= 1;
    }
    while(feedback.blackPegs > 0) {
        pinsOrder[i].classList.add("answer-pin");
        pinsOrder[i++].style.setProperty("--bg-color","black");
        feedback.blackPegs -= 1;
    }

    guessno += 1;

}

const getFormattedDate = () => {
    const date = new Date();
    
    const day = date.getDate(); // Day of the month (1-31)
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getFullYear(); // Year (e.g., 2024)

    return `${day} ${month} ${year}`;
};

const date = document.querySelector(".date");
date.textContent = getFormattedDate();

startGame();


