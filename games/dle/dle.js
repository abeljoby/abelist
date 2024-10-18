const colors = ['red','yellow','green','blue','black','white'];

class guess {
    constructor(num) {
        this.num = num;
        this.color = -1;
        this.button = document.querySelector(`#pick${num}`);
        this.button.addEventListener("click",(e)=> this.changeColor());
    }
    changeColor() {
        this.color = (this.color+1)%colors.length;
        this.button.style.setProperty("--bg-color",colors[this.color]);
        // this.button.style.backgroundColor = colors[this.color];
    }
}

let guess1 = new guess(1);
let guess2 = new guess(2);
let guess3 = new guess(3);
let guess4 = new guess(4);
const guesses = [guess1,guess2,guess3,guess4];

const confirm = document.querySelector("#confirm");
const info = document.querySelector(".info");

confirm.addEventListener("click",(e) => makeGuess());

let guessno = 1;
let answer = '';

function startGame() {
    for(let i=0;i<4;i++) {
        answer += Math.floor(colors.length*Math.random());
    }
    console.log(answer);
}

function makeGuess() {
    let flag = 0;
    for (g of guesses) {
        if(g.color === -1) {
            const warning = document.querySelector(".warning");
            warning.textContent = "Please select a colour!";
            return;
        }
    }
    const pins = document.querySelector(`#answer${guessno}`);
    const tile = document.querySelector(`#guess${guessno}`);
    // console.log(pins.childNodes[0]);
    for([i,g] of guesses.entries()) {
        const pick = document.createElement("div");
        pick.classList.add("pick");
        // pick.style.backgroundColor = colors[g.color];
        pick.style.setProperty("--bg-color",colors[g.color]);
        tile.appendChild(pick);
        if(g.color === +answer[i]) {
            pins.childNodes.item((2*i)+1).classList.add("answer-pin");
            pins.childNodes.item((2*i)+1).style.setProperty("--bg-color","black");
        }
        else if(answer.includes(g.color)) {
            pins.childNodes.item((2*i)+1).classList.add("answer-pin");
            pins.childNodes.item((2*i)+1).style.setProperty("--bg-color","white");
        }
    }
    guessno += 1;
}

startGame();


