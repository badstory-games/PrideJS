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

        this.elementLeft = 0.0;
        this.elementBottom = 0.0;
        this.elementRight = 1.0;
        this.elementTop = 1.0;
    }



    setSpriteRegionUVCoordinates(left, bottom, right, top) {
        this.elementLeft = left;
        this.elementBottom = bottom;
        this.elementRight = right;
        this.elementTop = top;
    }

    setSpriteRegion(x, y, width, height) {
        let texInfo = texture.get(this.texture);
        let imageWidth = texInfo.width;
        let imageHeight = texInfo.height;

        this.elementLeft = x / imageWidth;
        this.elementBottom = y / imageHeight;
        this.elementRight = width / imageWidth;
        this.elementTop = height / imageHeight;
    }

    getElementUVCoordinatesArray() {
        return [
            this.elementRight,  this.elementTop,
            this.elementLeft,   this.elementTop,
            this.elementRight,  this.elementBottom,
            this.elementLeft,   this.elementBottom
        ];
    }

    draw(camera) {
        this.shader.setTextureCoordinates(this.getElementUVCoordinatesArray());
        super.draw(camera);
    }
}

export default SpriteRenderable;
export { TextureCoordinatesArrayIndex };