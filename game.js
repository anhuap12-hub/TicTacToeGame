const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X','O'];
let currentPlayer = players[0];

const endMessage = document.createElement('h2') && document.getElementById('endMessage');
endMessage.textContent = 'X`s turn!';
endMessage.className = "Xturn1";
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
const emojiBtn = document.getElementById('emojiButton');
const emojigrid = document.getElementById('emojiGrid');
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') sendMessage();
});
const emojis = ['😀','😁','😂','🤣','😅','😊','😍','😘','😎','😇',
  '🤩','😋','😜','🤔','🤨','😢','😭','😡','🤯','😱',
  '👍','👎','🙏','👏','🙌','🤝','💪','👀','🎉','💔',
  '❤️','💖','🔥','🌟','✨','🌈','🍕','🍔','🍟','🍩',
  '⚽','🏀','🎮','🎵','🎶','🚀','✈️','🏝️','🌍','💡'];
const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let gameOver = false; // <-- Add this flag

for (let i=0; i < squares.length;i++){
    squares[i].addEventListener('click', () => {
        if (gameOver) return; // <-- Prevent moves after win/tie
        if(squares[i].textContent !== ''){
            return;
        }
        squares[i].textContent = currentPlayer;
        if(checkWin(currentPlayer)){
            endMessage.textContent = `Game over! ${currentPlayer} wins!`;
            endMessage.className ="winmessage";
            gameOver = true; // <-- Set flag
            if(currentPlayer === 'X'){
                scoreX++;
                scoreXElement.textContent = scoreX;
            }else {
                scoreO++;
                scoreOElement.textContent = scoreO;
            }
            return;
        }
        if(checkTie()){
            endMessage.textContent = `Game over! It's a tie!`;
            gameOver = true; // <-- Set flag
            return;
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        if(currentPlayer == players[0]){
            endMessage.textContent = 'X`s turn!';
            endMessage.className = "Xturn2";
        } else {
            endMessage.textContent = 'O`s turn!';
            endMessage.className = "Oturn1";
        }
    });
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

function checkTie() {
    for(let i=0; i<squares.length;i++){
        if(squares[i].textContent === ''){
            return false;
        }
    }
    return true;
}

function restartButton() {
    for (let i=0; i<squares.length;i++){
        squares[i].textContent = '';
    }
    endMessage.textContent = 'X`s turn!';
    currentPlayer = players[0];
    gameOver = false; // <-- Reset flag
}

function clearScore() {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
}

const playerXName = localStorage.getItem("playerX") || "Player X";
const playerOName = localStorage.getItem("playerO") || "Player O";
let chatTurn = 'X';

function sendMessage() {
    const msg = chatInput.value.trim();
    if(msg === '') return;
    const p = document.createElement('p');
    if(chatTurn === 'X'){
        p.textContent = playerXName + ": " + msg;
        p.classList.add("playerX");
        chatTurn ='O';
    } else {
        p.textContent = playerOName + ": " + msg;
        p.classList.add("playerO");
        chatTurn = 'X';
    }
    chatMessages.appendChild(p);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

emojis.forEach(emoji => {
    const span = document.createElement('span');
    span.textContent = emoji;
    span.style.cursor = 'pointer';
    span.style.fontSize = '22px';
    span.style.margin = '5px';
    span.addEventListener('click', () => {
        chatInput.value += emoji;
        emojigrid.style.display = 'none';
        chatInput.focus();
    });
    emojigrid.appendChild(span);
});

// Toggle emoji grid visibility
emojiBtn.addEventListener('click', () => {
    if (emojigrid.style.display === 'block') {
        emojigrid.style.display = 'none';
    } else {
        emojigrid.style.display = 'block';
    }
});

const gifs = [ 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif',
               'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
               'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
               'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif',
               'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
                'https://media.giphy.com/media/JmBXdjfIblJDi/giphy.gif',
            'https://media.giphy.com/media/d1E2IByItLUuONMc/giphy.gif',
        'https://media.giphy.com/media/6pUBXVTai18Iw/giphy.gif',
    'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',
'https://media.giphy.com/media/3o6Zt8MgUuvSbkZYWc/giphy.gif',
'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
'https://media.giphy.com/media/JmBXdjfIblJDi/giphy.gif',
'https://media.giphy.com/media/d1E2IByItLUuONMc/giphy.gif',
'https://media.giphy.com/media/6pUBXVTai18Iw/giphy.gif',
'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',
'https://media.giphy.com/media/3o6Zt8MgUuvSbkZYWc/giphy.gif'
];

const gifgrid = document.getElementById('gifGrid');
const gifBtn = document.getElementById('gifButton');
//fill gif grid with preview images
gifs.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.style.width = '75px';
    img.style.height = '100px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '10px';
    img.style.cursor = 'pointer';
    img.style.margin = '5px';
    img.addEventListener('click', () => {
        const p = document.createElement('p');
        if ( chatTurn ==='X'){
            p.textContent = playerXName + ": ";
            p.classList.add("playerX");
            chatTurn ='O';
        }else {
            p.textContent = playerOName + ": ";
            p.classList.add("playerO");
            chatTurn = 'X';
        }
        const gifImg = document.createElement('img');
        gifImg.src = url;
        gifImg.style.width = '150px';
        gifImg.style.height = '150px';
        gifImg.style.objectFit = 'cover';
        gifImg.style.borderRadius = '10px';
        gifImg.scrollTop = gifImg.scrollHeight;
        p.appendChild(gifImg);
        chatMessages.appendChild(p);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        gifgrid.style.display = 'none';
    });
    gifgrid.appendChild(img);
});

gifBtn.addEventListener("click", () => {
    if (gifgrid.style.display === 'block'){
        gifgrid.style.display = 'none';
    }else{
        gifgrid.style.display = 'block';
    }
});

const closeGifGridBtn = document.getElementById('closeGifGrid');
closeGifGridBtn.addEventListener('click', () => {
    gifgrid.style.display = 'none';
});

const closeEmojibtn = document.getElementById('closeEmojiGrid');
closeEmojibtn.addEventListener('click', () => {
    emojigrid.style.display = 'none'
});
gifgrid.style.display = 'none';
emojigrid.style.display = 'none';

document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById("playButton");
    if (playBtn) {
        playBtn.addEventListener('click', function () {
            const player1 = document.getElementById("Player1Name")?.value.trim();
            const player2 = document.getElementById("Player2Name")?.value.trim();
            if (player1 && player2) {
                localStorage.setItem("playerX", player1);
                localStorage.setItem("playerO", player2);
                window.location.href = "index.html";
            } else {
                alert("Please enter both player names!");
            }
        });
    }
});