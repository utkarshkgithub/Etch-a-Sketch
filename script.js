const container=document.querySelector(".container");
const submit=document.querySelector("button");
let gridSize=8;
let shadowMode=false,greyMode=false,rainbowMode=true,normalMode=false;
submit.addEventListener("click",()=>{
    const userInput=document.querySelector("input");
    let newsize=userInput.value;
    if(newsize>100 || isNaN(newsize) || newsize===""){
        window.alert("Enter a number less than equal to 100");
    }
    else {
        console.log(newsize);
        gridSize=userInput.value;
        userInput.value="";
        deletegrid();
        creategrid();
    }
})
function creategrid(){
    for(let i=0;i<gridSize;i++){
        const bigbox=document.createElement("div");
        container.append(bigbox);
        bigbox.classList.add("bigbox");
        for(let j=0;j<gridSize;j++){
            const smallbox=document.createElement("div");
            smallbox.classList.add("smallbox");
            smallbox.addEventListener("mouseover",()=>{
                if(shadowMode) backgroundShadow(smallbox);
                if(rainbowMode) randomColor(smallbox);
                if(greyMode) greyColor(smallbox);
                if(normalMode){
                    smallbox.style.background="black";
                }
            })
            bigbox.appendChild(smallbox);
        }
    }
}

function deletegrid(){
    let bigbox=document.querySelectorAll(".bigbox");
    bigbox.forEach((big)=>{
        big.remove();
    })
}

creategrid();

function backgroundShadow(box){
    let opaceValue=1;
    const computedStyle = window.getComputedStyle(box);
    const backgroundColor = computedStyle.backgroundColor;
    const rgbaValues = backgroundColor.match(/rgba?\((\d+), (\d+), (\d+), ([\d.]+)\)/);
                if (rgbaValues && rgbaValues.length === 5) {
                    opaceValue= parseFloat(rgbaValues[4]);
                }
    let minOpaceValue=Math.min(opaceValue+0.1,1);
    box.style.cssText=`background:rgba(0,0,0,${minOpaceValue});`;
}

function greyColor(box){
    let first=randomise();
    box.style.cssText=`background:rgb(${first},${first},${first});`;
}

function randomColor(box){
    box.style.cssText=`background:rgb(${randomise()},${randomise()},${randomise()})`
}

function randomise(){
    let rand=Math.random();
    rand*=255;
    rand=Math.round(rand);
    return rand;
}

const modes=document.querySelectorAll(".mode");
modes.forEach((mode)=>{
    mode.addEventListener("click",(event)=>{
        mode.textContent="ON";
        mode.style.background="lightgreen";
        let modeId=event.target.id;
        normalMode=false;
        shadowMode=false;
        greyMode=false;
        rainbowMode=false;
        if(modeId==1) normalMode=true;
        if(modeId==2) shadowMode=true;
        if(modeId==3) greyMode=true;
        if(modeId==4) rainbowMode=true;
        modes.forEach(restMode=>{
            if(restMode!=mode){
                restMode.textContent="OFF";
                restMode.style.background="white";
            }
        })
    })
})

const erase=document.querySelector(".erase");
erase.addEventListener("click",()=>erasing());
function erasing(){
    deletegrid();
    creategrid();
}