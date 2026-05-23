const start=document.getElementById("start");
const stop=document.getElementById("stop");
const reset=document.getElementById("reset");
const timer=document.getElementById("timer");
const music=document.getElementById("music");
const mute=document.getElementById("mute");
const classicbutton = document.getElementById("classic");
const focusbutton = document.getElementById("focus");
const productivebutton = document.getElementById("productive");
const fullscreenbutton=document.getElementById("fullscreen");
const darkmodebutton=document.getElementById("darkmode");

function drop(){
    const drop=document.createElement("div");
    drop.classList.add("drops");
    drop.style.left=Math.random()*window.innerWidth+"px";
    drop.style.setProperty("--drift", (Math.random()*60-30)+"px");
    drop.style.setProperty("--speed", (Math.random()*1+1)+"s");
    document.body.appendChild(drop);
    setTimeout(()=>{drop.remove();},4000);
}
const classic=1500;
const focus=2100;
const productive=2700;
const shortBreak=300;
const longBreak=900;

let timeLeft=1500;
let interval;
let isMuted=false;
let rainInterval;
let cycle=0;
let currentMode = classic;

const updateTimer = () => {
    const minutes=Math.floor(timeLeft/60);
    const seconds=timeLeft%60;
    timer.textContent=`${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
};
const startTimer = () => {
    if (interval) return;
    music.play();
    rainInterval=setInterval(drop, 100);
    interval=setInterval(() => {
    timeLeft--;
    updateTimer();
    if(timeLeft<=0){
        clearInterval(interval);
        clearInterval(rainInterval);
        interval=null;
        music.pause();
        music.currentTime=0;
        cycle++;
        if(cycle%2===1){
            timeLeft=currentMode;}
        else if(cycle%4===0){
            timeLeft=longBreak;
        } else {
            timeLeft=shortBreak;
        }
        updateTimer();
        startTimer();
        }
    }, 1000);
};
const stopTimer = () => {
    clearInterval(interval);
    interval=null;
    clearInterval(rainInterval);
    music.pause();
};
const resetTimer=() => {
    clearInterval(interval);
    interval=null;
    clearInterval(rainInterval);
    timeLeft=1500;
    updateTimer();
    music.pause();
    music.currentTime=0;
}
const setMode = (time) => {
    clearInterval(interval);
    interval=null;
    timeLeft=time;
    currentMode=time;
    updateTimer();
    music.pause();
    music.currentTime=0;
}
classicbutton.addEventListener("click", () => setMode(classic));
focusbutton.addEventListener("click", () => setMode(focus));
productivebutton.addEventListener("click", () => setMode(productive));

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click",resetTimer);
mute.addEventListener("click", () => {
    isMuted=!isMuted;
    if(isMuted){
        music.muted=true;
        mute.textContent="Turn the Music on";
    } else {
        music.muted=false;
        mute.textContent="Mute Music";
    }
});
fullscreenbutton.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenbutton.textContent="Exit";
    }else{
        document.exitFullscreen();
        fullscreenbutton.textContent="Fullscreen ⛶";
    }
});
darkmodebutton.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
    if(document.body.classList.contains("darkmode")){
        darkmodebutton.textContent="Light Mode ☀️";
    } else {
        darkmodebutton.textContent="Dark Mode 🌙";
    }
});