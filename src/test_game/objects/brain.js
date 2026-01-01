"use strict";

import pride from "../../engine/pride.js";

class Brain extends pride.GameObject {
    constructor(texturePath) {
        super(null);
        this.deltaDegree = 1;
        this.deltaRad = Math.PI * this.deltaDegree / 180;
        this.deltaSpeed = 0.01;
        this.renderable =  new pride.SpriteRenderable(texturePath);
        this.renderable.setColor([1, 1, 1, 0]);
        this.renderable.getTransform().setPosition(256, 256);
        this.renderable.getTransform().setSize(120, 180);
        this.renderable.setSpriteRegion(0, 0, 120, 180);

        this.setMotionSpeed(0.5);
    }

    update() {
        super.update();
        let xf = this.getTransform();
        let fdir = this.getCurrentFrontDirection();
        if (pride.input.isKeyPressed(pride.input.keys.Left)) {
            xf.increaseRotationDegrees(this.deltaDegree);
            pride.math.vec2.simpleRotate(fdir, fdir, this.deltaRad);
        }
        if (pride.input.isKeyPressed(pride.input.keys.Right)) {
            xf.increaseRotationRadians(-this.deltaRad);
            pride.math.vec2.simpleRotate(fdir, fdir, -this.deltaRad);
        }
        if (pride.input.isKeyJustPressed(pride.input.keys.Up)) {
            this.increaseMotionSpeed(this.deltaSpeed);
        }
        if (pride.input.isKeyJustPressed(pride.input.keys.Down)) {
            this.increaseMotionSpeed(-this.deltaSpeed);
        }
    }
}

export default Brain;