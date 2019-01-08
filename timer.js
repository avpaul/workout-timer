class WorkoutTimer{
    constructor(controls,ui){
        this.state="inactive";
        this.value=0;
        this.controls = {...controls};
        this.ui = {...ui};
    }

    timer(){
        // let value = initValue;
        let clock = ()=>{
            this.value++;
            this.updateUI(this.value);
        };
        return setInterval(clock.bind(this),1000);

    }

    // get the value in sec then changes it to appropriate values
    // then updates the ui
    updateUI(value){

        // A padding utility for adding zero on the left side 
        //when the value is a single digit
        let leftPad = (n)=>{
            //make the value a string and check it length
            if (n.toString().length === 1 ) {
                return "0" + n.toString();
            } else {
                return n;
            }
        };

        let v = value;
        if(v>60){
            let n = (v/60);
            if (n < 60) {
                this.ui.minutes.innerText = leftPad(Math.floor(n));
                this.ui.seconds.innerText = leftPad(v-(Math.floor(n)*60))
            } else if (n > 60){
                this.ui.hours.innerText = leftPad(Math.floor(n/60));
                this.ui.minutes.innerText = leftPad(Math.floor(n - (60 * Math.floor(n/60))));
                this.ui.seconds.innerText = leftPad(v - ( 60 * Math.floor(n)))
            } else if (n === 60){
                this.ui.hours.innerText = "01";
                this.ui.minutes.innerText = "00";
                this.ui.seconds.innerText = "00"
            }
        }
        // if the number of seconds are under 60
        else if (v<60){
            this.ui.seconds.innerText = leftPad(v);
        } else if(v === 60){
            // if the number of seconds === 60
            this.ui.seconds.innerText = "00";
            this.ui.minutes.innerText = leftPad(1);
        }

    }
    // this starts or restarts(when it was stopped) the timer
    start(){
        // ignore the event when the timer is active
        if (this.state === "active") {
            return;
        }
        // reset the ui to zeros if state is stopped
        if (this.state === "stopped") {
            this.ui.seconds.innerHTML = "00";
            this.ui.minutes.innerText = "00";
            this.ui.hours.innerText = "00";
        }
        this.counter = this.timer.call(this);
        this.state = "active";
        // update the ui on control buttons
        this.controls.start.classList.remove('active');
        this.controls.start.classList.add('inactive');
        this.controls.pause.classList.remove('inactive');
        this.controls.pause.classList.add('active');
        this.controls.stop.classList.remove('inactive');
        this.controls.stop.classList.add('active');
    }

    // check the timer state if active pause it
    pause(){
        // check if the state is active then pause
        if (this.state === "active") {
            clearInterval(this.counter);
            this.state = "paused";
            this.controls.start.classList.remove('inactive');
            this.controls.start.classList.add('active');
            this.controls.pause.classList.remove('active');
            this.controls.pause.classList.add('inactive');
        }
    }

    // check timer status if paused then replay
    // continue(){
    //     if (this.state === 'paused') {
    //         this.start();
    //     }
    // }

    // stop the timer and keep the final value
    stop() {
        if (this.state === "active" || this.state === "paused"){
            this.state = 'stopped';
            clearInterval(this.counter);
            this.value = 0;
            this.controls.pause.classList.remove('active');
            this.controls.pause.classList.add('inactive');
            this.controls.stop.classList.remove('active');
            this.controls.stop.classList.add('inactive');
            this.controls.start.classList.remove('inactive');
            this.controls.start.classList.add('active');
        }
    }

    addEvents(){
        this.controls.start.addEventListener('click',()=>{this.start()});
        this.controls.stop.addEventListener('click',()=>{this.stop()});
        this.controls.pause.addEventListener('click',()=>{this.pause()})
    }

}

let controls={
    start : document.getElementsByClassName('timer-control_start')[0],
    stop : document.getElementsByClassName('timer-control_stop')[0],
    pause : document.getElementsByClassName( 'timer-control_pause')[0]
};
let ui = {
    seconds: document.getElementsByClassName('timer-counter_seconds')[0],
    minutes: document.getElementsByClassName('timer-counter_minutes')[0],
    hours : document.getElementsByClassName('timer-counter_hours')[0]
};
let timer = new WorkoutTimer(controls,ui);
timer.addEvents();
