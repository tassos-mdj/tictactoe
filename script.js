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

    function playerTurn() {
        
            if (gameboard.playerAlog.length > gameboard.playerBlog.length) {
                return "B";
            } else {
                return "A";
            }
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
    return {playerAmove,playerBmove,playerTurn,checkTriad};
}

const newGame = createGame();

function playRound(playerA, playerB) {
    
}




