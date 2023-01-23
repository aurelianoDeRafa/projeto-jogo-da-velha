//Initial Date


let square = {
    a1: '', a2: '', a3:'',
    b1: '', b2: '', b3:'',
    c1: '', c2: '', c3: ''
}



let player = '' 
let warning = '' 
let playning = false 

reset()

//Events
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})


//functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');

    if(playning && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer()
    }
}


function reset() {
    warning = ''

    let random = Math.floor(Math.random() * 2);

    if(random === 0) {
        player = 'x';
    }else {
        player = 'o';
    }


    for(let i in square){
        square[i] = ''
    }


    playning = true;

    renderSquare();
    renderInfo();
    
}

function renderSquare() {
    
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
       
    }

    checkGame()
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo()
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu'
        playning = false
    }else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu'
        playning = false
    }else if(isFull()){
        warning = 'Deu empate!!'
        playning = false
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'

    ]

    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every((option)=> {
            if(square[option] === player){
                return true
            }else {
                return false
            }
        })

        if(hasWon) {
            return true
        }
    }

    return false
}

function isFull() {
    for(let i in square){
        if(square[i] === '') {
            return false
        }
    }

    return true
}