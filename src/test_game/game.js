"use strict";

import pride from "../engine/pride.js";
import SecondScene from "./second_scene.js";

class GameScene extends pride.Scene {
    constructor() {
        super();

        this.camera = null;

        this.portal = null;
        this.collector = null;
        this.font = null;
        this.minion = null;
        this.hero = null;

        this.label = null;

        this.fontTexture = "assets/textures/consolas-72.png";
        this.minionTexture = "assets/textures/minion_sprite.png";
    }



    load() {
        pride.texture.load(this.fontTexture);
        pride.texture.load(this.minionTexture);
    }
        

    unload() {
        pride.texture.unload(this.fontTexture);
        pride.texture.unload(this.minionTexture);
    }

    init() {
        this.camera = new pride.Camera(
            pride.math.vec2.fromValues(50, 33),
            100,
            [0, 0, 600, 400]
        );
        this.camera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

        this.label = new pride.FontRenderable("Hello, Pride Engine!");
        this.label.getTransform().setPosition(35, 50);
        this.label.setTextHeight(3);

        this.portal = new pride.SpriteRenderable(this.minionTexture);
        this.portal.getTransform().setPosition(25, 60);
        this.portal.getTransform().setSize(3, 3);
        this.portal.setSpriteRegion(130, 0, 310, 180);

        this.collector = new pride.SpriteRenderable(this.minionTexture);
        this.collector.getTransform().setPosition(15, 60);
        this.collector.getTransform().setSize(3, 3);
        this.collector.setSpriteRegionUVCoordinates(0.308, 0, 0.483, 0.352);

        this.font = new pride.SpriteRenderable(this.fontTexture);
        this.font.getTransform().setPosition(15, 50);
        this.font.getTransform().setSize(20, 20);

        this.minion = new pride.AnimatedSpriteRenderable(this.minionTexture);
        this.minion.getTransform().setPosition(15, 25);
        this.minion.getTransform().setSize(24, 19.2);
        this.minion.setSpriteSequence(0, 512, 204, 164, 5, 0);
        this.minion.setAnimationType(pride.AnimationType.RIGHT);
        this.minion.setAnimationInterval(5);

        this.hero = new pride.SpriteRenderable(this.minionTexture);
        this.hero.getTransform().setPosition(35, 50);
        this.hero.getTransform().setSize(12, 18);
        this.hero.setSpriteRegion(0, 0, 120, 180);
    }

    draw() {
        pride.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        this.camera.adjustProjection();

        this.label.draw(this.camera)

        this.portal.draw(this.camera);
        this.collector.draw(this.camera);
        this.font.draw(this.camera);
        this.minion.draw(this.camera);
        this.hero.draw(this.camera);
    }

    update() {
        this.minion.updateAnimation();
        
        let delta = 0.1;

        let transform = this.hero.getTransform();

        if (pride.input.isKeyPressed(pride.input.keys.D)) {
            transform.increasePositionX(delta);
        }
        else if (pride.input.isKeyPressed(pride.input.keys.A)) {
            transform.increasePositionX(-delta);

            if (transform.getPositionX() < 0) {
                this.next();
            }
        }

        if (pride.input.isKeyPressed(pride.input.keys.W)) {
            transform.increasePositionY(delta);
        }
        else if (pride.input.isKeyPressed(pride.input.keys.S)) {
            transform.increasePositionY(-delta);
        }

        if (pride.input.isKeyPressed(pride.input.keys.Q)) {
            this.stop();
        }
    }

    next() {
        super.next();

        let secondScene = new SecondScene();
        secondScene.start();
    }
}

export default GameScene;



window.onload = function() {
    pride.init("pride-canvas");
    let gameScene = new GameScene();
    gameScene.start();
}