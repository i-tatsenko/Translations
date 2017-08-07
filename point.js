class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class GlobalPoint extends Point {

    static fromEvent(event) {
        return new GlobalPoint(event.clientX, event.clientY)
    }
}

class CanvasPoint extends Point {

    constructor(x, y) {
        super(x, y);
    }

    static fromGlobal(globalPoint, ctx) {
        return new CanvasPoint(
            globalPoint.x - ctx.canvas.offsetLeft,
            globalPoint.y - ctx.canvas.offsetTop)
    }
}
