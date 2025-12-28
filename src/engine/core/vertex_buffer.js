"use strict";

import * as glContext from "./gl_context.js";



let vertexBuffer = null;
let verticesOfSquare = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
];

let textureCoordinatesBuffer = null;
let textureCoordinates = [
    1.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    0.0, 0.0
];



function getVertexBuffer() { return vertexBuffer; }

function getTextureCoordinatesBuffer() { return textureCoordinatesBuffer; }




function init() {
    let gl = glContext.get();

    // Шаг А: Создание буфера в контексте gl для позиций вершин
    vertexBuffer = gl.createBuffer();

    // Шаг B: Активация буфера вершин (vertexBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Шаг C: Загрузка вершин квадрата (verticesOfSquare) в буфер вершин (vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);



    textureCoordinatesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinatesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
}

function cleanUp() {
    let gl = glContext.get();
    
    if (vertexBuffer !== null) {
        gl.deleteBuffer(vertexBuffer);
        vertexBuffer == null;
    }

    if (textureCoordinatesBuffer !== null) {
        gl.deleteBuffer(textureCoordinatesBuffer);
        textureCoordinatesBuffer == null;
    }
}



export { getVertexBuffer, getTextureCoordinatesBuffer, init, cleanUp }