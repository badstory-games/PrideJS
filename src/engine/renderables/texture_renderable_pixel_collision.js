"use strict";

import * as texture from "../resources/texture.js";
import TextureRenderable from "./texture_renderable_main.js";



TextureRenderable.prototype.setColorArray = function() {
    if (this.colorArray === null) {
        this.colorArray = texture.getColorArray(this.texture);
    }
}

TextureRenderable.prototype._getPixelAlphaValue = function(x, y) {
    x = x * 4;
    y = y * 4;

    return this.colorArray[(y * this.textureInfo.width) + x + 3];
}



export default TextureRenderable;