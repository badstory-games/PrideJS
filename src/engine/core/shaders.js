"use strict";

import * as text from "../resources/text.js";
import * as map from "./resource_map.js";

import SimpleShader from "../shaders/simple_shader.js";
import TextureShader from "../shaders/texture_shader.js";



// Простой шейдер
let simpleVS = "src/engine/glsl/simple_vs.glsl";
let simpleFS = "src/engine/glsl/simple_fs.glsl";
let colorShader = null;

// Текстурный шейдер
let textureVS = "src/engine/glsl/texture_vs.glsl";
let textureFS = "src/engine/glsl/texture_fs.glsl";
let textureShader = null;



function getColorShader() { return colorShader; }

function getTextureShader() { return textureShader; }



function createShaders() {
    colorShader = new SimpleShader(simpleVS, simpleFS);
    textureShader = new TextureShader(textureVS, textureFS);
}

function init() {
    let loadPromise = new Promise(
        async function(resolve) {
            await Promise.all([
                text.load(simpleVS),
                text.load(simpleFS),
                text.load(textureVS),
                text.load(textureFS)
            ]);
            resolve();
        }
    ).then(
        function resolve() { createShaders(); }
    );

    map.pushPromise(loadPromise);
}

function cleanUp() {
    colorShader.cleanUp();
    textureShader.cleanUp();

    text.unload(simpleVS);
    text.unload(simpleFS);
    text.unload(textureVS),
    text.unload(textureFS)
}



export { init, cleanUp, getColorShader, getTextureShader }