"use strict";

import TextureRenderable from "./texture_renderable.js";
import * as texture from "../resources/texture.js";
import * as shaders from "../core/shaders.js";

const TextureCoordinatesArrayIndex = Object.freeze({
    LEFT: 2,
    RIGHT: 0,
    TOP: 1,
    BOTTOM: 5
});

class SpriteRenderable extends TextureRenderable {
    constructor(path) {
        super(path);
        super._setShader(shaders.getSpriteShader());

        this.elementX = 0.0;
        this.elementY = 0.0;
        this.elementWidth = 1.0;
        this.elementHeight = 1.0;
    }



    setSpriteRegionUVCoordinates(left, bottom, right, top) {
        this.elementX = left;
        this.elementY = bottom;
        this.elementWidth = right;
        this.elementHeight = top;
    }

    setSpriteRegion(x, y, width, height) {
        let texInfo = texture.get(this.texture);
        let imageWidth = texInfo.width;
        let imageHeight = texInfo.height;

        this.elementX = x / imageWidth;
        this.elementY = y / imageHeight;
        this.elementWidth = width / imageWidth;
        this.elementHeight = height / imageHeight;
    }

    getElementUVCoordinatesArray() {
        return [
            this.elementWidth,  this.elementHeight,
            this.elementX,   this.elementHeight,
            this.elementWidth,  this.elementY,
            this.elementX,   this.elementY
        ];
    }

    draw(camera) {
        this.shader.setTextureCoordinates(this.getElementUVCoordinatesArray());
        super.draw(camera);
    }
}

export default SpriteRenderable;
export { TextureCoordinatesArrayIndex };