import * as engine from "../engine/core.js";



class Game {
    constructor(canvasID) {
        // Шаг А: Инициализация игрового движка
        engine.init(canvasID);

        // Шаг B: Очистка холста
        engine.clearCanvas([0, 0.8, 0, 1]);

        // Шаг C: Отрисовка прямоугольника красным цветом
        engine.drawSquare([1, 0, 0, 1]);
    }
}



window.onload = function() {
    new Game("pride-canvas")
}