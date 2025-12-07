import pride from "../engine/pride.js";
import * as glContext from "../engine/core/gl_context.js";



class Game {
    constructor(canvasID) {
        pride.init(canvasID);
        
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
        


        let gl = glContext.get();
        gl.viewport(
            20,
            40,
            600,
            300
        );
        gl.scissor(
            20,
            40,
            600,
            300
        );

        gl.enable(gl.SCISSOR_TEST);
        pride.clearCanvas([0.8, 0.8, 0.8, 1.0]);
        gl.disable(gl.SCISSOR_TEST);

        let cameraCenter = glMatrix.vec2.fromValues(20, 60);
        let worldCoordinatesSize = glMatrix.vec2.fromValues(20, 10);
        let cameraMatrix = glMatrix.mat4.create();

        glMatrix.mat4.scale(
            cameraMatrix,
            glMatrix.mat4.create(),
            glMatrix.vec3.fromValues(2.0 / worldCoordinatesSize[0], 2.0 / worldCoordinatesSize[1], 1.0)
        );
        glMatrix.mat4.translate(
            cameraMatrix,
            cameraMatrix,
            glMatrix.vec3.fromValues(-cameraCenter[0], -cameraCenter[1], 0)
        );


        this.blue.getTransform().setPosition(20, 60);
        this.blue.getTransform().setRotationRadians(0.2);
        this.blue.getTransform().setSize(5, 5);
        this.blue.draw(cameraMatrix);

        this.red.getTransform().setPosition(20, 60);
        this.red.getTransform().setSize(2, 2);
        this.red.draw(cameraMatrix);
        
        this.tl.getTransform().setPosition(10, 65);
        this.tl.draw(cameraMatrix);

        this.tr.getTransform().setPosition(30, 65);
        this.tr.draw(cameraMatrix);

        this.bl.getTransform().setPosition(10, 55);
        this.bl.draw(cameraMatrix);

        this.br.getTransform().setPosition(30, 55);
        this.br.draw(cameraMatrix);
    }
}



window.onload = function() {
    new Game("pride-canvas")
}