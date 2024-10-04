const boxes=document.querySelectorAll(".box");
const gameinfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");
 let currentPlayer;
 let gameGrid;

 const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

// intialise 
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // for ui empty
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";  
        //one more thing is missing intialise css porperties again
        box.classList=`box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameinfo.innerText=`current Player-${currentPlayer}`;
 
}   
initGame();

function swapturn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
gameinfo.innerText=`current Player-${currentPlayer}`;

}
//game should be over 
function checkgameOver(){
//empty
let answer="";
     winningPositions.forEach((position)=>{
        //all three boxes are non empty and should be same value
if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="" )
    && (gameGrid[position[0]]==gameGrid[position[1]]) && (gameGrid[position[1]]==gameGrid[position[2]])){
    if(gameGrid[position[0]]==="X"){ 
        answer="x";
    }
    else{
        answer="O";
    }
    // disable wala part
    boxes.forEach(box=>{
        box.style.pointerEvents="none";
        
    })
    // now we know x/o is winner
     boxes[position[0]].classList.add("win");
     boxes[position[1]].classList.add("win");
     boxes[position[2]].classList.add("win");
}
     });
     // winner moment check
     if(answer!==""){
        gameinfo.innerText=`${answer}- is the ultimate winner `;
        newGameBtn.classList.add("active");
        return;
     }
     //total index fill check
    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
        fillcount++;}
    });

    //tied moment check
    if(fillcount===9){
     gameinfo.innerText=`This match is Tie between x and o`; 
     newGameBtn.classList.add("active");  
    }
        
    }


     
function handleClick(index){
    if((gameGrid[index])===""){
        // for the user
       boxes[index].innerText=currentPlayer;
      //for the developer
       gameGrid[index]=currentPlayer;
      
       boxes[index].style.pointerEvents="none";
       // swap
       swapturn();
       //check
       checkgameOver();
    }
}
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});
//new button working on clicking
newGameBtn.addEventListener("click",initGame);
