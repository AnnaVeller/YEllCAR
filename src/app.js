const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const CAR_SPEED = 2;
const ROAD_SIZE = {w: 400, h: 600};
const CAR_SIZE = {w: 60, h: 100};
const STAR_SIZE = {w: 60, h: 60};
const SENSITIVITY = 5;
const FPS = 120;
const SCORE_WIN = 10;
const START = "СТАРТ";
const END = "НАЧАТЬ ЗАНОВО";
const RECORD_BEGIN = 1000;

let game;
let record = RECORD_BEGIN;

// Звуковые файлы
const clashAudio = new Audio();
clashAudio.src = "audio/clash.wav";

const roadAudio = new Audio();
roadAudio.loop = true;
roadAudio.src = "audio/road.wav";

const beginAudio = new Audio();
beginAudio.src = "audio/car_engine3.wav";

const winAudio = new Audio();
winAudio.src = "audio/win.wav";


class Road {
    constructor(image) {
        this.x = 0;
        this.y = 0;
        this.image = new Image();
        this.image.src = image;
    }

    update() {
        context.drawImage(this.image, 0, this.y, ROAD_SIZE.w, ROAD_SIZE.h);
        if (this.y > 0) {
            context.drawImage(this.image,
                0,
                this.y - ROAD_SIZE.h,
                ROAD_SIZE.w,
                ROAD_SIZE.h);
        }
        if (this.y > ROAD_SIZE.h) {
            this.y = 0;
        }
        this.y += CAR_SPEED;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

class Car {
    constructor(image,
                x = canvas.width / 2 - CAR_SIZE.w / 2,
                y = canvas.height - CAR_SIZE.h - 200) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = image;
    }

    update() {
        context.drawImage(this.image, this.x, this.y, CAR_SIZE.w, CAR_SIZE.h);
    }

    goRight() {
        this.x += SENSITIVITY;
    }

    goLeft() {
        this.x -= SENSITIVITY;
    }

    goUp() {
        this.y -= SENSITIVITY;
    }

    goDown() {
        this.y += SENSITIVITY;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

class Star {
    constructor(image, x) {
        this.x = x;
        this.y = -STAR_SIZE.h;
        this.image = new Image();
        this.image.src = image;
    }

    update() {
        this.y += CAR_SPEED;
        context.drawImage(this.image, this.x, this.y, STAR_SIZE.w, STAR_SIZE.h);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

class Game {

    constructor() {
        this.score = 0;
        beginAudio.play();
        roadAudio.play();
        this.road = new Road("img/road.jpg");
        this.car = new Car("img/car.svg");
        this.starArray = [];
        this.beginTime = new Date().getTime();
        this.time = 0;
        this.timerUpdateId = setInterval(this.updateFrame.bind(this), 1000 / FPS);
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.car.goLeft();
                    break;
                case 'ArrowUp':
                    this.car.goUp();
                    break;
                case 'ArrowRight':
                    this.car.goRight();
                    break;
                case 'ArrowDown':
                    this.car.goDown();
                    break;
            }
        });
    }

    getTimer() {
        const nowTime = new Date().getTime();
        const delta = (nowTime - this.beginTime) / (1000);
        return delta.toFixed(1);
    }

    addStars(count = 0.97) {
        if (Math.random() > count) {
            let x = Math.random() * (ROAD_SIZE.w - STAR_SIZE.w);
            this.starArray.push(new Star("img/star.svg", x));
        }
    }

    deleteIfWeStrike() {
        this.starArray.forEach((star, index) => {
            const carLeft = this.car.getX();
            const carRight = this.car.getX() + CAR_SIZE.w;
            const carTop = this.car.getY();
            const carBottom = this.car.getY() + CAR_SIZE.h;

            const starLeft = star.getX();
            const starRight = star.getX() + STAR_SIZE.w;
            const starTop = star.getY();
            const starBottom = star.getY() + STAR_SIZE.h;

            // console.log('car', carLeft, carTop, carRight, carBottom);
            // console.log('star', starLeft, starTop, starRight, starBottom);

            if (
                (carRight > starLeft && carLeft < starRight ||
                    carLeft < starRight && carRight > starLeft) &&
                (carBottom > starTop && carTop < starBottom ||
                    carTop < starBottom && carBottom > starTop
                )
            ) {
                clashAudio.play();
                this.score++;
                delete this.starArray[index];
            }
        });
        this.starArray = this.starArray.filter(star => !!star);
    }

    drawScore() {
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillStyle = "yellow";
        context.font = "24px Verdana";
        context.fillText("Счет: " + this.score, 0, 0);
    }

    drawTime() {
        context.textAlign = "left";
        context.textBaseline = "bottom";
        context.fillStyle = "yellow";
        context.font = "24px Verdana";
        context.fillText("Время: " + this.time, 0, ROAD_SIZE.h);
    }

    drawRecord() {
        if (record !== RECORD_BEGIN) { // чтобы при первой игре ничего не отображалось
            context.textAlign = "left";
            context.textBaseline = "bottom";
            context.fillStyle = "yellow";
            context.font = "24px Verdana";
            context.fillText("Рекорд: " + record, 0, ROAD_SIZE.h - 25);
        }
    }

    doWeEnd() {
        if (this.score >= SCORE_WIN) {
            if (+this.time < record) {
                record = +this.time;
            }
            roadAudio.pause();
            winAudio.play();
            clearInterval(this.timerUpdateId);
            // сделать кнопку конца сразу после того, как удалим интеравал
            setTimeout(() => new Button([END, `Счет: ${this.score}`, `Время: ${this.time}`], END));
            return true;
        }
        return false;
    }

    updateFrame() {
        this.time = this.getTimer();
        if (this.doWeEnd()) {
            // end of game
        } else {
            this.road.update();
            this.addStars();

            this.starArray.forEach(star => {
                const y = this.road.getY();
                star.update(y);
            });

            this.car.update();
            this.deleteIfWeStrike();
            this.drawScore();
            this.drawTime();
            this.drawRecord();
        }
    }

    getPlayerTime() {
        return this.time;
    }

}

class Button {
    constructor(textArr, action = "DEFAULT") {
        this.height = 100 + (textArr.length - 1) * 10;
        this.width = 250;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height / 2 - this.height / 2;
        context.beginPath();
        context.fillStyle = "yellow";
        context.rect(this.x, this.y, this.width, this.height);
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.stroke();
        context.closePath();
        context.font = "24px Verdana";
        context.fillStyle = "black";
        context.textAlign = "center"; // x,y текста - его центр
        context.textBaseline = "middle";
        context.fillText(textArr[0], this.x + this.width / 2, this.y + this.height / 2);
        let h = 25;
        for (let i = 1; i < textArr.length; i++) {
            context.font = "18px Verdana";
            context.fillText(textArr[i], this.x + this.width / 2, this.y + this.height / 2 + i * h);
            h = 20;
        }

        const listener = event => {
            const mousePos = this.getMousePos(event);
            if (this.isInside(mousePos)) {
                if (action === START) {
                    canvas.removeEventListener('click', listener, false);
                    game = new Game();
                } else if (action === END) {
                    canvas.removeEventListener('click', listener, false);
                    App.init();
                }

            }
        }
        canvas.addEventListener('click', listener, false);

    }

    //Function to get the mouse position
    getMousePos(event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    //Function to check whether a point is inside a rectangle
    isInside(pos) {
        return pos.x > this.x && pos.x < this.x + this.width && pos.y < this.y + this.height && pos.y > this.y
    }

}

class App {
    static init() {
        const road = new Image();
        road.src = "img/road.jpg";

        road.onload = function () {
            context.drawImage(road, 0, 0, ROAD_SIZE.w, ROAD_SIZE.h);
            const startBtn = new Button([START], START);
        };
    }
}


App.init();
