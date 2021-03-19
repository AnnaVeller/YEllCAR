const canvas = document.getElementById("canvas"); //Получение холста из DOM
const context = canvas.getContext("2d"); //Получение контекста — через него можно работать с холстом

CAR_SPEED = 2;
ROAD_SIZE = {w: 400, h: 600};
CAR_SIZE = {w: 60, h: 100};
STAR_SIZE = {w: 60, h: 60};
SENSITIVITY = 5;
FPS = 60;


class Road {
    constructor(image) {
        this.x = 0;
        this.y = 0;
        this.image = new Image();
        this.image.src = image;
    }

    update() {
        this.y += CAR_SPEED; //При обновлении изображение смещается вниз
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
        // this.y -= CAR_SPEED; //При обновлении изображение смещается вниз
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


function updateFrame() {
    road.update();

    if (Math.random() > 0.97) {
        let x = Math.random() * (ROAD_SIZE.w - STAR_SIZE.w);
        starArray.push(new Star("img/star.svg", x));
    }

    starArray.forEach(star => {
        const y = road.getY();
        star.update(y);

    });

    car.update();

    starArray.forEach((star, index) => {
        const carLeft = car.getX();
        const carRight = car.getX() + CAR_SIZE.w;
        const carTop = car.getY();
        const carBottom = car.getY() + CAR_SIZE.h;

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
            score++;
            delete starArray[index];
        }
    });

    context.fillStyle = "yellow";
    context.font = "24px Verdana";
    context.fillText("Счет: " + score, 0, 20);

    context.fillStyle = "yellow";
    context.font = "24px Verdana";
    context.fillText("Время: " + getTimer(), 0, ROAD_SIZE.h - 10);

    starArray = starArray.filter(star => !!star);


}

function start() {
    score = 0;
    starArray = [];
    beginTime = new Date();
    setInterval(updateFrame, 1000 / FPS); //Состояние игры будет обновляться 60 раз в секунду — при такой частоте обновление происходящего будет казаться очень плавным
}

function getTimer() {
    const nowTime = new Date().getTime();
    const delta = (nowTime - beginTime)/(1000);
    return delta.toFixed(1);

    // const min = date.getMinutes();
    // const sec = date.getSeconds();
    // const ms = date.getMilliseconds();
    // return `${min.toString().padStart(2, 0)}:${sec.toString().padStart(2, 0)}:${ms.toString().padStart(2, 0)}`;
}

const road = new Road("img/road.jpg");
const car = new Car("img/car.svg");
let starArray;
let score;
let beginTime = new Date().getTime();

start();

document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37:
            car.goLeft();
            break;
        case 38:
            car.goUp();
            break;
        case 39:
            car.goRight();
            break;
        case 40:
            car.goDown();
            break;
    }
});
