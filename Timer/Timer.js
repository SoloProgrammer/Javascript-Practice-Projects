(function Countdown() {

    var hour = document.querySelector('.hour');
    var min = document.querySelector('.min');
    var sec = document.querySelector('.sec');

    var startbtn = document.querySelector('.start')
    var stopbtn = document.querySelector('.stop')
    var resetbtn = document.querySelector('.reset')

    function ClearTime() {
        hour.value = ""
        min.value = ""
        sec.value = ""
    }

    function stopTimer(state){

        startbtn.innerHTML = state === "pause" ? "Continue" : "Start"; 
        clearInterval(CounterInterval)
        startbtn.style.display = 'initial';
        stopbtn.style.display = 'none';
    }

    resetbtn.onclick = () => {
        stopTimer();
        ClearTime();
    }

    stopbtn.onclick = () =>{
        stopTimer("pause")
    }

    var CounterInterval = null;
    
    startbtn.addEventListener('click', () => {
        function StartInterval() {
            startbtn.style.display = 'none';
            stopbtn.style.display = 'initial';
            CounterInterval = setInterval(() => {
                timer();
            }, 1000);
        }
        if (hour.value == 0 && min.value == 0 && sec.value == 0) return;
        
        StartInterval();

        function timer() {
            if(sec.value > 60){
                min.value++;
                min.value = `${min.value <= 10 ? "0" : ""}${parseInt(min.value)}`
                sec.value = Number(sec.value) - 59;
                sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value}`
            }
            if(min.value > 60){
                hour.value++;
                hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value}`
                min.value = parseInt(min.value) - 60
                min.value = `${min.value <= 10 ? "0" : ""}${min.value}`

            }
            if (min.value == 0 && hour.value == 0 && sec.value == 0) {
                resetbtn.click();
            }
            else {
                if(sec.value != 0){
                    sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value - 1}`
                }
                else if(min.value != 0 && sec.value == 0){
                    sec.value = 59;
                    min.value = `${min.value <= 10 ? "0" : ""}${min.value - 1}`
                    
                }
                else if(hour.value != 0 & min.value == 0){
                    min.value = 60;
                    hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`
                }
            }
        }
        })


})()
