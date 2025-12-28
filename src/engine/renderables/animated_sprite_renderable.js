"use strict";

import SpriteRenderable from "./sprite_renderable.js";
import * as texture from "../resources/texture.js";
import * as shaders from "../core/shaders.js";



const AnimationType = Object.freeze({
    RIGHT: 0,     // Анимация идет сначала (слева) направо, когда анимация дойдет до конца, снова начнется слева
    LEFT: 1,      // Анимация идет сначала (справа) налево, когда анимация дойдет до конца, снова начнется справа
    SWING: 2      // Анимация идет сначала (слева) направо, когда анимация дойдет до конца, анимация начнется в обратном направлении
});

class AnimatedSpriteRenderable extends SpriteRenderable {
    constructor(texturePath) {
        super(texturePath);
        super._setShader(shaders.getSpriteShader());

        this.firstElementX = 0.0;
        this.elementTop = 1.0;
        this.elementWidth = 1.0;
        this.elementHeight = 1.0;
        this.widthPadding = 0.0;
        this.numberOfElements = 1;

        this.updateInterval = 1;
        this.animationType = AnimationType.RIGHT;

        this.currentAnimationAdvance = -1;
        this.currentElement = 0;
        this._initAnimation();
    }



    _initAnimation() {
        // Текущая запущенная анимация
        this.currentTick = 0;
        switch (this.animationType) {
        case AnimationType.RIGHT:
            this.currentElement = 0;
            this.currentAnimationAdvance = 1;
            break;
        case AnimationType.SWING:
            this.currentAnimationAdvance = -1 * this.currentAnimationAdvance;
            this.currentElement += 2 * this.currentAnimationAdvance;
            break;
        case AnimationType.LEFT:
            this.currentElement = this.numberOfElements - 1;
            this.currentAnimationAdvance = -1;
            break;
        }
        this._setSpriteElement();
    }

    _setSpriteElement() {
        let left = this.firstElementX + (this.currentElement * (this.elementWidth + this.widthPadding));
        super.setSpriteRegionUVCoordinates(left, this.elementTop - this.elementHeight, left + this.elementWidth, this.elementTop);
    }

    setSpriteSequence(x, y, width, height, numberOfFrames, padding) {
        let texInfo = texture.get(this.texture);
        let imageW = texInfo.width;
        let imageH = texInfo.height;

        this.numberOfElements = numberOfFrames;
        this.firstElementX = x / imageW;
        this.elementTop = y / imageH;
        this.elementWidth = width / imageW;
        this.elementHeight = height / imageH;
        this.widthPadding = padding / imageW;
        this._initAnimation();
    }

    setAnimationInterval(speed) {
        this.updateInterval = speed;
    }

    increaseAnimationInterval(speed) {
        this.updateInterval += speed;
    }

    setAnimationType(animationType) {
        this.animationType = animationType;
        this.currentAnimationAdvance = -1;
        this.currentElement = 0;
        this._initAnimation();
    }

    updateAnimation() {
        this.currentTick++;
        if (this.currentTick >= this.updateInterval) {
            this.currentTick = 0;
            this.currentElement += this.currentAnimationAdvance;
            if ((this.currentElement >= 0) && (this.currentElement < this.numberOfElements)) {
                this._setSpriteElement();
            } else {
                this._initAnimation();
            }
        }
    }
}

export default AnimatedSpriteRenderable;
export { AnimationType };