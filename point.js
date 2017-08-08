class Point {
    constructor(x, y, z = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toCanvasPoint(ctx) {
        return new CanvasPoint(this.x, this.y, this.z);
    }
}

class GlobalPoint extends Point {

    static fromEvent(event) {
        return new GlobalPoint(event.clientX, event.clientY)
    }

    toCanvasPoint(ctx) {
        return new CanvasPoint(
            this.x - ctx.canvas.offsetLeft,
            this.y - ctx.canvas.offsetTop,
            this.z);
    }
}

class CanvasPoint extends Point {

    constructor(x, y, z) {
        super(x, y, z);
    }
}
