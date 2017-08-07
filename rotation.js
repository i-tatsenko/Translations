class Rotation {
    constructor(rotationCenterPoint, angleDegrees) {
        this.center = rotationCenterPoint;
        this.angle = radians(angleDegrees);
    }

    normalizeToCenter(point) {
        return new CanvasPoint(point.x - this.center.x, point.y - this.center.y)
    }

    removeNormalization(point) {
        return new CanvasPoint(point.x + this.center.x, point.y + this.center.y)
    }
}

class XYRotation extends Rotation {

    rotate(point) {
        let p = this.normalizeToCenter(point);
        let angleCos = Math.cos(this.angle);
        let angleSin = Math.sin(this.angle);
        let newX = angleCos * p.x - angleSin * p.y;
        let newY = angleSin * p.x + angleCos * p.y;
        return this.removeNormalization(new CanvasPoint(newX, newY));
    }
}

class XZRotation extends Rotation {
    rotate(point) {
        let p = this.normalizeToCenter(point);
        let angleCos = Math.cos(this.angle);
        let angleSin = Math.sin(this.angle);
        let newX = angleCos * p.x + angleSin;
        return this.removeNormalization(new CanvasPoint(newX, p.y));
    }
}

function radians(degrees) {
    return degrees * Math.PI / 180;
}