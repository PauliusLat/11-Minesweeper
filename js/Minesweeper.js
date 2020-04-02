import Cell from './Cell.js';

class Minisweeper{
    constructor(target, widht, height, bombsPercentage){
        this.target = target;
        this.DOM = null;
        this.DOMfield = null;
        this.widht = widht;
        this.height = height;
        this.bombs = bombsPercentage;
        this.bombsCount = 1;
        this.clickCount = 0;

        this.init();
    }
    init(){
        this.validate();
        this.renderGame();
    }
    validate(){
        const DOM = document.querySelector(this.target);
        if(!DOM){
            throw `DOM data not valid`;
        }
        this.DOM = DOM;
        
        if(typeof(this.widht)!=='number' ||
            this.widht < 1 ||
            this.widht % 1 > 0 ){
            throw "Netinkama plocio reiksme!";
        }
        if(typeof(this.height)!=='number' ||
            this.height < 2 ||
            this.height % 1 > 0 ){
            throw "Netinkama aukscio reiksme!";
        }
        if(typeof(this.bombs) !== 'number' ||
            this.bombs <= 0 ||
            this.bombs >= 100 ){
                throw `netinkamas bombu kiekis!`;
        }
        const bombsCount = Math.floor(this.widht * this.height * this.bombs / 100);
        if(this.bombsCount > 0){
            this.bombsCount = bombsCount;
        }
        
    }
    renderGame(){
    
        let HTML = `<div class="header">
                        <div class="counter bombs">099</div>
                        <div class="smile">: )</div>
                        <div class="counter timer">000</div>
                    </div>
                    <div class="field"></div>`;
        this.DOM.classList.add('minesweeper')
        this.DOM.innerHTML = HTML;
        this.DOMfield  = this.DOM.querySelector(`.field`);

        for (let i = 0; i < this.widht*this.height; i++) {
            new Cell(i, this);
        }
    }
    createBombs(cellIndex){
        console.log('creating bombs'+cellIndex);

        let list = [];
        for(let i = 0; i<this.bombs; i++){
            const position = Math.floor(Math.random()*this.widht*this.height);
            if(list.indexOf(position === -1 && position!== cellIndex)){
                list.push(position);
        
            }
            else{i--;}
        }
    }
    checkCell(cellIndex){
        if(this.clickCount===0){
            this.createBombs(cellIndex);
            this.clickCount++;
        }
    }

}
const game = new Minisweeper("#game", 10, 10, 15);

console.log(game);
