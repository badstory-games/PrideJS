"use strict";

import pride from "../../engine/pride.js";



class Enemy extends pride.GameObject {
    constructor(texturePath, positionY) {
        super(null);

        this.motionSpeed = 2;

        this.renderable = new pride.AnimatedSpriteRenderable(texturePath);
        this.renderable.setColor([1, 1, 1, 0]);
        this.renderable.getTransform().setPosition(Math.random() * 854, positionY);
        this.renderable.getTransform().setSize(204, 162)
        this.renderable.setAnimationSequence(0, 512, 204, 162, 5, 0);
        this.renderable.setAnimationType(pride.AnimationType.SWING);
        this.renderable.setAnimationInterval(5);
    }

    update() {
        this.renderable.updateAnimation();
        
        let transform = this.getTransform();
        transform.increasePositionX(-this.motionSpeed);

        if (transform.getPositionX() < -transform.getWidth()/2) {
            transform.setPosition(854 + transform.getWidth()/2, 480 * Math.random())
        }
    }
}

export default Enemy;