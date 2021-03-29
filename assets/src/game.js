class Game {
    constructor() {
        this.score = 0;
        beginAudio.play();
        roadAudio.play();
        this.road = new Road("assets/img/road.jpg");
        this.car = new Car("assets/img/car.svg");
        this.starArray = [];
        this.bombArray = [];
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
        clashAudio.play();
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

    doWeEnd() {
        if (this.score >= SCORE_WIN) {
            if (+this.time < record) {
                record = +this.time;
            }
            roadAudio.pause();
            winAudio.play();
            clearInterval(this.timerUpdateId);
            // сделать кнопку конца сразу после того, как удалим интеравал
            setTimeout(() => new Button([END_TEXT, `Счет: ${this.score}`, `Время: ${this.time}`], END_TEXT));
            return true;
        }
        return false;
    }

    youLose() {
        roadAudio.pause();
        loseAudio.play();
        clearInterval(this.timerUpdateId);
        const x = this.car.getX() + CAR_SIZE.w / 2;
        const y = this.car.getY() + CAR_SIZE.h / 2;
        setTimeout(this.drawBoom.bind(this, BOOM_SIZE, x, y), 0);
        setTimeout(this.drawBoom.bind(this, BOOM2_SIZE, x, y), 200);
        setTimeout(this.drawBoom.bind(this, BOOM3_SIZE, x, y), 300);
        // сделать кнопку конца сразу после того, как удалим интеравал
        setTimeout(() =>
                new Button([LOSE_TEXT, `Счет: ${this.score}`, `Время: ${this.time}`], END_TEXT)
            , 400);
    }

    drawBoom(size, x, y) {
        context.drawImage(boom1, x - size.w / 2, y - size.h / 2, size.w, size.h);
    }


    updateFrame() {
        this.time = this.getTimer();
        let doWeMet = false;
        [this.starArray, doWeMet] = this.doActionIfStrikeTrue(this.starArray, STAR_SIZE, this.actionIfWeMetStar);
        doWeMet = false;
        [this.bombArray, doWeMet] = this.doActionIfStrikeTrue(this.bombArray, BOMB_SIZE, this.actionIfWeMetBomb);
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

        if (this.doWeEnd() || doWeMet) {
            // end of game
        } else {
            this.drawScore();
            this.drawTime();
            this.drawRecord();

            this.addStars();
            this.addBombs();
        }
    }

    getPlayerTime() {
        return this.time;
    }

}