const start=document.getElementById("start");
const stop=document.getElementById("stop");
const reset=document.getElementById("reset");
const timer=document.getElementById("timer");
const music=document.getElementById("music");

let timeLeft=1500;
let interval;

const updateTimer = () => {
    const minutes=Math.floor(timeLeft/60);
    const seconds=timeLeft%60;
    timer.textContent=`${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
};
const startTimer = () => {
    if (interval) return;
    music.play();
    interval=setInterval(() => {
    timeLeft--;
    updateTimer();
    if(timeLeft<=0){
        clearInterval(interval);
        interval=null;
        music.pause();
        music.currentTime=0;
        alert("Congratulations!, Time is up.");
        timeLeft=1500;
        updateTimer();
        }
    }, 1000);
};
const stopTimer = () => {
    clearInterval(interval);
    interval=null;
    music.pause();
};
const resetTimer=() => {
    clearInterval(interval);
    interval=null;
    timeLeft=1500;
    updateTimer();
    music.pause();
    music.currentTime=0;
}
start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click",resetTimer);
