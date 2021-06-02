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
        console.log(speed);
        if (speed && this.x + CAR_SIZE.w < ROAD_SIZE.w) this.x += speed;
        if (this.x + CAR_SIZE.w < ROAD_SIZE.w) this.x += ENGINE_SPEED;
    }

    goLeft(speed = 0) {
        if (speed && this.x + CAR_SIZE.w < ROAD_SIZE.w) this.x -= speed;
        if (this.x > 0) this.x -= ENGINE_SPEED;
    }

    goUp(speed = 0) {
        console.log(speed);
        if (speed && this.x + CAR_SIZE.w < ROAD_SIZE.w) this.y -= speed;
        if (this.y > 0) this.y -= ENGINE_SPEED;
    }

    goDown(speed = 0) {
        if (speed && this.x + CAR_SIZE.w < ROAD_SIZE.w) this.y += speed;
        if (this.y + CAR_SIZE.h < ROAD_SIZE.h) this.y += ENGINE_SPEED;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}