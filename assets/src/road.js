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