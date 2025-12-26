"use strict";

import * as glContext from "./gl_context.js";



let vertexBuffer = null;
let verticesOfSquare = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
];



function get() { return vertexBuffer; }



function init() {
    let gl = glContext.get();

    // Шаг А: Создание буфера в контексте gl для позиций вершин
    vertexBuffer = gl.createBuffer();

    // Шаг B: Активация буфера вершин (vertexBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Шаг C: Загрузка вершин квадрата (verticesOfSquare) в буфер вершин (vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
}

function cleanUp() {
    if (vertexBuffer !== null) {
        glContext.get().deleteBuffer(vertexBuffer);
        vertexBuffer == null;
    }
}



export { get, init, cleanUp }