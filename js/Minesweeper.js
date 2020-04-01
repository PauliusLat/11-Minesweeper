
class Minisweeper{
    constructor(target, widht, height, bombsPercentage){
        this.target = target;
        this.DOM = null;
        this.widht = widht;
        this.height = height;
        this.bombs = bombsPercentage;
        this.bombsCount = 1;

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
        let cellHTML = ``;
        for (let i = 0; i < this.widht*this.height; i++) {
            cellHTML += `<div class="cell">${i+1}</div>`
        }


        let HTML = `<div class="header">
                        <div class="counter bombs">099</div>
                        <div class="smile">: )</div>
                        <div class="counter timer">000</div>
                    </div>
                    <div class="field">
                        ${cellHTML}
                    </div>`;
        this.DOM.classList.add('minesweeper')
        this.DOM.innerHTML = HTML;

        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', (event) => {this.clickCell(event)})
        }
    }
    clickCell(event){
        console.log(event.target.innerText);
                
    }

}
const game = new Minisweeper("#game", 10, 10, 15);

console.log(game);
