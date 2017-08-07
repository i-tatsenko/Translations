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
        this.savePoint(point);
        this.ctx.moveTo(point.x, point.y);
    }

    stopLine() {
        this.ctx.stroke();
    }

    drawTo(point) {
        this.savePoint(point);
        this.ctx.lineTo(point.x, point.y);
    }

    rotate(rotationCenter = new CanvasPoint(this.canvas.width / 2,
        this.canvas.height / 2),
           degrees = 15) {
        this.clear();
        let rotation = new XZRotation(rotationCenter, degrees);
        let newPoints = this.points.map(p => rotation.rotate(p));

        this.points = newPoints;
        this.ctx.beginPath();
        this.ctx.moveTo(newPoints[0].x, newPoints[0].y);
        newPoints.slice(1).forEach(p => this.ctx.lineTo(p.x, p.y));
        this.ctx.stroke();
    }

}

class GlobalDrawer extends Drawer {

    startLine(globalPoint) {
        return super.startLine(this.toCanvas(globalPoint))
    }

    drawTo(globalPoint) {
        return super.drawTo(this.toCanvas(globalPoint))
    }

    toCanvas(globalPoint) {
        return CanvasPoint.fromGlobal(globalPoint, this.ctx);
    }
}