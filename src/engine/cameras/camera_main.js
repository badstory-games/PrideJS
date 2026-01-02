"use strict";

import * as glContext from "../core/gl_context.js";
import * as math from "../math/math.js";
import BoundingBox from "../bounding_box.js";
import { BoundCollideStatus } from "../bounding_box.js";



class Camera {
    constructor(center, width, viewportArray) {
        this.center = center;
        this.width = width;
        this.viewport = viewportArray;
        this.cameraMatrix = math.mat4.create();
        this.backgroundColor = [0.8, 0.8, 0.8, 1]
    }



    clampAtBounds(transform, zone) {
        let status = this.getCollideBounds(transform, zone);
        
        if (status !== BoundCollideStatus.INSIDE) {
            let pos = transform.getPosition();
            if ((status & BoundCollideStatus.COLLIDE_TOP) !== 0) {
                pos[1] = (this.getCenter())[1] + (zone * this.getHeight() / 2) - (transform.getHeight() / 2);
            }
            if ((status & BoundCollideStatus.COLLIDE_BOTTOM) !== 0) {
                pos[1] = (this.getCenter())[1] - (zone * this.getHeight() / 2) + (transform.getHeight() / 2);
            }
            if ((status & BoundCollideStatus.COLLIDE_RIGHT) !== 0) {
                pos[0] = (this.getCenter())[0] + (zone * this.getWidth() / 2) - (transform.getWidth() / 2);
            }
            if ((status & BoundCollideStatus.COLLIDE_LEFT) !== 0) {
                pos[0] = (this.getCenter())[0] - (zone * this.getWidth() / 2) + (transform.getWidth() / 2);
            }
        }

        return status;
    }

    getCollideBounds(transform, zone) {
        let box = new BoundingBox(transform.getPosition(), transform.getWidth(), transform.getHeight());
        let width = zone * this.getWidth();
        let height = zone * this.getHeight();
        let cameraBound = new BoundingBox(this.getCenter(), width, height);

        return cameraBound.boundCollideStatus(box);
    }

    setWidth(width) { this.width = width; }

    getWidth() { return this.width; }

    getHeight() {
        let ratio = this.viewport[Viewport.HEIGHT] / this.viewport[Viewport.WIDTH];

        return this.getWidth() * ratio;
    }

    setCenter(x, y) { this.center[0] = x; this.center[1] = y; }

    getCenter() { return this.center; }

    setViewport(viewportArray) { this.viewport = viewportArray; }

    getViewport() { return this.viewport; }

    setBackgroundColor(color) { this.backgroundColor = color; }

    getBackgroundColor() { return this.backgroundColor; }



    adjustProjection() {
        let gl = glContext.get();

        gl.viewport(
            this.viewport[0],
            this.viewport[1],
            this.viewport[2],
            this.viewport[3],
        );

        gl.scissor(
            this.viewport[0],
            this.viewport[1],
            this.viewport[2],
            this.viewport[3],
        );

        gl.clearColor(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2], this.backgroundColor[3]);

        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        let center = this.getCenter();

        math.mat4.scale(
            this.cameraMatrix,
            math.mat4.create(),
            math.vec3.fromValues(2.0 / this.getWidth(), 2.0 / this.getHeight(), 1.0)
        );

        math.mat4.translate(
            this.cameraMatrix,
            this.cameraMatrix,
            math.vec3.fromValues(-center[0], -center[1], 0)
        );
    }

    getMatrix() { return this.cameraMatrix; }
}

const Viewport = Object.freeze({
    ORIGIN_X: 0,
    ORIGIN_Y: 1,
    WIDTH: 2,
    HEIGHT: 3
});



export default Camera;