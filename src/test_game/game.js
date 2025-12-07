import pride from "../engine/pride.js";
import * as loop from "../engine/core/loop.js";



class Game {
    constructor() {
        this.camera = null;
        
        this.white = null;
        this.red = null;
    }



    init() {
        this.camera = new pride.Camera(
            glMatrix.vec2.fromValues(20, 60),
            20,
            [20, 40, 600, 300]
        );
        this.camera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.white = new pride.Renderable();
        this.white.setColor([1, 1, 1, 1]);
        this.white.getTransform().setPosition(20, 60);
        this.white.getTransform().setRotationRadians(0.2);
        this.white.getTransform().setSize(5, 5);

        this.red = new pride.Renderable();
        this.red.setColor([1, 0, 0, 1]);
        this.red.getTransform().setPosition(20, 60);
        this.red.getTransform().setSize(2, 2);
    }

    draw() {
        pride.clearCanvas([0.9, 0.9, 0.9, 1]);
        this.camera.adjustProjection();

        this.white.draw(this.camera);
        this.red.draw(this.camera);
    }

    update() {
        let whiteTransform = this.white.getTransform();
        let delta = 0.1;
        
        if (pride.input.isKeyPressed(pride.input.keys.D)) {
            whiteTransform.increasePositionX(delta);
        }
        else if (pride.input.isKeyPressed(pride.input.keys.A)) {
            whiteTransform.increasePositionX(-delta);
        }
        if (pride.input.isKeyPressed(pride.input.keys.W)) {
            whiteTransform.increasePositionY(delta);
        }
        else if (pride.input.isKeyPressed(pride.input.keys.S)) {
            whiteTransform.increasePositionY(-delta);
        }

        let redTransform = this.red.getTransform();
        if (redTransform.getWidth() > 5) {
            redTransform.setSize(2, 2);
        }
        redTransform.increaseSize(0.05);
    }
}



window.onload = function() {
    pride.init("pride-canvas");
    let game = new Game();
    loop.start(game)
}