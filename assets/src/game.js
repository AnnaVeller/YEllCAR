class Game {
    constructor() {
        this.score = 0;
        soundTrack.src = beginAudio;
        soundTrack.play();
        this.xDown = null;
        this.yDown = null;
        this.road = new Road("assets/img/road.jpg");
        this.car = new Car("assets/img/car.svg");
        this.starArray = [];
        this.bombArray = [];
        this.beginTime = new Date().getTime();
        this.time = 0;
        this.timerUpdateId = setInterval(this.updateFrame.bind(this), 1000 / FPS);
        this.isWin = false;
        this.isLose = false;
        document.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 37:
                    this.car.goLeft();
                    break;
                case 38:
                    this.car.goUp();
                    break;
                case 39:
                    this.car.goRight();
                    break;
                case 40:
                    this.car.goDown();
                    break;
            }
        });

        // для телефонов дальше до конца конструктора
        const getTouches = event => event.touches || event.originalEvent.touches;
        const handleTouchStart = event => {
            const firstTouch = getTouches(event)[0];
            this.xDown = firstTouch.clientX;
            this.yDown = firstTouch.clientY;
        };
        const handleTouchMove = event => {
            if (!this.xDown || !this.yDown) return;

            const xUp = event.touches[0].clientX;
            const yUp = event.touches[0].clientY;

            const xDiff = this.xDown - xUp;
            const yDiff = this.yDown - yUp;

            console.log(this.xDown, this.yDown);
            console.log(xDiff, yDiff);
            if (Math.abs(xDiff) > Math.abs(yDiff)) { // отлавливаем разницу в движении
                if (xDiff > 0) this.car.goLeft(xDiff);
                else this.car.goRight(-xDiff);

            } else {
                if (yDiff > 0) this.car.goUp(yDiff);
                else this.car.goDown(-yDiff);
            }
            // свайп был, обнуляем координаты
            this.xDown = null;
            this.yDown = null;
        }

        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
    }

    getTimeOfGame() {
        const nowTime = new Date().getTime();
        const delta = (nowTime - this.beginTime) / (1000);
        return delta.toFixed(1);
    }

    addStars(count = FREQUENCY_STARS) {
        if (Math.random() < count) {
            let x = Math.random() * (ROAD_SIZE.w - STAR_SIZE.w);
            this.starArray.push(new Star(x));
        }
    }

    addBombs(count = FREQUENCY_BOMBS) {
        if (Math.random() < count) {
            let x = Math.random() * (ROAD_SIZE.w - BOMB_SIZE.w);
            this.bombArray.push(new Bomb(x));
        }
    }

    doActionIfStrikeTrue(objArray, obj_SIZE, action) {
        const carLeft = this.car.getX();
        const carRight = this.car.getX() + CAR_SIZE.w;
        const carTop = this.car.getY();
        const carBottom = this.car.getY() + CAR_SIZE.h;

        let doWeMeet = false;  // была ли хотя бы одна встреча

        objArray.forEach((obj, index) => {
            const objLeft = obj.getX();
            const objRight = obj.getX() + obj_SIZE.w;
            const objTop = obj.getY();
            const objBottom = obj.getY() + obj_SIZE.h;

            if (
                (carRight > objLeft && carLeft < objRight ||
                    carLeft < objRight && carRight > objLeft) &&
                (carBottom > objTop && carTop < objBottom ||
                    carTop < objBottom && carBottom > objTop
                )
            ) {
                action();
                delete objArray[index];
                doWeMeet = true;
            }
        });
        objArray = objArray.filter(obj => !!obj);
        return [objArray, doWeMeet];
    }

    actionIfWeMetStar = () => {
        soundTrack.src = clashAudio;
        soundTrack.play();
        this.score++;
    }

    actionIfWeMetBomb = () => {
        this.youLose();
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

    doWeWin() {
        if (this.score >= SCORE_WIN) {
            if (+this.time < record) {
                record = +this.time;
            }

            soundTrack.src = winAudio;
            soundTrack.play();
            clearInterval(this.timerUpdateId);
            // сделать кнопку конца сразу после того, как удалим интеравал
            setTimeout(() => new Button([END_TEXT, `Счет: ${this.score}`, `Время: ${this.time}`], END_TEXT));
            return true;
        }
        return false;
    }

    youLose() {
        soundTrack.src = loseAudio;
        soundTrack.play();
        clearInterval(this.timerUpdateId);
        const x = this.car.getX() + CAR_SIZE.w / 2;
        const y = this.car.getY() + CAR_SIZE.h / 2;
        setTimeout(this.drawBoom.bind(this, BOOM_SIZE, x, y), 0);
        setTimeout(this.drawBoom.bind(this, BOOM2_SIZE, x, y), 200);
        setTimeout(this.drawBoom.bind(this, BOOM3_SIZE, x, y), 300);
        // сделать кнопку конца сразу после того, как удалим интеравал
        setTimeout(() =>
                new Button([LOSE_TEXT, `Счет: ${this.score}`, `Время: ${this.time}`], END_TEXT),
            400
        );
    }

    drawBoom(size, x, y) {
        context.drawImage(boom1, x - size.w / 2, y - size.h / 2, size.w, size.h);
    }


    updateFrame() {
        if (this.isWin || this.isLose) {
            // end of game
        } else {
            this.addStars();
            this.addBombs();

            [this.starArray,] = this.doActionIfStrikeTrue(this.starArray, STAR_SIZE, this.actionIfWeMetStar);
            [this.bombArray, this.isLose] = this.doActionIfStrikeTrue(this.bombArray, BOMB_SIZE, this.actionIfWeMetBomb);
            this.road.update();
            this.car.update();

            this.starArray.forEach(star => {
                const y = this.road.getY();
                star.update();
            });

            this.bombArray.forEach(bomb => {
                const y = this.road.getY();
                bomb.update();
            });

            this.time = this.getTimeOfGame();
            this.drawScore();
            this.drawTime();
            this.drawRecord();
            this.isWin = this.doWeWin();
        }
    }

    getPlayerTime() {
        return this.time;
    }

}