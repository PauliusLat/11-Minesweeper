class Cell{
    constructor(cellIndex, parent){
        this.index = cellIndex;
        this.parent = parent;
        this.parentDOM = parent.DOMfield;
        this.DOM = null;

        this.init();
    }

    init() {
        const HTML = `<div id="c_${this.index}"class="cell" ></div>`;
        this.parentDOM.insertAdjacentHTML('beforeend', HTML);

        this.DOM = this.parentDOM.querySelector(`#c_${this.index}`);

        this.DOM.addEventListener( 'click', (e) => this.click(e) );
    }
    click(event){
        this.parent.checkCell(this.index);
    }
}



export default Cell;