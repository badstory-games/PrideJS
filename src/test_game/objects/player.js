"use strict";

import pride from "../../engine/pride.js";



class Player extends pride.GameObject {
    constructor(texturePath) {
        super(null);

        this.motionSpeed = 3;

        this.renderable = new pride.SpriteRenderable(texturePath);
        this.renderable.setColor([1, 1, 1, 0]);
        this.renderable.getTransform().setPosition(350, 256);
        this.renderable.getTransform().setSize(120, 180);
        this.renderable.setSpriteRegion(0, 0, 120, 180);
    }

    update() {
        let transform = this.getTransform();

        if (pride.input.isKeyPressed(pride.input.keys.W)) {
            transform.increasePositionY(this.motionSpeed)
        }
        else if (pride.input.isKeyPressed(pride.input.keys.S)) {
            transform.increasePositionY(-this.motionSpeed)
        }

        if (pride.input.isKeyPressed(pride.input.keys.A)) {
            transform.increasePositionX(-this.motionSpeed)
        }
        else if (pride.input.isKeyPressed(pride.input.keys.D)) {
            transform.increasePositionX(this.motionSpeed)
        }
    }
}

export default Player;