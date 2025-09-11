const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X','O'];
let currentPlayer = players[0];

const endMessage = document.createElement('h2');
endMessage.textContent = 'X`s turn!';
endMessage.style.marginTop = '20px';
endMessage.style.textAlign = 'center';
board.after(endMessage);
let scoreX = 0;
let scoreO = 0;
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendButton');

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') sendMessage();
});

const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
] 
for (let i=0; i < squares.length;i++){
    squares[i].addEventListener('click', () => {
        if(squares[i].textContent !== ''){
            return
        }
        squares[i].textContent = currentPlayer;
        if(checkWin(currentPlayer)){
            endMessage.textContent = `Game over! ${currentPlayer} wins!`;
            if(currentPlayer === 'X'){
                scoreX++;
                scoreXElement.textContent = scoreX;
            }else {
                scoreO++;
                scoreOElement.textContent = scoreO;
            }
            return
        }
        if(checkTie()){
            endMessage.textContent = `Game over! It's a tie!`;
            return;
   }   currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
   if(currentPlayer == players[0]){
    endMessage.textContent = 'X`s turn!';
    } else {
    endMessage.textContent = 'O`s turn!';
   }
})
}


function checkWin(currentPlayer) {
    for(let i=0; i< winning_combinations.length;i++){
        const [a,b,c] = winning_combinations[i];
        if(squares[a].textContent === currentPlayer &&
           squares[b].textContent === currentPlayer &&
           squares[c].textContent === currentPlayer){
            return true;
           }
        }
        return false;
    }

    function checkTie(currentPlayer) {
        for(let i=0; i<squares.length;i++){
            if(squares[i].textContent === ''){
                return false;
            }
        }
        return true;
    }
    function restartButton()    {
        for (let i=0; i<squares.length;i++){
            squares[i].textContent = '';
        }
        endMessage.textContent = 'X`s turn!';
        currentPlayer = players[0];
    }
function clearScore() {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
}
let chatTurn = 'X';
function sendMessage() {
    const msg = chatInput.value.trim();
    if(msg === '') return;
    const p = document.createElement('p');
    if(chatTurn ==='X'){
    p.textContent = "Player X: " + msg;
    p.classList.add("playerX");
    chatTurn ='O';
}else {
    p.textContent = "Player O: " + msg;
    p.classList.add("playerO");
    chatTurn = 'X';
}
chatMessages.appendChild(p);
chatInput.value = '';


}