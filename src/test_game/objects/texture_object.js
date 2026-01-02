"use strict";

import pride from "../../engine/pride.js";

class TextureObject extends pride.GameObject {
    constructor(texturePath, x, y, width, height) {
        super(null);
        this.motionSpeed = 0.2;

        this.renderable = new pride.AnimatedSpriteRenderable(texturePath);
        this.renderable.setColor([1, 1, 1, 0.1]);
        this.renderable.getTransform().setPosition(x, y);
        this.renderable.getTransform().setSize(width, height);
        this.renderable.setSpriteRegion(0, 0, 120, 180);
        this.renderable.setAnimationSequence(0, 512, 204, 164, 5, 0);
    }

    update(up, down, left, right) {
        let transform = this.getTransform();
        if (pride.input.isKeyPressed(up)) {
            transform.increasePositionY(this.motionSpeed);
        }
        if (pride.input.isKeyPressed(down)) {
            transform.increasePositionY(-this.motionSpeed);
        }
        if (pride.input.isKeyPressed(left)) {
            transform.increasePositionX(-this.motionSpeed);
        }
        if (pride.input.isKeyPressed(right)) {
            transform.increasePositionX(this.motionSpeed);
        }
    }
}

export default TextureObject;