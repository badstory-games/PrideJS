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
        
        // Шаг D: Преобразования белого прямоугольника
        this.whiteSquare.getTransform().setPosition(-0.25, 0.25);
        this.whiteSquare.getTransform().setRotationRadians(0.2);
        this.whiteSquare.getTransform().setSize(1.2, 1.2);

        // Шаг E: Отрисовка белого прямоугольника
        this.whiteSquare.draw();

        // Шаг F: Преобразования красного прямоугольника
        this.redSquare.getTransform().setPositionX(0.25);
        this.redSquare.getTransform().setPositionY(-0.25);
        this.redSquare.getTransform().setRotationDegrees(45);
        this.redSquare.getTransform().setWidth(0.4);
        this.redSquare.getTransform().setHeight(0.4);

        // Шаг G: Отрисовка красного прямоугольника
        this.redSquare.draw();
    }
}



window.onload = function() {
    new Game("pride-canvas")
}