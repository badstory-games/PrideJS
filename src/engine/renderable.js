import * as glContext from "./core/gl_context.js";
import * as shaders from "./core/shaders.js";



class Renderable {
    constructor() {
        this.shader = shaders.getColorShader();
        this.color = [1, 1, 1, 1];
    }



    setColor(color) { this.color = color; }
    
    getColor() { return this.color; }



    draw(transformMatrix) {
        let gl = glContext.get();
        this.shader.activate(this.color, transformMatrix);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}



export default Renderable;