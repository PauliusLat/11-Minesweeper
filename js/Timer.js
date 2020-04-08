class Timer {
    constructor( parentHeader, parent ){
        this.parent = parent;
        this.parentHeader = parentHeader;
        this.DOM = null;
        this.clock = null;
        this.time = 0;

        this.render();
    }
    render(){
        const HTML = `<div class="counter timer">000</div>`;
        this.parentHeader.insertAdjacentHTML('beforeend', HTML);
        this.DOM = this.parentHeader.querySelector('.counter.timer');
    }
    start(){
            this.clock = setInterval(() => {
                this.time++;
                this.DOM.innerText = this.convert(this.time);
                if(this.time === 999) {
                    this.stop();
                    this.parent.gameOver();
                }
            }, 1000);
    }        

    stop(){
        clearInterval(this.clock);
     }
    convert(number){
        let newNumber = number;
        if(number < 100) newNumber = '0'+newNumber;
        if(number < 10) newNumber = '0'+newNumber;        
        return newNumber;
    }
}

export default Timer;