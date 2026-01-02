"use strict";

import * as texture from "../resources/texture.js";
import * as shaders from "../core/shaders.js";

import Renderable from "./renderable.js";



class TextureRenderable extends Renderable {
    constructor(texturePath) {
        super();
        super.setColor([1, 1, 1, 0]);
        super._setShader(shaders.getTextureShader());

        this.texture = null;
        // Эти две переменные нужны для хранения информации о текстуре для попиксельных столкновений
        this.textureInfo = null;
        this.colorArray = null;
        // Эти переменные нужны для субкласса для переопределения
        this.elementWidth = 0;
        this.elementHeight = 0;
        this.elementLeftID = 0;
        this.elementBottomID = 0;

        this.setTexture(texturePath);
    }



    draw(camera) {
        texture.activate(this.texture);
        super.draw(camera);
    }

    getTexture() { return this.texture; }

    setTexture(texturePath) {
        this.texture = texturePath;

        // Эти две переменные нужны для хранения информации о текстуре для попиксельных столкновений
        this.textureInfo = texture.get(texturePath);
        this.colorArray = null;

        // Определен для одного элемента sprite для переопределения подклассом
        // Для texture_renderable один элемент спрайта - это вся текстура целиком
        this.elementWidth = this.textureInfo.width;
        this.elementHeight = this.textureInfo.height;
        this.elementLeftID = 0;
        this.elementBottomID = 0;
    }
}

export default TextureRenderable;