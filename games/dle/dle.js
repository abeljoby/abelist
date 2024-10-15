class guess {
    constructor(num) {
        this.num = num;
        this.color = -1;
        this.colors = ['red','yellow','green','blue','black','white'];
        this.button = document.querySelector(`#pick${num}`);
        this.button.addEventListener("click",(e)=> this.changeColor());
    }
    changeColor() {
        this.color = (this.color+1)%this.colors.length;
        console.log(this.color);
        this.button.style.backgroundColor = this.colors[this.color];
    }
}

guess1 = new guess(1);
guess2 = new guess(2);
guess3 = new guess(3);
guess4 = new guess(4);

const confirm = document.querySelector("#confirm");



