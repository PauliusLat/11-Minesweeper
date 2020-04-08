class BombCounter {
    constructor( parentHeader, bombCount ) {
        this.parentHeader = parentHeader;
        this.bombCount = bombCount;
        this.DOM = null;

        this.render();
    }

    render() {
        const HTML = `<div class="counter bombs">${this.convert(this.bombCount)}</div>`;
        this.parentHeader.insertAdjacentHTML('beforeend', HTML);
        this.DOM = this.parentHeader.querySelector('.counter.bombs');
    }
    update(value){
        if(value === -1 || value === 1){
            this.bombCount += value;
            this.DOM.innerText = this.convert(this.bombCount);   
        }
    }

    convert( number ) {
        let newNumber = number;
        if ( number < 100 && number>= 0 ) newNumber = '0'+number;
        if ( number < 10 && number>= 0 ) newNumber =  '00'+number;
        if ( number < 0 && number > -10) return '-00' + Math.abs(number);
        if ( number < -9  && number > -100) return '-0' + Math.abs(number);

        return newNumber;
    }
}
export default BombCounter;