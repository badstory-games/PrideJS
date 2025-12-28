"use strict";

import * as glContext from "../core/gl_context.js";
import TextureShader from "./texture_shader.js";



class SpriteShader extends TextureShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        super(vertexShaderPath, fragmentShaderPath);

        this.textureCoordinatesBuffer = null;

        let initTextureCoordinates = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ];

        let gl = glContext.get();
        this.textureCoordinatesBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordinatesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTextureCoordinates), gl.DYNAMIC_DRAW);
    }



    _getTextureCoordinatesBuffer() { return this.textureCoordinatesBuffer; }

    setTextureCoordinates(textureCoordinates) {
        let gl = glContext.get();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordinatesBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(textureCoordinates));
    }

    cleanUp() {
        let gl = glContext.get();
        gl.deleteBuffer(this.textureCoordinatesBuffer);

        super.cleanUp();
    }
}

export default SpriteShader;