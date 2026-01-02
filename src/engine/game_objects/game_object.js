"use strict";

import pride from "../pride.js";
import BoundingBox from "../bounding_box.js";


class GameObject {
    constructor(renderable) {
        this.renderable = renderable;
        this.visible = true;
        this.currentFrontDirection = pride.math.vec2.fromValues(0, 1);
        this.motionSpeed = 0;
    }


    
    pixelTouches(otherObject, touchPosition) {
        let pixelTouch = false;
        let myRen = this.getRenderable();
        let otherRen = otherObject.getRenderable();

        if ((typeof myRen.pixelTouches === "function") && (typeof otherRen.pixelTouches === "function")) {
            if ((myRen.getTransform().getRotationRadians() === 0) && (otherRen.getTransform().getRotationRadians() === 0)) {
                let otherBbox = otherObject.getBoundingBox();
                if (otherBbox.intersectsBounds(this.getBoundingBox())) {
                    myRen.setColorArray();
                    otherRen.setColorArray();
                    pixelTouch = myRen.pixelTouches(otherRen, touchPosition);
                }
            }
            else {
                let mySize = myRen.getTransform().getSize();
                let otherSize = otherRen.getTransform().getSize();

                let myR = Math.sqrt(0.5*mySize[0]*0.5*mySize[0] + 0.5*mySize[1]*0.5*mySize[1]);
                let otherR = Math.sqrt(0.5*otherSize[0]*0.5*otherSize[0] + 0.5*otherSize[1]*0.5*otherSize[1]);
                
                let d = [];

                pride.math.vec2.sub(d, myRen.getTransform().getPosition(), otherRen.getTransform().getPosition());

                if (pride.math.vec2.length(d) < (myR + otherR)) {
                    myRen.setColorArray();
                    otherRen.setColorArray();
                    pixelTouch = myRen.pixelTouches(otherRen, touchPosition);
                }
            }
        }

        return pixelTouch;
    }

    getBoundingBox() {
        let transform = this.getTransform();
        let box = new BoundingBox(transform.getPosition(), transform.getWidth(), transform.getHeight());

        return box;
    }

    setVisibility(mode) { this.visible = mode; }

    isVisible() { return this.visible; }

    setMotionSpeed(speed) { this.motionSpeed = speed; }

    increaseMotionSpeed(speed) { this.motionSpeed += speed; }

    getMotionSpeed() { return this.motionSpeed; }

    setCurrentFrontDirection(frontDirection) { pride.math.vec2.normalize(this.currentFrontDirection, frontDirection); }

    getCurrentFrontDirection() { return this.currentFrontDirection; }

    lookAt(position, rate) {
        let direction = [];
        pride.math.vec2.sub(direction, position, this.getTransform().getPosition());
        let len = pride.math.vec2.length(direction);
        if (len < Number.MIN_VALUE) {
            return;
        }
        pride.math.vec2.scale(direction, direction, 1 / len);

        let fdir = this.getCurrentFrontDirection();
        let cosTheta = pride.math.vec2.dot(direction, fdir);

        if (cosTheta > 0.999999) {
            return;
        }

        if (cosTheta > 1) {
            cosTheta = 1;
        } else {
            if (cosTheta < -1) {
                cosTheta = -1;
            }
        }

        let dir3d = pride.math.vec3.fromValues(direction[0], direction[1], 0);
        let f3d = pride.math.vec3.fromValues(fdir[0], fdir[1], 0);
        let r3d = [];
        pride.math.vec3.cross(r3d, f3d, dir3d);

        let rad = Math.acos(cosTheta);
        if (r3d[2] < 0) {
            rad = -rad;
        }

        rad *= rate;
        pride.math.vec2.simpleRotate(this.getCurrentFrontDirection(), this.getCurrentFrontDirection(), rad);
        this.getTransform().increaseRotationRadians(rad);
    }

    getTransform() { return this.renderable.getTransform(); }
    
    getRenderable() { return this.renderable; }

    update() {
        let position = this.getTransform().getPosition();
        pride.math.vec2.scaleAndAdd(position, position, this.getCurrentFrontDirection(), this.getMotionSpeed());
    }   

    draw(camera) {
        if (this.isVisible()) {
            this.renderable.draw(camera);
        }
    }
}

export default GameObject;