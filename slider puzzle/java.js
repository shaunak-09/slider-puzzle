

let turns = 0;
// let rows=2;
// let columns=2;
let rows=prompt("enter no. of rows");
let columns=prompt("enter no. of columns");
let gap=(columns-1)*4+4;
let size=(600-gap)/columns;
let puzzle=[];
let t=0;
let status="";
const board=document.getElementById('board');
 
  let start=new Date();
  let ss=start.getSeconds();
  //console.log(start);
  let button=document.querySelector(".play");
  
 

 

setpuzzle();
randomizePuzzle();
renderPuzzle();
handleInput();
button.addEventListener("click",()=>{button.innerHTML="RESET"});
   button.addEventListener("click",play);
let tim;
function play(){
  
 tim=setInterval(gettime,1000);
function gettime(){
  let time=new Date();
   let cs=time.getSeconds();
  document.getElementById("time").innerText=cs-ss;
}

}

let pause=document.querySelector(".pause");
pause.addEventListener("click",paused);
function paused(){
  clearInterval(tim);
}



button.addEventListener("click", reseet);
function reseet(){
  
  start=new Date();
  ss=start.getSeconds();
  randomizePuzzle1();
  renderPuzzle1();
  
 
}
 let hints=document.getElementById("hint");
 hints.addEventListener("click",hint);



function getRow(pos) {
    return Math.ceil(pos / rows)
}

function getCol(pos) {
    const col = pos % columns;
    if (col === 0) {
        return columns;
    }
    return col;
}

function setpuzzle() {
    
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {
             t++;
            //<img id="0-0" src="1.jpg">
            
             puzzle.push({
                value: t,
                position:t,
                position1:t,
                ro:getRow(t),
                cu:getCol(t),
                
                x: (getCol(t) - 1) * size,
                y: (getRow(t) - 1) * size,
                disabled: false,
            })
            
        }
    }
    
}


function randomizePuzzle() {
    const randomValues = getRandomValues()
    // console.log(randomValues)
    let i = 0
    for (let puzzleItem of puzzle) {
        puzzleItem.value = randomValues[i];
        i++;
    }
    const puzzlemax = puzzle.find((item) => item.value == columns * rows)
    puzzlemax.disabled = true;
    turns=0;
    document.getElementById("turns").innerText = turns;


}
function randomizePuzzle1(){
  const randomValues = getRandomValues1()
    // console.log(randomValues)
    let i = 0
    for (let puzzleItem of puzzle) {
        if(puzzleItem.value==(rpws*columns)){continue;}
        puzzleItem.value = randomValues[i];
        
        i++;
    }
   
    turns=0;
    document.getElementById("turns").innerText = turns;
}

function getRandomValues() {
    const values = [];
    for (let i = 1; i <= columns * rows; i++) {
        values.push(i);
    }

    const randomValues = values.sort(() => Math.random() - 0.5);
    return randomValues;

   
}
function getRandomValues1() {
  const values = [];
  for (let i = 1; i < columns * rows; i++) {
      values.push(i);
  }

  const randomValues = values.sort(() => Math.random() - 0.5);
  return randomValues;

 
}


function renderPuzzle() {
    board.innerHTML = "";
    for (let puzzleItem of puzzle) {
        if (puzzleItem.disabled) {board.innerHTML += `<div id="cell${puzzleItem.ro}${puzzleItem.cu}" class="tile white" style="left:${puzzleItem.x}px;top:${puzzleItem.y}px;width:${size}px;height:${size}px;">
        </div>`}
        else {board.innerHTML += `
            <div id="cell${puzzleItem.ro}${puzzleItem.cu}"  class="tile number" style="left:${puzzleItem.x}px; top:${puzzleItem.y}px;width:${size}px;height:${size}px;" >
                ${puzzleItem.value}
            </div>
        `}
    }
} 

function renderPuzzle1(){
  board.innerHTML = "";
    for (let puzzleItem of puzzle) {
      if (puzzleItem.value==(rows*columns)) {board.innerHTML += `<div id="cell${puzzleItem.ro}${puzzleItem.cu}" class="tile white" style="left:${puzzleItem.x}px;top:${puzzleItem.y}px;width:${size}px;height:${size}px;" >
      </div>`}
      else{
         board.innerHTML += `
            <div id="cell${puzzleItem.ro}${puzzleItem.cu}"  class="tile number" style="left:${puzzleItem.x}px; top:${puzzleItem.y}px;width:${size}px;height:${size}px;">
                ${puzzleItem.value}
            </div>
        `   
    }

}
}

//mouseclick

//  function swapTiles(cell1,cell2,iSx) {
  
//   console.log(cell1,cell2)
  
//   let temp = cell1.position;
//   cell1.position = cell2.position;
//   cell2.position = temp;
//   if(iSx)
//   { temp=cell1.x;
//     cell1.x=cell2.x;
//     cell2.x=temp;
//   }
//   else{
//      temp=cell1.y;
//     cell1.x=cell2.y;
//     cell2.y=temp;
//   }
//   // temp=tile1.className;
//   // tile1.className=tile2.className;
//   // tile2.className=temp;
//   turns += 1;
//         document.getElementById("turns").innerText = turns;
  
// }
function swapPositions(firstPuzzle, secondPuzzle, isX) {
  // position swapping
  let temp = firstPuzzle.position
  firstPuzzle.position = secondPuzzle.position
  secondPuzzle.position = temp

  // x position swapping

  if (isX) {
      temp = firstPuzzle.x
      firstPuzzle.x = secondPuzzle.x
      secondPuzzle.x = temp
  } else {
      // must be y
      temp = firstPuzzle.y
      firstPuzzle.y = secondPuzzle.y
      secondPuzzle.y = temp
  }
  turns += 1;
        document.getElementById("turns").innerText = turns;
}

function clickTile(row,column) {                            
    var cell = document.getElementById("cell"+row+column);
    
    let clas= cell.classList[1];
    //console.log(row,column);

    if (clas!="white") {                             
         //Checking if white tile on the right
         if (column<columns) {  
           if ( document.getElementById("cell"+row+(column+1)).classList[1]=="white") {
            // console.log("cell"+row+(column+1))
            //  let cell11=puzzle.find((item) => item.ro==row && item.cu==column);
            //  let cell22=puzzle.find((item) => item.ro==row && item.cu==(column+1));
            //  swapTiles(cell11,cell22,true);
            moveRight();
             return;
           }
         }
         //Checking if white tile on the left
         if (column>1) {
           if ( document.getElementById("cell"+row+(column-1)).classList[1]=="white") {
             //console.log("cell"+row+(column-1))
            //  let cell11=puzzle.find((item) => item.ro==row && item.cu==column);
            //  let cell22=puzzle.find((item) => item.ro==row && item.cu==(column-1));
            //  swapTiles(cell11,cell22,true);
            moveLeft();
             return;
           }
         }
           //Checking if white tile is above
         if (row>1) {
           if ( document.getElementById("cell"+(row-1)+column).classList[1]=="white") {
           //console.log("cell"+(row-1)+column)
            //  let cell11=puzzle.find((item) => item.ro==row && item.cu==column);
            //  let cell22=puzzle.find((item) => item.ro==(row-1) && item.cu==column);
            //  swapTiles(cell11,cell22,false);
            moveUp();
             return;
           }
         }
         //Checking if white tile is below
         if (row<rows) {
           if ( document.getElementById("cell"+(row+1)+column).classList[1]=="white") {
            //console.log("cell"+(row+1)+column)
            //  let cell11=puzzle.find((item) => item.ro==row && item.cu==column);
            //  let cell22=puzzle.find((item) => item.ro==(row +1) && item.cu==column);
            //  swapTiles(cell11,cell22,false);
            moveDown();
             return;
           }
         } 
    }
    
  }
 




//keyboard

function handleInput() {
  document.addEventListener("keydown", handleKeyDown)
  document.addEventListener("keydown",fixed)
  for(let i=0;i<rows*columns;i++)
  {
    
    let curcell=document.getElementsByClassName("tile")[i];
   //curcell.addEventListener("click",()=>{clickTile(puzzle[i].ro,puzzle[i].cu)})
   
  }
    
  
}
function handleKeyDown(e) {
   e.preventDefault();
  
  switch (e.key) {
      case "ArrowLeft":
          moveLeft()
          
          break
      case "ArrowRight":
          moveRight()
         
          break
      case "ArrowUp":
          moveUp()
          
          break
      case "ArrowDown":
          moveDown()
          
          break
  }
 
  renderPuzzle()
}

function moveLeft() {
    const emptyPuzzle = getEmptyPuzzle()
    const rightPuzzle = getRightPuzzle()
    if (rightPuzzle) {
        swapPositions(emptyPuzzle, rightPuzzle, true)
    }
}
function moveRight() {
    const emptyPuzzle = getEmptyPuzzle()
    const leftPuzzle = getLeftPuzzle()
    if (leftPuzzle) {
        swapPositions(emptyPuzzle, leftPuzzle, true)
    }
}
function moveUp() {
    const emptyPuzzle = getEmptyPuzzle()
    const belowPuzzle = getBelowPuzzle()
    if (belowPuzzle) {
        swapPositions(emptyPuzzle, belowPuzzle, false)
    }
}
function moveDown() {
    const emptyPuzzle = getEmptyPuzzle()
    const abovePuzzle = getAbovePuzzle()
    if (abovePuzzle) {
        swapPositions(emptyPuzzle, abovePuzzle, false)
    }
}



function getRightPuzzle() {
    /* get the puzzle just right to the empty puzzle */
    const emptyPuzzle = getEmptyPuzzle();
    const isRightEdge = (getCol(emptyPuzzle.position) === columns);
    if (isRightEdge) {
        return null;
    }
    const puzzles = getPuzzleByPos(emptyPuzzle.position + 1);
    return puzzles;
}
function getLeftPuzzle() {
    /* get the puzzle just left to the empty puzzle */
    const emptyPuzzle = getEmptyPuzzle();
    const isLeftEdge = (getCol(emptyPuzzle.position) === 1);
    if (isLeftEdge) {
        return null;
    }
    const puzzles = getPuzzleByPos(emptyPuzzle.position - 1);
    return puzzles;
}
function getAbovePuzzle() {
    /* get the puzzle just above to the empty puzzle */
    const emptyPuzzle = getEmptyPuzzle();
    const isTopEdge = (getRow(emptyPuzzle.position) === 1);
    if (isTopEdge) {
        return null;
    }
    const puzzles = getPuzzleByPos(emptyPuzzle.position - columns);
    return puzzles;
}
function getBelowPuzzle() {
    /* get the puzzle just below to the empty puzzle */
    const emptyPuzzle = getEmptyPuzzle();
    const isBottomEdge = (getRow(emptyPuzzle.position) === rows);
    if (isBottomEdge) {
        return null
    }
    const puzzles = getPuzzleByPos(emptyPuzzle.position + columns );
    return puzzles;
}

function getEmptyPuzzle() {
    return puzzle.find((item) => item.disabled);
}

function getPuzzleByPos(pos) {
    return puzzle.find((item) => item.position === pos);
}


function fixed()
{let c=0;
  for(let i=0;i<rows*columns;i++)
  {
    if(puzzle[i].value!=puzzle[i].position)
    c++;
  }
  if(c==0)
  {statuss="won"; }
  else{statuss="playing";}
  
  if(statuss=="won")
{
  button.style.fontSize="20px";
  button.innerHTML="PLAY AGAIN";
  
  document.querySelector(".message").innerText="YOU WIN!";
  document.getElementsByClassName("tile").style.backgroundColor="red";
}
else{
  button.innerHTML="RESET";
 document.querySelector(".message").innerText=" ";
}

}




function hint() {
  let c;
  for(let i=0;i<rows*columns;i++)
  {
    if(puzzle[i].value==puzzle[i].position)
    {
      let correctcell=document.getElementById("cell"+puzzle[i].ro+puzzle[i].cu)
     correctcell.style.backgroundColor="red";
    
  }
}

}
