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
                    (acc,curr) =>  curr.includes(x + ',') ? ++acc : acc
                    ,0) === 3 
                    ||
                    playLog.reduce(
                    (acc,curr) =>  curr.includes(',' + x) ? ++acc : acc
                    ,0) === 3) {
                        return true;
                    } else return false;
            }
            
        }
    }

    window.alert("Enter player A details");
    const playerA = createPlayer();
    window.alert("Enter player B details");
    const playerB = createPlayer();
    

    return {playerA,playerB,playerAmove,playerBmove,checkTriad};
}

function createPlayer() {
    const name = prompt("Please enter your name: ", "");
    return {name};

}


function playRound() {
        let playersturn = document.querySelector(".playersturn");
        const board = document.querySelector(".board");
        let playermove;
        if (gameboard.playerAlog.length > gameboard.playerBlog.length) {
            // playermove = prompt(`It's ${game.playerB.name}'s turn. Enter your move: `, "");
            playersturn.textContent = "It's playerB's turn. Enter your move: ";
            board.addEventListener("click", function (e) {
                                                playermove = e.target.id
                                                console.log(playermove) });
            if (checkExisting(playermove) === true) {
                // window.alert("That's taken!");
                playersturn.textContent = "It's taken!";
                playRound();
            } else {
                game.playerBmove(playermove);
                
                if (game.checkTriad(gameboard.playerBlog) === true) {
                    window.alert(`${game.playerB.name} wins!`);
                } else {
                    playRound();
                }
            }
        } else {
            // playermove = prompt(`It's ${game.playerA.name}'s turn. Enter your move: `, "");
            let playermove;
            playersturn.textContent = "It's playerA's turn. Enter your move: ";
            board.addEventListener("click", function (e) {
                                                playermove = e.target.id
                                                console.log(playermove) });
            if (checkExisting(playermove) === true) {
                //window.alert("That's taken!");
                playersturn.textContent = "It's taken!";
                playRound();
            } else {
                game.playerAmove(playermove);
                
                if (game.checkTriad(gameboard.playerAlog) === true) {
                    window.alert(`${game.playerA.name} wins!`);
                } else {
                    playRound();
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


const game = createGame();
playRound();




