const board = document.querySelector(".board");
let playersturn = document.querySelector(".playersturn");
let game;
const newGameButton = document.getElementById("newgame");
board.addEventListener("click", function triggerPlay(e) {
    playRound(e.target.id);
   });
let playerA = document.getElementById("player1");
let playerB = document.getElementById("player2");
const playersInput = document.querySelector(".playersinput");

let gameboard = function() {
    let playerAlog = [];
    let playerBlog = [];
    function resetGameboard() {
        playerAlog = [];
        playerBlog = [];
    }
    return {playerAlog, playerBlog, resetGameboard};
}();


function createGame() {
    function playerAmove(tile) {
        gameboard.playerAlog.push(tile);
    }
    
    function playerBmove(tile) {
        gameboard.playerBlog.push(tile);
    }

    function checkTriad(playLog) {
        
        if (playLog.length < 3) {
            
            return false;
        } else {
            for (let x = 1; x < 4 ; x++) {
                
                if (
                    playLog.reduce(
                    (acc,curr) =>  curr.includes('1,1') || curr.includes('2,2') || curr.includes('3,3') ? ++acc : acc
                    ,0) === 3
                    || 
                    playLog.reduce(
                    (acc,curr) =>  curr.includes('3,1') || curr.includes('2,2') || curr.includes('1,3') ? ++acc : acc
                    ,0) === 3
                    ||
                    playLog.reduce(
                    (acc,curr) =>  curr.includes(x + ',') ? ++acc : acc
                    ,0) === 3 
                    ||
                    playLog.reduce(
                    (acc,curr) =>  curr.includes(',' + x) ? ++acc : acc
                    ,0) === 3
                    ) {
                        return true;
                    } 
            }
            
        }
    }

    return {playerAmove,playerBmove,checkTriad};
}

// function createPlayer() {
//     const name = prompt("Please enter your name: ", "");
//     return {name};
//}


function playRound(playermove) {
    if (gameboard.playerAlog.length === 0) {
        game.playerAmove(playermove);
        document.getElementById(playermove).textContent = "X";
        document.getElementById(playermove).classList.add("x");
        guideDisplay(`It's ${playerB.value}'s turn. Enter your move: `);
    } else { 
            if (gameboard.playerAlog.length > gameboard.playerBlog.length) {
                if (checkExisting(playermove) === true) {
                    guideDisplay("That's taken!");
                } else {
                    game.playerBmove(playermove);
                    document.getElementById(playermove).textContent = "O";
                    document.getElementById(playermove).classList.add("o");            
                    if (game.checkTriad(gameboard.playerBlog) === true) {
                        gameFinish(`${playerB.value} wins!`);
                        
                    } else {
                        checkDraw() === false ? guideDisplay(`It's ${playerA.value}'s turn. Enter your move: `) : gameFinish("It's a draw!");
                        
                    }
                }
            } else {
                if (checkExisting(playermove) === true) {
                    guideDisplay("That's taken!");
                } else {
                    game.playerAmove(playermove);
                    document.getElementById(playermove).textContent = "X";
                    document.getElementById(playermove).classList.add("x");
                    if (game.checkTriad(gameboard.playerAlog) === true) {
                        gameFinish(`${playerA.value} wins!`);
                    } else {
                        checkDraw() === false ? guideDisplay(`It's ${playerB.value}'s turn. Enter your move: `) : gameFinish("It's a draw!");
                    }
                }
            }
        }
        console.log(gameboard.playerAlog);
        console.log(gameboard.playerBlog);
}

function checkExisting(move) {
    if (gameboard.playerAlog.includes(move) || gameboard.playerBlog.includes(move)) {
        return true;
    } else return false;
}

function checkDraw() {
    return gameboard.playerAlog.length > 4 && gameboard.playerBlog.length > 3;
}

function guideDisplay(message) {
    if (game != "finished")
    playersturn.textContent = message;
}

function gameInitiator() {
    game = createGame();
    
    guideDisplay(`Lets Play! ${playerA.value} you begin!`);
}

function gameFinish(winner) {
    guideDisplay(winner);
    p = document.createElement("p");
    p.textContent = "Start over?";
    playersturn.appendChild(p);
    game = "finished";
    newGameButton.style.display = "block";
    
}

function gameStart() {
    newGameButton.addEventListener("click", function () {
        gameInitiator();
        playersInput.style.display = "none";
        newGameButton.style.display = "none";
        boardRemover();
        boardMaker();
        
    });
}

function boardMaker() {
    let cellDiv;
    for (let x = 1; x < 4; x++) {
        for (let y = 1 ; y < 4; y++) {
            cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            numId = `${x},${y}`;
            cellDiv.setAttribute("id", numId );
            board.appendChild(cellDiv);
        }
    }
}

function boardRemover() {
    while (board.firstChild) {
        board.removeChild(board.lastChild);
    }
    gameboard.playerAlog = [];
    gameboard.playerBlog = [];
    console.log(gameboard.playerAlog.length);
   
}

guideDisplay("Welcome to the classic game! Have fun!");
gameStart();




