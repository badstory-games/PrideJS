"use strict";

import * as texture from "./texture.js";
import * as xml from "./xml.js";



let descriptionExtension = ".fnt";
let imageExtension = ".png";

class CharacterInfo {
    constructor() {
        // в текстурных координатах (от 0 до 1) отображается все изображение целиком
        this.texCoordLeft = 0;
        this.texCoordRight = 1;
        this.texCoordBottom = 0;
        this.texCoordTop = c

        // ссылка на номинальный размер символа, 1 - это "стандартная ширина/высота" символа
        this.charWidth = 1;
        this.charHeight = 1;
        this.charWidthOffset = 0;
        this.charHeightOffset = 0;

        // ссылка на соотношение ширины и высоты символа
        this.charAspectRatio = 1;
    }
}

function getImageName(fontName) { return fontName + imageExtension; }

function getDescriptionName(fontName) { return fontName + descriptionExtension; }

function load(fontName) {
    texture.load(getImageName(fontName));
    xml.load(getDescriptionName(fontName));
}

function unload(fontName) {
    texture.unload(getImageName(fontName));
    xml.unload(getDescriptionName(fontName));
}

function has(fontName) { return texture.has(getImageName(fontName)) && xml.has(getDescriptionName(fontName)); }

function getCharacterInfo(fontName, char) {
    let returnInfo = null;
    let fontInfo = xml.get(getDescriptionName(fontName));
    let commonPath = "font/common";
    let commonInfo = fontInfo.evaluate(commonPath, fontInfo, null, XPathResult.ANY_TYPE, null);
    commonInfo = commonInfo.iterateNext();
    if (commonInfo === null) {
        return returnInfo;
    }
    let charHeight = commonInfo.getAttribute("base");

    let charPath = "font/chars/char[@id=" + char + "]";
    let charInfo = fontInfo.evaluate(charPath, fontInfo, null, XPathResult.ANY_TYPE, null);
    charInfo = charInfo.iterateNext();

    if (charInfo === null) {
        return returnInfo;
    }

    returnInfo = new CharacterInfo();
    let texInfo = texture.get(getImageName(fontName));
    let leftPixel = Number(charInfo.getAttribute("x"));
    let rightPixel = leftPixel + Number(charInfo.getAttribute("width")) - 1;
    let topPixel = (texInfo.height - 1) - Number(charInfo.getAttribute("y"));
    let bottomPixel = topPixel - Number(charInfo.getAttribute("height")) + 1;

    // texture coordinate information
    returnInfo.texCoordLeft = leftPixel / (texInfo.width - 1);
    returnInfo.texCoordTop = topPixel / (texInfo.height - 1);
    returnInfo.texCoordRight = rightPixel / (texInfo.width - 1);
    returnInfo.texCoordBottom = bottomPixel / (texInfo.height - 1)

    // relative character size
    let charWidth = charInfo.getAttribute("xadvance");
    returnInfo.charWidth = charInfo.getAttribute("width") / charWidth;
    returnInfo.charHeight = charInfo.getAttribute("height") / charHeight;
    returnInfo.charWidthOffset = charInfo.getAttribute("xoffset") / charWidth;
    returnInfo.charHeightOffset = charInfo.getAttribute("yoffset") / charHeight;
    returnInfo.charAspectRatio = charWidth / charHeight;

    return returnInfo;
}

export {
    has, load, unload,
    getImageName, getDescriptionName,
    CharacterInfo,
    getCharacterInfo
}