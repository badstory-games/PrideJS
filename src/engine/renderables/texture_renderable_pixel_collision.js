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

TextureRenderable.prototype._getIDToPosition = function(returnPosition, i, j, xDir, yDir) {
    let x = i * this.transform.getWidth() / this.elementWidth;
    let y = j * this.transform.getHeight() / this.elementHeight;

    let xDisp = x - (this.transform.getWidth() * 0.5);
    let yDisp = y - (this.transform.getHeight() * 0.5);

    let xDirDisp = [];
    let yDirDisp = [];

    pride.math.vec2.scale(xDirDisp, xDir, xDisp);
    pride.math.vec2.scale(yDirDisp, yDir, yDisp);

    pride.math.vec2.add(returnPosition, this.transform.getPosition(), xDirDisp);
    pride.math.vec2.add(returnPosition, returnPosition, yDirDisp);
}

TextureRenderable.prototype._getPositionToID = function(returnID, position, xDir, yDir) {
    let delta = [];
    pride.math.vec2.sub(delta, position, this.transform.getPosition());

    let xDisp = pride.math.vec2.dot(delta, xDir);
    let yDisp = pride.math.vec2.dot(delta, yDir);

    returnID[0] = this.elementWidth * (xDisp / this.transform.getWidth());
    returnID[1] = this.elementHeight * (yDisp / this.transform.getHeight());

    
    returnID[0] += this.elementWidth / 2;
    returnID[1] += this.elementHeight / 2;

    returnID[0] = Math.floor(returnID[0]);
    returnID[1] = Math.floor(returnID[1]);
}

TextureRenderable.prototype.pixelTouches = function(other, touchPosition) {
    let pixelTouch = false;
    let xIndex = 0, yIndex;
    let otherIndex = [0, 0];

    let xDir = [1, 0];
    let yDir = [0, 1];
    let otherXDir = [1, 0];
    let otherYDir = [0, 1];

    pride.math.vec2.simpleRotate(xDir, xDir, this.transform.getRotationRadians());
    pride.math.vec2.simpleRotate(yDir, yDir, this.transform.getRotationRadians());
    pride.math.vec2.simpleRotate(otherXDir, otherXDir, other.transform.getRotationRadians());
    pride.math.vec2.simpleRotate(otherYDir, otherYDir, other.transform.getRotationRadians());

    while ((!pixelTouch) && (xIndex < this.elementWidth)) {
        yIndex = 0;
        while ((!pixelTouch) && (yIndex < this.elementHeight)) {
            if (this._getPixelAlphaValue(xIndex, yIndex) > 0) {
                this._getIDToPosition(touchPosition, xIndex, yIndex, xDir, yDir);
                other._getPositionToID(otherIndex, touchPosition, otherXDir, otherYDir);
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