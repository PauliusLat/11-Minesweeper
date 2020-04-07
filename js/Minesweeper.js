import Cell from './Cell.js';
import Smile from './Smile.js';
import BombCounter from './BombCounter.js';
import Timer from './Timer.js';


class Minisweeper{
    constructor(target, widht, height, bombsPercentage){
        this.target = target;
        this.DOM = null;
        this.DOMfield = null;
        this.widht = widht;
        this.height = height;
        this.bombs = bombsPercentage;
        this.bombsCount = 1;

        this.canPlay = true;
        this.clickCount = 0;
        this.bombCounter = null;
        this.timer = null;
        this.smile = null;
        this.cells = [];

        this.init();
    }
    init(){
        this.validate();
        this.renderGame();
    }
    resetGame(){
        this.canPlay = true;
        this.clickCount = 0;
        this.cells = [];
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
    
        let HTML = `<div class="header"></div>
                    <div class="field"></div>`;
        this.DOM.classList.add('minesweeper')
        this.DOM.innerHTML = HTML;
        this.DOM.style.width = (30 * this.widht + 10) +'px';
        this.DOMheader  = this.DOM.querySelector(`.header`);
        this.DOMfield  = this.DOM.querySelector(`.field`);
        this.DOMfield.style.width = (30 * this.widht) + 'px';
        
        this.bombCounter = new BombCounter(this.DOMheader, this.bombsCount);
        this.smile = new Smile(this.DOMheader, this);
        this.timer = new Timer(this.DOMheader);

       

        for (let i = 0; i < this.widht * this.height; i++) {
            const x = i % this.widht;
            const y = (i - x) / this.widht;
            this.cells.push( new Cell(i, x, y, this));
        }
       
    }
    createBombs(cellIndex){
        let list = [];
        for(let i = 0; i<this.bombsCount; i++){
            const position = Math.floor(Math.random()*this.widht*this.height);
            if(list.indexOf(position) === -1 && position!== cellIndex){
                list.push(position);
                this.cells[position].addBomb();
            }
            else{i--;}
        }
    }
    checkCell(cellIndex){
        if(!this.canPlay){
            return;
        }

        if(this.clickCount===0){
            this.createBombs(cellIndex);
        }
        this.clickCount++;

        if(this.cells[cellIndex].hasBomb){
            this.gameOver();
        }
        else{
            const bombsOver = this.calcBombsOver(cellIndex);
            this.cells[cellIndex].showNumber(bombsOver);

            const cx = this.cells[cellIndex].x;
            const cy = this.cells[cellIndex].y;
            if(bombsOver === 0){
                for(let dx = -1; dx<=1; dx++){
                    for(let dy = -1; dy<=1; dy++){
                        if(cx+dx >=0 && cx+dx < this.widht &&
                            cy+dy >= 0 && cy+dy< this.height){
                                const cellOverIndex = cx+dx + (cy+dy) * this.widht;
                                this.cells[cellOverIndex].click();
                            }
                    }
                }

            }
            
        }
        if(this.isWin()){
            this.canPlay = false;
            this.smile.win();
        }
    }

    calcBombsOver(cellIndex){
        let count = 0;
        const currentCell = this.cells[cellIndex];        
        const x = currentCell.x;
        const y = currentCell.y;

        if(x>0 && y>0 &&
            this.cells[cellIndex - this.widht - 1].hasBomb) count++;
        if(y>0 &&
            this.cells[cellIndex - this.widht].hasBomb) count++;
        if(x< this.widht - 1 && y>0 &&
            this.cells[cellIndex - this.widht + 1].hasBomb) count++;
        if(x>0 && 
                this.cells[cellIndex - 1].hasBomb) count++;
        if(x < this.widht -1 && 
            this.cells[cellIndex + 1].hasBomb) count++;
        if(x>0 && y< this.height -1 && 
            this.cells[cellIndex + this.widht -1].hasBomb) count++;
        if(y < this.height -1 && 
            this.cells[cellIndex + this.widht].hasBomb) count++;
        if(x < this.widht -1 && y< this.height -1 &&
            this.cells[cellIndex + this.widht + 1].hasBomb) count++;  

        return count;
    }

    isWin(){
        let cellsLeft = 0;
        for(let i = 0; i<this.cells.length; i++){
            if(!this.cells[i].opened && !this.cells[i].hasBomb){
                cellsLeft++;
            }
        }
        return cellsLeft === 0 ? true : false;        

    }

    gameOver(){
        this.canPlay = false;
        this.smile.sad();
        console.log('Game Over...');
        
    }

}
const game = new Minisweeper("#game", 7, 7, 10);

console.log(game);
