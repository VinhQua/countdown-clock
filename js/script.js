let countDown;
const audio = document.querySelector('audio');
const clock = document.querySelector('.clock');
const options = document.querySelectorAll('.option');
const endTime = document.querySelector('.end-time');
const showEndTime = function(timeStamp){
    const time = new Date(timeStamp)// Date(timeStamp);
    //console.log(time);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    endTime.textContent = `Come Back At :${hours<10?0:''}${hours}:${minutes<10?0:''}${minutes}`;
    endTime.style.color = 'white';
};
const displayTimer = function(secondLeft){
    const hours = Math.floor(secondLeft/3600);
    const minutes =Math.floor((secondLeft % 3600)/60) ;
    const seconds =secondLeft % 60;
    clock.textContent = `${hours<10?0:''}${hours}:${minutes<10?0:''}${minutes}:${seconds<10?0:''}${seconds}`;
    document.title = `${hours<10?0:''}${hours}:${minutes<10?0:''}${minutes}:${seconds<10?0:''}${seconds}`;
};
const timer = function(seconds){
    displayTimer(seconds);
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds*1000;
    showEndTime(then);
    countDown = setInterval(()=>{
        const secondLeft = Math.round((then - Date.now())/1000);
        displayTimer(secondLeft);
        if (secondLeft <= 0){
            clearInterval(countDown);
            endTime.textContent = `Time's Up! Man!!!`
            document.title = `Time's Up! Man!!!`
            endTime.style.color = 'red';
            audio.currentTime = 0;
            audio.play();
        }
        
    },1000)
    console.log(now);
};

const inputHandler = function(e){
    e.preventDefault();
    timer(this.minutes.value*60);
    this.reset();
};
document.minuteInput.addEventListener('submit',inputHandler);
const optionHandler = function(){
    timer(this.dataset.time);
};
options.forEach(option=> option.addEventListener('click',optionHandler));