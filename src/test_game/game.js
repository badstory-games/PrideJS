import pride from "../engine/pride.js";
import SecondScene from "./second_scene.js";

class GameScene extends pride.Scene {
    constructor() {
        super();

        this.camera = null;
        this.hero = null;
        this.support = null;
    }



    load() {
    
    }
        

    unload() {
        
    }

    init() {
        this.camera = new pride.Camera(
            pride.math.vec2.fromValues(20, 60),
            20,
            [20, 40, 600, 300]
        );
        this.camera.setBackgroundColor([0.8, 0.8, 0.9, 1.0]);

        this.support = new pride.Renderable();
        this.support.setColor([0.8, 0.2, 0.2, 1.0]);
        this.support.getTransform().setPosition(20, 60);
        this.support.getTransform().setSize(5, 5);

        this.hero = new pride.Renderable();
        this.hero.setColor([0.0, 0.0, 1.0, 1.0]);
        this.hero.getTransform().setPosition(20, 60);
        this.hero.getTransform().setSize(2, 3);
    }

    draw() {
        pride.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        this.camera.adjustProjection();

        this.support.draw(this.camera);
        this.hero.draw(this.camera);
    }

    update() {
        let delta = 0.1;

        let transform = this.hero.getTransform();

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