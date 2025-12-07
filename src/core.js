"use strict";

import * as vertexBuffer from "./vertex_buffer.js";
import * as simpleShader from "./shader_support.js";




let gl = null;



function getGL() { return gl; }



function initWebGL(canvasID) {
    let canvas = document.getElementById(canvasID);
    
    // Получение стандартного или экспериментального WebGL и привязка его к области холста
    // Сохранение результата в переменной экземпляра "gl"
    gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

    if (gl === null) {
        document.getElementById("error-output").innerHTML = "WebGL 2 не поддерживается!"
    }

    // Установка цвета для очистки области холста
    gl.clearColor(0.0, 0.8, 0.0, 1.0);

    // Инициализация буфера с позициями вершин для единичного квадрата
    vertexBuffer.init();

    // Загрузка и компиляция вершинного и фрагментного шейдера
    simpleShader.init("vertex-shader", "fragment-shader");
}

function drawSquare() {
    // Шаг А: Активация шейдера
    simpleShader.activate();

    // Шаг B: Отрисовка с указанными настройками
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function clearCanvas() {
    gl.clear(gl.COLOR_BUFFER_BIT);
}



window.onload = function() {
    initWebGL("pride-canvas");
    clearCanvas();
    drawSquare();
}



export { getGL }