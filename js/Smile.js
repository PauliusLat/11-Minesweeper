class Smile{
    constructor(parentHeader, parent){
        this.parent = parent;
        this.parentHeader = parentHeader;
        this.DOM = null;

        this.render();
    }
    render(){
        const HTML = `<div class="smile">: )</div>`;
        this.parentHeader.insertAdjacentHTML('beforeend', HTML);
        this.DOM = this.parentHeader.querySelector(`.smile`);
        this.DOM.addEventListener('click', () => this.parent.resetGame());
    }

    sad(){
        this.DOM.innerText = `:(`;
        this.DOM.style.backgroundColor = 'red';
    }
    happy(){
        this.DOM.innerText = `: )`;
    }
    win(){
        this.DOM.innerText = `B)`;
        this.DOM.style.backgroundColor = 'green';
    }
}

export default Smile;