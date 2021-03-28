class Star {
    constructor(x) {
        this.x = x;
        this.y = -STAR_SIZE.h;
        this.image = new Image();
        this.image.src = "assets/img/star.svg";
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
        this.image1.src = "assets/img/bomb.svg";
        this.image2.src = "assets/img/bomb-2.svg";
        this.image3.src = "assets/img/bomb-3.svg";
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