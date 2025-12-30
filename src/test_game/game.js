"use strict";

import pride from "../engine/pride.js";

import Enemy from "./objects/enemy.js";
import Player from "./objects/player.js";
import SecondScene from "./second_scene.js";

class GameScene extends pride.Scene {
    constructor() {
        super();

        this.camera = null;

        this.minionTexture = "assets/textures/minion_sprite.png";
        this.enemyGroup = null;
        this.player = null;

        this.label = null;
    }



    load() {
        pride.texture.load(this.minionTexture);
    }
        

    unload() {
        pride.texture.unload(this.minionTexture);
    }

    init() {
        this.camera = new pride.Camera(
            pride.math.vec2.fromValues(854/2, 480/2),
            854,
            [0, 0, 854, 480]
        );
        this.camera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

        this.enemyGroup = new pride.GameObjectGroup();
        let i = 0, randomY, enemy;
        // create 5 minions at random Y values
        for (i = 0; i < 5; i++) {
            randomY = Math.random() * 480;
            enemy = new Enemy(this.minionTexture, randomY);
            this.enemyGroup.addGameObject(enemy);
        }

        this.player = new Player(this.minionTexture);

        this.label = new pride.FontRenderable("Powered by Pride Engine");
        this.label.setColor([0, 0, 0, 1]);
        this.label.getTransform().setPosition(20, 20);
        this.label.setTextHeight(16);
    }

    draw() {
        pride.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        this.camera.adjustProjection();

        this.enemyGroup.draw(this.camera);
        this.player.draw(this.camera);
        
        this.label.draw(this.camera);
    }

    update() {
        this.enemyGroup.update();
        this.player.update();

        this.label.update();

        if (this.player.getTransform().getPositionX() < 0) {
            this.next();
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