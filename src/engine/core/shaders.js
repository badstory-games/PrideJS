"use strict";

import * as text from "../resources/text.js";
import * as map from "./resource_map.js";

import SimpleShader from "../simple_shader.js";



// Простой шейдер
let simpleVS = "src/engine/glsl/simple_vs.glsl";
let simpleFS = "src/engine/glsl/simple_fs.glsl";
let colorShader = null;



function getColorShader() { return colorShader; }



function createShaders() {
    colorShader = new SimpleShader(simpleVS, simpleFS);
}

function init() {
    let loadPromise = new Promise(
        async function(resolve) {
            await Promise.all([
                text.load(simpleVS),
                text.load(simpleFS)
            ]);
            resolve();
        }
    ).then(
        function resolve() { createShaders(); }
    );

    map.pushPromise(loadPromise);
}



export { init, getColorShader }