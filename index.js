const card = document.getElementById("card");
const ScoreCard = document.getElementById("card-score");
const HScoreCard = document.getElementById("card-score1");

var image = document.getElementById("scream");

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const music = new Audio('music.mp3');

var controle = document.querySelector('.controle')

let x = 400, y = 0, w = 20, h = 150
let x1 = 400, y1 = 250, w1 = 20, h1 = 200
let y2 = 350, x2 = 0, w2 = 50, h2 = 50
let s = 1000, s1 = 1000, nh = 150, ny1 = 250
let Pressed = false
let interval = null
let score = 0, Hscore = 0

drawScore();
Navigation();
obsUp();
obsDown();
Bird();

// manual key controle code start 
let i1,i2;
controle.addEventListener('touchstart', ()=>{
    controle.style.background = 'red'
    clearInterval(i2)
    i1 = setInterval(()=>{
        if (y2 > 0) {
            y2 = y2 - 7
        }
    }, 30)
})
controle.addEventListener('touchend', ()=>{
    controle.style.background = 'green'
    clearInterval(i1)
    i2 = setInterval(() => {
        if (y2 < 350) {
            y2 = y2 + 2
        }
    }, 30);
})
// manual key controle code start 

function restartGame(button) {

    if (!interval) {
        card.style.display = "none";
        score = 0

        interval = setInterval(() => {
            music.play();
            //leftWard obstcle 
            x = x - 5
            x1 = x1 - 5
            s = s - 5
            s1 = s1 - 5

            // Controle Bird
            Navigation();

            //Bird UpWard
            if (Pressed === true && y2 > 0) {
                y2 = y2 - 5
            }
            //Bird DownWard
            if (Pressed === false && y2 < 350) {
                y2 = y2 + 2
            }

            //increases scorecard
            score = score + 1
            updateScore(score);

            //check game over
            collision();

            // Farmula of random number
            randomNumber();

            ctx.clearRect(0, 0, 400, 400)

            drawScore();
            obsUp()
            obsDown()
            Bird()
            obsUp1();
            obsDown1();
            // Bird1();
        }, 30);
    }
}

function obsUp() {
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}
function obsDown() {
    ctx.beginPath()
    ctx.rect(x1, y1, w1, h1)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}
function Bird() {

    var image = document.getElementById("scream");
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, x2, y2, w2, h2)
}
// function Bird() {
//     ctx.beginPath()
//     ctx.rect(x2, y2, w2, h2)
//     ctx.fillStyle = "#FB2576"
//     ctx.fill()
//     ctx.closePath()
// }


function obsUp1() {
    ctx.beginPath()
    ctx.rect(s, y, w, nh)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}
function obsDown1() {
    ctx.beginPath()
    ctx.rect(s1, ny1, w1, h1)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}
// function Bird1(){

//     var image = document.getElementById("scream");
//     var canvas = document.getElementById("canvas");
//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(image, x2, y2, w2, h2)
//  }
// function Bird1() {
//     ctx.beginPath()
//     ctx.rect(x2, y2, w2, h2)
//     ctx.fillStyle = "#FB2576"
//     ctx.fill()
//     ctx.closePath()
// }

function collision() {
    if (w2 >= x1 + 2 && y2 + h2 >= y1 + 2) {
        music.pause();
        x = 400, y = 0, w = 20, h = 150
        x1 = 400, y1 = 250, w1 = 20, h1 = 200
        y2 = 350, x2 = 0, w2 = 50, h2 = 50
        s = 1000, s1 = 1000
        Pressed = false
        clearInterval(interval);
        interval = null;
        card.style.display = "block";
    }
    if (w2 >= x + 2 && y2 <= h - 3) {
        music.pause();
        x = 400, y = 0, w = 20, h = 150
        x1 = 400, y1 = 250, w1 = 20, h1 = 200
        y2 = 350, x2 = 0, w2 = 50, h2 = 50
        s = 1000, s1 = 1000
        Pressed = false
        clearInterval(interval);
        interval = null;
        card.style.display = "block";
    }
    if (w2 >= s1 + 2 && y2 + h2 >= ny1 + 2) {
        music.pause();
        x = 400, y = 0, w = 20, h = 150
        x1 = 400, y1 = 250, w1 = 20, h1 = 200
        y2 = 350, x2 = 0, w2 = 50, h2 = 50
        s = 1000, s1 = 1000
        Pressed = false
        clearInterval(interval);
        interval = null;
        card.style.display = "block";
    }
    if (w2 >= s + 2 && y2 <= nh - 3) {
        music.pause();
        x = 400, y = 0, w = 20, h = 150
        x1 = 400, y1 = 250, w1 = 20, h1 = 200
        y2 = 350, x2 = 0, w2 = 50, h2 = 50
        s = 1000, s1 = 1000
        Pressed = false
        clearInterval(interval);
        interval = null;
        card.style.display = "block";
    }

}

function randomNumber() {
    let a = 100;
    let b = 170;
    let a1 = 230;
    let b1 = 300;
    if (x <= -19) {
        x = 400
        x1 = 400
        h = Math.round(a + (b - a) * Math.random())
        y1 = Math.round(a1 + (b1 - a1) * Math.random())
    }

    if (x == 200) {
        s = 400
        s1 = 400
        if (s == 400) {
            nh = Math.round(a + (b - a) * Math.random())
            ny1 = Math.round(a1 + (b1 - a1) * Math.random())
        }

        // count = 0
    }
}

function Navigation() {
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    function handleKeyDown(e) {
        if (e.key === "ArrowUp") {
            Pressed = true
        }
    }
    function handleKeyUp(e) {
        if (e.key === "ArrowUp") {
            Pressed = false
        }
    }
}

function updateScore(score) {
    ScoreCard.innerHTML = score

    if (score > Hscore) {
        Hscore = score
    }
    HScoreCard.innerHTML = Hscore
}
function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = "black"
    ctx.fill();
    ctx.fillText("score: " + score, 180, 10);
    if (score > Hscore) {
        Hscore = score
    }
    ctx.fillText("Hscore: " + Hscore, 180, 20);
    ctx.closePath();
}
