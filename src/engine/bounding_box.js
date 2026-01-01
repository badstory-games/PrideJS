"use strict";

import pride from "./pride.js";



const BoundCollideStatus = Object.freeze({
    COLLIDE_LEFT: 1,
    COLLIDE_RIGHT: 2,
    COLLIDE_TOP: 4,
    COLLIDE_BOTTOM: 8,
    INSIDE: 16,
    OUTSIDE: 0
});

class BoundingBox {
    constructor(centerPosition, width, height) {
        this.lowerLeft = pride.math.vec2.fromValues(0, 0);
        this.setBounds(centerPosition, width, height);
    }



    setBounds(centerPosition, width, height) {
        this.width = width;
        this.height = height;
        this.lowerLeft[0] = centerPosition[0] - (width / 2);
        this.lowerLeft[1] = centerPosition[1] - (height / 2);
    }

    containsPoint(x, y) {
        return ((x > this.getMinX()) && (x < this.getMaxX()) &&
            (y > this.getMinY()) && (y < this.getMaxY()));
    }

    intersectsBounds(otherBound) {
        return ((this.getMinX() < otherBound.getMaxX()) &&
            (this.getMaxX() > otherBound.getMinX()) &&
            (this.getMinY() < otherBound.getMaxY()) &&
            (this.getMaxY() > otherBound.getMinY()));
    }

    boundCollideStatus(otherBound) {
        let status = BoundCollideStatus.OUTSIDE;

        if (this.intersectsBounds(otherBound)) {
            if (otherBound.getMinX() < this.getMinX()) {
                status |= BoundCollideStatus.COLLIDE_LEFT;
            }
            if (otherBound.getMaxX() > this.getMaxX()) {
                status |= BoundCollideStatus.COLLIDE_RIGHT;
            }
            if (otherBound.getMinY() < this.getMinY()) {
                status |= BoundCollideStatus.COLLIDE_BOTTOM;
            }
            if (otherBound.getMaxY() > this.getMaxY()) {
                status |= BoundCollideStatus.COLLIDE_TOP;
            }

            if (status === BoundCollideStatus.OUTSIDE) {
                status = BoundCollideStatus.INSIDE;
            }
        }
        return status;
    }

    getMinX() { return this.lowerLeft[0]; }
    getMaxX() { return this.lowerLeft[0] + this.width; }
    getMinY() { return this.lowerLeft[1]; }
    getMaxY() { return this.lowerLeft[1] + this.height; }
}

export { BoundCollideStatus };
export default BoundingBox;