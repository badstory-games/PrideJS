"use strict";

import * as glContext from "../core/gl_context.js";
import * as vertexBuffer from "../core/vertex_buffer.js";

import SimpleShader from "./simple_shader.js";

class TextureShader extends SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        super(vertexShaderPath, fragmentShaderPath);
        
        this.textureCoordinatesLocation = null;
        this.samplerLocation = null;

        let gl = glContext.get();

        this.textureCoordinatesLocation = gl.getAttribLocation(this.compiledShader, "aTextureCoordinates");
        this.samplerLocation = gl.getUniformLocation(this.compiledShader, "uSampler");
    }



    activate(pixelColor, transformMatrix, cameraTransformMatrix) {
        super.activate(pixelColor, transformMatrix, cameraTransformMatrix);

        let gl = glContext.get();

        gl.bindBuffer(gl.ARRAY_BUFFER, this._getTextureCoordinatesBuffer());
        gl.vertexAttribPointer(this.textureCoordinatesLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.textureCoordinatesLocation);

        gl.uniform1i(this.samplerLocation, 0);
    }



    _getTextureCoordinatesBuffer() {
        return vertexBuffer.getTextureCoordinatesBuffer();
    }
}

export default TextureShader;