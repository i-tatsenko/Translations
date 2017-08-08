class Rotation {

    constructor(rotationCenterPoint, angleDegrees) {
        this.center = rotationCenterPoint;
        this.angle = radians(angleDegrees);
        this.angleCos = Math.cos(this.angle);
        this.angleSin = Math.sin(this.angle);
    }

    normalizeToCenter(point) {
        return new CanvasPoint(point.x - this.center.x, point.y - this.center.y, point.z)
    }

    removeNormalization(point) {
        return new CanvasPoint(point.x + this.center.x, point.y + this.center.y, point.z)
    }

    rotate(point) {
        let p = this.normalizeToCenter(point);
        let newX = this.calculateNewX(p);
        let newY = this.calculateNewY(p);
        let newZ = this.calculateNewZ(p);
        return this.removeNormalization(new CanvasPoint(newX, newY, newZ));
    }

    calculateNewX(p) {
        throw new Error("should be implemented in the subclass")
    }

    calculateNewY(p) {
        throw new Error("should be implemented in the subclass")
    }

    calculateNewZ(p) {
        return p.z;
    }
}

class XYRotation extends Rotation {

    calculateNewX(p) {
        return this.angleCos * p.x - this.angleSin * p.y;
    }

    calculateNewY(p) {
        return this.angleSin * p.x + this.angleCos * p.y;
    }
}

class XZRotation extends Rotation {

    calculateNewX(p) {
        return this.angleCos * p.x + this.angleSin * p.z;
    }

    calculateNewY(p) {
        return p.y;
    }

    calculateNewZ(p) {
        return -this.angleSin * p.x + this.angleCos * p.z;
    }
}

Rotation.rotatePlain = function (angle, drawer, center = drawer.getCenterPoint()) {
    let rotation = new XYRotation(center.toCanvasPoint(drawer.ctx), angle);
    drawer.transform(rotation.rotate.bind(rotation));
};

Rotation.rotatePerspective = function (angle, drawer, center = drawer.getCenterPoint()) {
    let xzRotation = new XZRotation(center.toCanvasPoint(drawer.ctx), angle);
    drawer.transform(xzRotation.rotate.bind(xzRotation));
};

function radians(degrees) {
    return degrees * Math.PI / 180;
}