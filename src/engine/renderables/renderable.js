"use strict";

import * as glContext from "../core/gl_context.js";
import * as shaders from "../core/shaders.js";
import Transform from "../transform.js";



class Renderable {
    constructor() {
        this.shader = shaders.getColorShader();
        this.color = [1, 1, 1, 0.0];
        this.transform = new Transform();
    }



    getTransform() { return this.transform; }

    setColor(color) { this.color = color; }
    
    getColor() { return this.color; }



    draw(camera) {
        let gl = glContext.get();
        this.shader.activate(this.color, this.transform.getMatrix(), camera.getMatrix());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    _setShader(shader) { this.shader = shader; }
}



export default Renderable;