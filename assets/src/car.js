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

    goRight(speed = 0) {
        if (!speed) speed = ENGINE_SPEED;

        if (this.x + CAR_SIZE.w < ROAD_SIZE.w) {
            if (this.x + CAR_SIZE.w + speed < ROAD_SIZE.w) this.x += speed;
            else this.x = ROAD_SIZE.w - CAR_SIZE.w; // вплотную справа
        }
    }

    goLeft(speed = 0) {
        if (!speed) speed = ENGINE_SPEED;

        if (this.x > 0) {
            if (this.x - speed > 0) this.x -= speed;
            else this.x = 0; // вплотную слева
        }
    }

    goUp(speed = 0) {
        if (!speed) speed = ENGINE_SPEED;

        if (this.y > 0) {
            if (this.y - speed > 0) this.y -= speed;
            else this.y = 0; // вплотную сверху
        }
    }

    goDown(speed = 0) {
        if (!speed) speed = ENGINE_SPEED;

        if (this.y + CAR_SIZE.h < ROAD_SIZE.h) {
            if (this.y + speed + CAR_SIZE.h < ROAD_SIZE.h) this.y += speed;
            else this.y = ROAD_SIZE.h - CAR_SIZE.h; // вплотную снизу
        }
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}