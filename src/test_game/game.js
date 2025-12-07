import pride from "../engine/pride.js";



class Game {
    constructor(canvasID) {
        // Шаг А: Инициализация игрового движка
        pride.init(canvasID);
        
        // Шаг B: Создание Renderable обьектов
        this.whiteSquare = new pride.Renderable();
        this.whiteSquare.setColor([1, 1, 1, 1]);

        this.redSquare = new pride.Renderable();
        this.redSquare.setColor([1, 0, 0, 1]);

        // Шаг C: Очистка холста
        pride.clearCanvas([0, 0.8, 0, 1]);

        // Шаг C1: Отрисовка белого прямоугольника
        this.whiteSquare.draw();

        // Шаг C2: Отрисовка красного прямоугольника
        this.redSquare.draw();
    }
}



window.onload = function() {
    new Game("pride-canvas")
}