"use strict";

import pride from "../../engine/pride.js";


class TestObject extends pride.GameObject {
    constructor(spritePath) {
        super(null);

        this.width = 80;
        this.height = 130;
        this.motionSpeed = 0.5;

        this.renderable = new pride.SpriteRenderable(spritePath);
        this.renderable.setColor([1, 1, 1, 0.1]);
        this.renderable.getTransform().setPosition(50, 33);
        this.renderable.getTransform().setSize(this.width / 50, this.height / 50);
        this.renderable.setSpriteRegion(510, 23, 595, 153);
    }

    update() {
        let transform = this.getTransform();
        if (pride.input.isKeyPressed(pride.input.keys.Up)) {
            transform.increasePositionY(this.motionSpeed);
        }
        if (pride.input.isKeyPressed(pride.input.keys.Down)) {
            transform.increasePositionY(-this.motionSpeed);
        }
        if (pride.input.isKeyPressed(pride.input.keys.Left)) {
            transform.increasePositionX(-this.motionSpeed);
        }
        if (pride.input.isKeyPressed(pride.input.keys.Right)) {
            transform.increasePositionX(this.motionSpeed);
        }

        if (this.isVisible()) {
            transform.increasePositionY(-this.motionSpeed);
        }
    }
}

export default TestObject;