class Cell{
    constructor(index, x, y, parent){
        this.index = index;
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.parentDOM = parent.DOMfield;
        this.DOM = null;
        this.hasBomb = false;
        this.opened = false;
        this.flaged = false;
    

        this.init();
    }

    init() {
        const HTML = `<div id="c_${this.index}"class="cell"></div>`;
        this.parentDOM.insertAdjacentHTML('beforeend', HTML);

        this.DOM = this.parentDOM.querySelector(`#c_${this.index}`);

        this.DOM.addEventListener( 'click', (e) => this.click(e), {once: true} );
        this.DOM.addEventListener('contextmenu', (e) => this.rightClick(e));
    }
    click(event){
        if(this.parent.canPlay && !this.opened && !this.flaged){
            this.DOM.classList.add(`clicked`);
            if(this.hasBomb){
                this.DOM.classList.add('bomb');
            }
            this.parent.checkCell(this.index);
        }        
        // if(this.hasBomb){
        //     this.DOM.innerText ='*';
        //     document.querySelector('.smile').classList.add('lost');            
        //     document.querySelector('.smile').innerText = ':(';            
        // }  
        // document.querySelector('.counter').innerText = `${this.parent.clickCount}`;      
    }
    rightClick(event){
        event.preventDefault();
        if(this.flaged || this.opened){
            this.DOM.classList.remove('flag');
            this.parent.updateBombCounter(1);
        }
        else{
            this.DOM.classList.add('flag');
            this.parent.updateBombCounter(-1);
        }
        this.flaged = !this.flaged;
    }
    addBomb(){
        this.hasBomb = true;
        // this.DOM.innerText = '*';
    }
    showNumber(number){
        this.opened = true;
        if(number>0){
            this.DOM.innerText = number;
        }
    }
}


export default Cell;