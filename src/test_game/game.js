"use strict";

import pride from "../engine/pride.js";

import Enemy from "./objects/enemy.js";
import Player from "./objects/player.js";
import Brain from "./objects/brain.js";
import SecondScene from "./second_scene.js";

class GameScene extends pride.Scene {
    constructor() {
        super();

        this.camera = null;

        this.minionTexture = "assets/textures/minion_sprite.png";
        this.enemyGroup = null;
        this.player = null;
        this.brain = null;

        this.label = null;

        this.mode = 'H';
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
        for (i = 0; i < 5; i++) {
            randomY = Math.random() * 480;
            enemy = new Enemy(this.minionTexture, randomY);
            this.enemyGroup.addGameObject(enemy);
        }

        this.player = new Player(this.minionTexture);

        this.brain = new Brain(this.minionTexture);

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
        this.brain.draw(this.camera);
        
        this.label.draw(this.camera);
    }

    update() {
        this.enemyGroup.update();
        this.player.update();

        this.label.update();

        if (this.player.getTransform().getPositionX() < 0) {
            this.next();
        }

        let msg = "Brain [H:keys J:imm K:gradual]: ";
        let rate = 1;
        
        switch (this.mode) {
            case 'H':
                this.brain.update();
                break;
            case 'K':
                rate = 0.02;
            case 'J':
                if (!this.player.getBoundingBox().intersectsBounds(this.brain.getBoundingBox())) {
                    this.brain.lookAt(this.player.getTransform().getPosition(), rate);
                    pride.GameObject.prototype.update.call(this.brain);
                }
                break;
            }
        
        let status = this.camera.getCollideBounds(this.player.getTransform(), 0.8);
        
        if (pride.input.isKeyJustPressed(pride.input.keys.H)) {
            this.mode = 'H';
        }
        if (pride.input.isKeyJustPressed(pride.input.keys.J)) {
            this.mode = 'J';
        }
        if (pride.input.isKeyJustPressed(pride.input.keys.K)) {
            this.mode = 'K';
        }

        this.label.setText(msg + this.mode + "[Player bounds=" + status + "]");
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