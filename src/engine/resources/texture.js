"use strict";

import * as glContext from "../core/gl_context.js";
import * as map from "../core/resource_map.js";

let has = map.has;
let get = map.get;

class TextureInfo {
    constructor(width, height, id) {
        this.width = width;
        this.height = height;
        this.id = id;
    }
}

function processLoadedImage(path, image) {
    let gl = glContext.get();
    let textureID = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, textureID);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    let texInfo = new TextureInfo(image.naturalWidth, image.naturalHeight, textureID);
    map.set(path, texInfo);
}

function load(textureName) {
    let texturePromise = null;
    if (map.has(textureName)) {
        map.reference(textureName);
    } else {
        map.loadRequested(textureName);
    
        let image = new Image();
        texturePromise = new Promise(
            function(resolve) {
                image.onload = resolve; 
                image.src = textureName;
            }
        ).then(
            function resolve() { 
                processLoadedImage(textureName, image);
            }
        );
        map.pushPromise(texturePromise);
    }

    return texturePromise;
}

function unload(textureName) {
    let texInfo = get(textureName);
    if (map.unreference(textureName)) {
        let gl = glContext.get();
        gl.deleteTexture(texInfo.id);
    }
}

function activate(textureName) {
    let gl = glContext.get();
    let texInfo = get(textureName);

    gl.activeTexture(gl.TEXTURE0); 
    gl.bindTexture(gl.TEXTURE_2D, texInfo.id);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
}

function deactivate() {
    let gl = glContext.get();
    gl.bindTexture(gl.TEXTURE_2D, null);
}

export {
    has, get, load, unload,

    TextureInfo,    

    activate, deactivate
}