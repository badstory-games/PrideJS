"use strict";

import pride from "../engine/pride.js";
import GameScene from "./game.js";



class SecondScene extends pride.Scene {
    constructor() {
        super();

        this.camera = null;
        this.sceneFile = "assets/scene.xml";
        this.parser = null;
        this.squareSet = [];
    }



    load() {
        pride.xml.load(this.sceneFile);
    }
        

    unload() {
        pride.xml.unload(this.sceneFile);
    }

    init() {
        this.parser = new pride.SceneFileParser(pride.xml.get(this.sceneFile));

        this.camera = this.parser.parseCamera();
        this.camera.setBackgroundColor([0.8, 0.8, 0.9, 1.0]);

        this.squareSet = this.parser.parseSquares();
    }

    draw() {
        pride.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        this.camera.adjustProjection();

        for (let i = 0; i < this.squareSet.length; i++) {
            this.squareSet[i].draw(this.camera);
        }
    }

    update() {
        let delta = 0.1;

        let transform = this.squareSet[1].getTransform();

        if (pride.input.isKeyPressed(pride.input.keys.D)) {
            transform.increasePositionX(delta);

            if (transform.getPositionX() > 30) {
                transform.setPositionX(12);
            }
        }

        if (pride.input.isKeyPressed(pride.input.keys.A)) {
            transform.increasePositionX(-delta);

            if (transform.getPositionX() < 11) {
                this.next();
            }
        }

        if (pride.input.isKeyPressed(pride.input.keys.Q)) {
            this.stop();
        }
    }

    next() {
        super.next();

        let gameScene = new GameScene();
        gameScene.start();
    }
}

export default SecondScene;