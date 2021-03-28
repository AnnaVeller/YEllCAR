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
                if (action === START_TEXT) {
                    canvas.removeEventListener('click', listener, false);
                    game = new Game();
                } else if (action === END_TEXT) {
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