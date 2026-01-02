"use strict";

import * as texture from "../resources/texture.js";
import pride from "../pride.js";
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

TextureRenderable.prototype._getIDToPosition = function(returnPosition, i, j) {
    let x = i * this.transform.getWidth() / this.elementWidth;
    let y = j * this.transform.getHeight() / this.elementHeight;
    returnPosition[0] = this.transform.getPositionX() + (x - (this.transform.getWidth() * 0.5));
    returnPosition[1] = this.transform.getPositionY() + (y - (this.transform.getHeight() * 0.5));
}

TextureRenderable.prototype._getPositionToID = function(returnID, position) {
    let delta = [];
    pride.math.vec2.sub(delta, position, this.transform.getPosition());
    returnID[0] = this.elementWidth * (delta[0] / this.transform.getWidth());
    returnID[1] = this.elementHeight * (delta[1] / this.transform.getHeight());

    
    returnID[0] += this.elementWidth / 2;
    returnID[1] += this.elementHeight / 2;

    returnID[0] = Math.floor(returnID[0]);
    returnID[1] = Math.floor(returnID[1]);
}

TextureRenderable.prototype.pixelTouches = function(other, touchPosition) {
    let pixelTouch = false;
    let xIndex = 0, yIndex;
    let otherIndex = [0, 0];

    while ((!pixelTouch) && (xIndex < this.elementWidth)) {
        yIndex = 0;
        while ((!pixelTouch) && (yIndex < this.elementHeight)) {
            if (this._getPixelAlphaValue(xIndex, yIndex) > 0) {
                this._getIDToPosition(touchPosition, xIndex, yIndex);
                other._getPositionToID(otherIndex, touchPosition);
                if ((otherIndex[0] >= 0) && (otherIndex[0] < other.elementWidth) &&
                    (otherIndex[1] >= 0) && (otherIndex[1] < other.elementHeight)) {
                    pixelTouch = other._getPixelAlphaValue(otherIndex[0], otherIndex[1]) > 0;
                }
            }
            
            yIndex++;
        }

        xIndex++;
    }

    return pixelTouch;
}



export default TextureRenderable;