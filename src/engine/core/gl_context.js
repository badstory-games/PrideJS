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
    gl = canvas.getContext("webgl2", {alpha: false});

    if (gl === null) {
        document.getElementById("error-output").innerHTML = "WebGL 2 не поддерживается!"
    }

    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
}

function cleanUp() {
    if ((gl == null) || (canvas == null)) {
        throw new Error("Очистка движка: система не инициализирована.")
    }

    gl = null;
    canvas.style.position = "fixed";
    canvas.style.backgroundColor = "rgba(200, 200, 200, 0.5)";
    canvas = null;
    document.body.innerHTML += "<br><br><h1>Конец игры</h1><h1> Остановка системы</h1>"
}



export { get, init, cleanUp }