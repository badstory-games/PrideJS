"use strict";

import pride from "../engine/pride.js";
import SecondScene from "./second_scene.js";

import TestObject from "./objects/TestObject.js";
import TextureObject from "./objects/texture_object.js";

class GameScene extends pride.Scene {
    constructor() {
        super();

        this.camera = null;

        this.minionSprite = "assets/textures/minion_sprite.png";
        this.minionCollector = "assets/textures/minion_collector.png";
        this.minionPortal = "assets/textures/minion_portal.png";

        this.msg = null;
        this.collector = null;
        this.portal = null;
    }



    load() {
        pride.texture.load(this.minionSprite);
        pride.texture.load(this.minionCollector);
        pride.texture.load(this.minionPortal);
    }
        

    unload() {
        pride.texture.unload(this.minionSprite);
        pride.texture.unload(this.minionCollector);
        pride.texture.unload(this.minionPortal);
    }

    init() {
        this.camera = new pride.Camera(
            pride.math.vec2.fromValues(50, 37.5),
            100,
            [0, 0, 640, 480]
        );
        this.camera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

        this.testObject = new TestObject(this.minionSprite);
        this.testObject.setVisibility(false);

        this.collector = new TextureObject(this.minionCollector, 50, 30, 30, 30);
        this.portal = new TextureObject(this.minionPortal, 70, 30, 10, 10);

        this.msg = new pride.FontRenderable("Status Message");
        this.msg.setColor([0, 0, 0, 1]);
        this.msg.getTransform().setPosition(1, 2);
        this.msg.setTextHeight(3);
    }

    draw() {
        pride.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        this.camera.adjustProjection();

        this.collector.draw(this.camera);
        this.portal.draw(this.camera);
        this.testObject.draw(this.camera);
        this.msg.draw(this.camera);
    }

    update() {
        let msg = "No Collision";

        this.collector.update(pride.input.keys.W, pride.input.keys.S,
            pride.input.keys.A, pride.input.keys.D);
        this.portal.update(pride.input.keys.Up, pride.input.keys.Down,
            pride.input.keys.Left, pride.input.keys.Right);

        let h = [];

        if (this.portal.pixelTouches(this.collector, h)) {
            msg = "Collided!: (" + h[0].toPrecision(4) + " " + h[1].toPrecision(4) + ")";
            this.testObject.setVisibility(true);
            this.testObject.getTransform().setPositionX(h[0]);
            this.testObject.getTransform().setPositionY(h[1]);
        } else {
            this.testObject.setVisibility(false);
        }
        this.msg.setText(msg);
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