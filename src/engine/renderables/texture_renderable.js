"use strict";

import * as texture from "../resources/texture.js";
import * as shaders from "../core/shaders.js";

import Renderable from "./renderable.js";



class TextureRenderable extends Renderable {
    constructor(tex) {
        super();
        super._setShader(shaders.getTextureShader());

        this.texture = tex;
    }



    draw(camera) {
        texture.activate(this.texture);
        super.draw(camera);
    }

    getTexture() { return this.texture; }

    setTexture(tex) { this.texture = tex; }
}

export default TextureRenderable;