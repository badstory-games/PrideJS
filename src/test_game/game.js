"use strict";

import pride from "../engine/pride.js";
import SecondScene from "./second_scene.js";

class GameScene extends pride.Scene {
    constructor() {
        super();

        this.camera = null;


        
    }



    load() {
        
    }
        

    unload() {
        
    }

    init() {
        this.camera = new pride.Camera(
            pride.math.vec2.fromValues(50, 37.5),
            100,
            [0, 0, 640, 480]
        );
        this.camera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

        
    }

    draw() {
        pride.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        this.camera.adjustProjection();

        
    }

    update() {
        
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