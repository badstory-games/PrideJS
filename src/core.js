"use strict";

let gl = null;

function getGL() { return gl; }

function initWebGL(canvasID) {
    let canvas = document.getElementById(canvasID);
    gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

    if (gl === null) {
        document.getElementById("error-output").innerHTML = "WebGL 2 не поддерживается!"
    }

    gl.clearColor(0.0, 0.8, 0.0, 1.0);
}

function clearCanvas() {
    gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = function() {
    initWebGL("pride-canvas");
    clearCanvas();
}