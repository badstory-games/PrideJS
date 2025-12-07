"use strict";

import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";



let compiledShader = null;
let vertexPosition = null;



function loadAndCompileShader(id, type) {
    let shaderSource = null;
    let shader = null;
    let shaderText = document.getElementById(id);
    let gl = core.getGL();

    // Шаг A: Получение исходного кода шейдера из index.html
    shaderSource = shaderText.firstChild.textContent;

    // Шаг B: Создание шейдера в зависимости от типа: вершинный или фрагментный
    shader = gl.createShader(type);

    // Шаг C: Компиляция созданного шейдера
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    // Шаг D: Проверка на наличие ошибок и возвращение результата (null в случае ошибки)
    // InfoLog отображает ошибки компиляции.
    // Это полезно для отладки шейдеров.
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error("Произошла ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
    }

    return shader;
}



function init(vertexShaderID, fragmentShaderID) {
    let gl = core.getGL();

    // Шаг А: Загрузка и компиляция вершинного и фрагментного шейдера
    let vertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
    let fragmentShader = loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER)

    // Шаг B: Создание шейдеров и объединение их в программу.
    compiledShader = gl.createProgram();
    gl.attachShader(compiledShader, vertexShader);
    gl.attachShader(compiledShader, fragmentShader);
    gl.linkProgram(compiledShader);

    // Шаг С: Проверка на ошибки
    if (!gl.getProgramParameter(compiledShader, gl.LINK_STATUS)) {
        throw new Error("Ошибка объединения шейдера");
    }

    // Шаг D: Получение ссылки на атрибут aVertexPosition в шейдере
    vertexPosition = gl.getAttribLocation(compiledShader, "aVertexPosition");
}

function activate() {
    // Шаг А: Доступ к WebGL контексту
    let gl = core.getGL();

    // Шаг B: Определение скомпилированного шейдера для использования
    gl.useProgram(compiledShader);

    // Шаг C: Привязка вершинного буфера к атрибуту, определенному в вершинном шейдере
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
    gl.vertexAttribPointer(
        this.vertexPosition,
        3,  // Каждый элемент имеет 3-float (x, y, z)
        gl.FLOAT, // Тип данных - FLOAT
        false, // Является ли содержимое нормализованными векторами
        0, // Количество байт, которые нужно пропускать между элементами
        0 // Смещение, относительно первого элемента
    );
    gl.enableVertexAttribArray(this.vertexPosition);
}



export { init, activate }