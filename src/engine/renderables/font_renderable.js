"use strict";

import Transform from "../transform.js";
import SpriteRenderable from "./sprite_renderable.js";
import * as defaultResources from "../resources/default_resources.js";
import * as font from "../resources/font.js";

class FontRenderable {
    constructor(text) {
        this.fontName = defaultResources.getDefaultFontName();
        this.characterRenderable = new SpriteRenderable(font.getImageName(this.fontName));
        this.transform = new Transform();
        this.text = text;
    }

    draw(camera) {
        // we will draw the text string by calling to characterRenderable for each of the
        // chars in the text string.
        let widthOfOneChar = this.transform.getWidth() / this.text.length;
        let heightOfOneChar = this.transform.getHeight();
        let yPos = this.transform.getPositionY();

        // center position of the first char
        let xPos = this.transform.getPositionX() - (widthOfOneChar / 2) + (widthOfOneChar * 0.5);
        let charIndex, aChar, charInfo, xSize, ySize, xOffset, yOffset;
        for (charIndex = 0; charIndex < this.text.length; charIndex++) {
            aChar = this.text.charCodeAt(charIndex);    
            charInfo = font.getCharacterInfo(this.fontName, aChar);
            
            // set the texture coordinate
            this.characterRenderable.setSpriteRegionUVCoordinates(charInfo.texCoordLeft, charInfo.texCoordBottom,
                charInfo.texCoordRight, charInfo.texCoordTop);

            // now the size of the char
            xSize = widthOfOneChar * charInfo.charWidth;
            ySize = heightOfOneChar * charInfo.charHeight;
            this.characterRenderable.getTransform().setSize(xSize, ySize);

            // how much to offset from the center
            xOffset = widthOfOneChar * charInfo.charWidthOffset * 0.5;
            yOffset = heightOfOneChar * charInfo.charHeightOffset * 0.5;

            this.characterRenderable.getTransform().setPosition(xPos - xOffset, yPos - yOffset);

            this.characterRenderable.draw(camera);

            xPos += widthOfOneChar;
        }
    }

    getTransform() { return this.transform; }

    getText() { return this.text; }

    setText(text) {
        this.text = text;
        this.setTextHeight(this.getTransform().getHeight());
    }

    setTextHeight(height) {
        let charInfo = font.getCharacterInfo(this.fontName, "A".charCodeAt(0)); // this is for "A"
        let w = height * charInfo.charAspectRatio;
        this.getTransform().setSize(w * this.text.length, height);
    }

    getFontName() { return this.fontName; }

    setFontName(fontName) {
        this.fontName = fontName;
        this.characterRenderable.setTexture(font.getImageName(this.fontName));
    }

    setColor(color) { this.characterRenderable.setColor(color); }
    getColor() { return this.characterRenderable.getColor(); }

    update() {}
}

export default FontRenderable;