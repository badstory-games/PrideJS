"use strict";

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
    createShaders();
}



export { init, getColorShader }