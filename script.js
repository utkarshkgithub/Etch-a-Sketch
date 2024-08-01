const container=document.querySelector(".container");
const submit=document.querySelector("button");
let gridSize=8;
submit.addEventListener("click",()=>{
    const userInput=document.querySelector("input");
    gridSize=userInput.value;
    console.log(gridSize);
    if(userInput.value>100 || isNaN(userInput.value)){
        window.alert("Enter a number less than equal to 100");
        return ;
    }
    deletegrid();
    creategrid();
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
                background(smallbox);
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

function background(box){
    box.style.background="black";
}