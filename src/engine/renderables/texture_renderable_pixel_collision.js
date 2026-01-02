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

TextureRenderable.prototype._idToPosition = function(returnPosition, i, j) {
    let x = i * this.transform.getWidth() / this.elementWidth;
    let y = j * this.transform.getHeight() / this.elementHeight;
    returnPosition[0] = this.transform.getPositionX() + (x - (this.transform.getWidth() * 0.5));
    returnPosition[1] = this.transform.getPositionY() + (y - (this.transform.getHeight() * 0.5));
}



export default TextureRenderable;