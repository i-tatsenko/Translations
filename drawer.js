class Drawer {

    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.ctx.fillStyle = 'rgb(255, 0 ,0)';
        this.ctx.strokeStyle = 'rgb(0, 255 ,0)';
        this.points = [];
    }

    savePoint(point) {
        this.points.push(point);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    startLine(point) {
        this.ctx.beginPath();
        let p = point.toCanvasPoint(this.ctx);
        this.savePoint(p);
        this.ctx.moveTo(p.x, p.y);
    }

    stopLine() {
        this.ctx.stroke();
    }

    drawTo(point) {
        let p = point.toCanvasPoint(this.ctx);
        this.savePoint(p);
        this.ctx.lineTo(p.x, p.y);
    }

    transform(transformer) {
        this.clear();
        let newPoints = this.points.map(p => transformer(p));

        this.points = newPoints;
        this.ctx.beginPath();
        this.ctx.moveTo(newPoints[0].x, newPoints[0].y);
        newPoints.slice(1).forEach(p => this.ctx.lineTo(p.x, p.y));
        this.ctx.stroke();
    }

    getCenterPoint() {
        return new CanvasPoint(this.canvas.width / 2, this.canvas.height / 2);
    }

}