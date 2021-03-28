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
        this.x += ENGINE_SPEED;
    }

    goLeft() {
        this.x -= ENGINE_SPEED;
    }

    goUp() {
        this.y -= ENGINE_SPEED;
    }

    goDown() {
        this.y += ENGINE_SPEED;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}