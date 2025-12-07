import pride from "../engine/pride.js";
import * as glContext from "../engine/core/gl_context.js";



class Game {
    constructor(canvasID) {
        pride.init(canvasID);

        this.camera = new pride.Camera(
            glMatrix.vec2.fromValues(20, 60),
            20,
            [20, 40, 600, 300]
        );
        
        this.blue = new pride.Renderable();
        this.blue.setColor([0.25, 0.25, 0.95, 1]);
        this.red = new pride.Renderable();
        this.red.setColor([1, 0.25, 0.25, 1]);

        this.tl = new pride.Renderable();
        this.tl.setColor([0.9, 0.1, 0.1, 1]);
        this.tr = new pride.Renderable();
        this.tr.setColor([0.1, 0.9, 0.1, 1]);
        this.bl = new pride.Renderable();
        this.bl.setColor([0.1, 0.1, 0.1, 1]);
        this.br = new pride.Renderable();
        this.br.setColor([0.9, 0.1, 0.9, 1]);

        pride.clearCanvas([0.9, 0.9, 0.9, 1]);
        
        this.camera.adjustProjection();


        this.blue.getTransform().setPosition(20, 60);
        this.blue.getTransform().setRotationRadians(0.2);
        this.blue.getTransform().setSize(5, 5);
        this.blue.draw(this.camera);

        this.red.getTransform().setPosition(20, 60);
        this.red.getTransform().setSize(2, 2);
        this.red.draw(this.camera);
        
        this.tl.getTransform().setPosition(10, 65);
        this.tl.draw(this.camera);

        this.tr.getTransform().setPosition(30, 65);
        this.tr.draw(this.camera);

        this.bl.getTransform().setPosition(10, 55);
        this.bl.draw(this.camera);

        this.br.getTransform().setPosition(30, 55);
        this.br.draw(this.camera);
    }
}



window.onload = function() {
    new Game("pride-canvas")
}