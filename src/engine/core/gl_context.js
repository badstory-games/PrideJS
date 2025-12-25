"use strict";



let canvas = null;
let gl = null;



function get() { return gl; }



function init(canvasID) {
    canvas = document.getElementById(canvasID);

    if (canvas === null) {
        throw new Error("Инициализация движка: [" + canvasID + "] Идентификатор холста не найден.");
    }
    
    // Получение стандартного или экспериментального WebGL и привязка его к области холста
    // Сохранение результата в переменной экземпляра "gl"
    gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

    if (gl === null) {
        document.getElementById("error-output").innerHTML = "WebGL 2 не поддерживается!"
    }
}



export { get, init }