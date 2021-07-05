class Star {
    constructor(x) {
        this.x = x;
        this.y = -STAR_SIZE.h;
        this.image = new Image();
        const unCoding = "data:image/png;base64,";
        this.image.src = unCoding + STAR_IMG_BASE64;
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

class Bomb {
    constructor(x) {
        this.x = x;
        this.y = -BOMB_SIZE.h;
        this.image1 = new Image();
        this.image2 = new Image();
        this.image3 = new Image();
        const unCoding = "data:image/png;base64,";
        this.image1.src = unCoding + BOMB_IMG_BASE64;
        this.image2.src = unCoding + BOMB_2_IMG_BASE64;
        this.image3.src = unCoding + BOMB_3_IMG_BASE64;
        this.count = 1;
    }

    update() {
        this.y += CAR_SPEED;
        if (Math.random() > 0.5) this.count++;
        else this.count--;
        if (this.count < 1) this.count = 1;
        if (this.count > 3) this.count = 3;

        if (this.count === 1) context.drawImage(this.image1, this.x, this.y, BOMB_SIZE.w, BOMB_SIZE.h)
        if (this.count === 2) context.drawImage(this.image2, this.x, this.y, BOMB_SIZE.w, BOMB_SIZE.h)
        if (this.count === 3) context.drawImage(this.image3, this.x, this.y, BOMB_SIZE.w, BOMB_SIZE.h)
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}