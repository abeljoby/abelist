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
            this.button.style.setProperty("background","radial-gradient(circle at 30% 30%,color-mix(in srgb, var(--bg-color), white 30%),var(--bg-color) 40%,color-mix(in srgb, var(--bg-color), black 40%) 70%,color-mix(in srgb, var(--bg-color), black 80%) 100%)");
            this.button.style.setProperty("border","1px solid dimgray");
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

confirm.addEventListener("click",(e) => makeGuess());

let guessno = 1;
let answer = [];

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

    for([i,g] of guesses.entries()) {
        const pick = document.createElement("div");
        pick.classList.add("pick");
        pick.style.setProperty("--bg-color",colors[g.color]);
        tile.appendChild(pick);
    }

    for([i,c] of answer.entries()) {
        if(c === colors[guesses[i].color]) {
            pinsOrder[i].classList.add("answer-pin");
            pinsOrder[i].style.setProperty("--bg-color","black");
        }
        else if(guessedColors.includes(c)) {
            pinsOrder[i].classList.add("answer-pin");
            pinsOrder[i].style.setProperty("--bg-color","white");
        }
    }

    guessno += 1;

}

startGame();


