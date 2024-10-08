let gameboard = function() {
    const playerAlog = [];
    const playerBlog = [];
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
                    } else return false;
            }
            
        }
    }

    // window.alert("Enter player A details");
    const playerA =  "PLayerA"  //createPlayer();
    // window.alert("Enter player B details");
    const playerB = "PlayerB" //createPlayer();
    

    return {playerA,playerB,playerAmove,playerBmove,checkTriad};
}

// function createPlayer() {
//     const name = prompt("Please enter your name: ", "");
//     return {name};
//}
const board = document.querySelector(".board");
let playersturn = document.querySelector(".playersturn");

function playRound(playermove) {
    if (gameboard.playerAlog.length === 0) {
        game.playerAmove(playermove);
        document.getElementById(playermove).textContent = "A";
        guideDisplay("It's playerB's turn. Enter your move: ");
        // boardHandler();
    } else { 
        if (gameboard.playerAlog.length > 4) {
            gameFinish("It's a draw!");
            
        } else {
        
            if (gameboard.playerAlog.length > gameboard.playerBlog.length) {
                if (checkExisting(playermove) === true) {
                    guideDisplay("That's taken!");
                    // boardHandler();
                } else {
                    game.playerBmove(playermove);
                    document.getElementById(playermove).textContent = "B";            
                    if (game.checkTriad(gameboard.playerBlog) === true) {
                        gameFinish("PlayerB wins!");
                        
                    } else {
                        guideDisplay("It's playerA's turn. Enter your move: ");
                        // boardHandler();
                    }
                }
            } else {
            
                if (checkExisting(playermove) === true) {
                    guideDisplay("That's taken!");
                    // boardHandler();
                } else {
                    game.playerAmove(playermove);
                    document.getElementById(playermove).textContent = "A";
                    if (game.checkTriad(gameboard.playerAlog) === true) {
                        gameFinish("PlayerA wins!");
                        
                    } else {
                        guideDisplay("It's playerB's turn. Enter your move: ");
                        // boardHandler();
                    }
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

function guideDisplay(message) {
    playersturn.textContent = message;
}

let game;

function gameStarter() {
    game = createGame();
    board.addEventListener("click", function (e) {
        playRound(e.target.id);
        });
    guideDisplay("Lets Play! Player A you begin!");
}

function gameFinish(winner) {
    board.removeEventListener("click", function (e) {
        playRound(e.target.id);
        });
    guideDisplay(winner);
    p = document.createElement("p");
    p.textContent = "Start over?";
    playersturn.appendChild(p);
}

gameStarter();


