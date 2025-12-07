"use strict";

import * as vertexBuffer from "./vertex_buffer.js";
import SimpleShader from "./simple_shader.js";




let gl = null;
let shader = null;



function getGL() { return gl; }



function init(canvasID) {
    initWebGL(canvasID);
    vertexBuffer.init();
    createShader();
}

function initWebGL(canvasID) {
    let canvas = document.getElementById(canvasID);
    
    // Получение стандартного или экспериментального WebGL и привязка его к области холста
    // Сохранение результата в переменной экземпляра "gl"
    gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

    if (gl === null) {
        document.getElementById("error-output").innerHTML = "WebGL 2 не поддерживается!"
    }
}

function createShader() {
    shader = new SimpleShader("src/engine/glsl/simple_vs.glsl", "src/engine/glsl/white_fs.glsl");
}

function drawSquare() {
    // Шаг А: Активация шейдера
    shader.activate();

    // Шаг B: Отрисовка с указанными настройками
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function clearCanvas(color) {
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
}



export { getGL, init, clearCanvas, drawSquare }