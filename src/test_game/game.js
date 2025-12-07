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

        let transformMatrix = glMatrix.mat4.create();
        
        // Шаг D: Вычисление преобразования белого прямоугольника
        glMatrix.mat4.translate(transformMatrix, transformMatrix, glMatrix.vec3.fromValues(-0.25, 0.25, 0.0));
        // Вращение в радианах
        glMatrix.mat4.rotateZ(transformMatrix, transformMatrix, 0.2);
        glMatrix.mat4.scale(transformMatrix, transformMatrix, glMatrix.vec3.fromValues(1.2, 1.2, 1.0));

        // Шаг E: Отрисовка белого прямоугольника с вычисленным преобразованием
        this.whiteSquare.draw(transformMatrix);

        // Шаг F: Вычисление преобразования красного прямоугольника
        glMatrix.mat4.identity(transformMatrix);
        glMatrix.mat4.translate(transformMatrix, transformMatrix, glMatrix.vec3.fromValues(0.25, -0.25, 0.0));
        // Вращение в радианах
        glMatrix.mat4.rotateZ(transformMatrix, transformMatrix, -0.785);
        glMatrix.mat4.scale(transformMatrix, transformMatrix, glMatrix.vec3.fromValues(0.4, 0.4, 1.0));

        // Шаг G: Отрисовка красного прямоугольника с вычисленным преобразованием
        this.redSquare.draw(transformMatrix);
    }
}



window.onload = function() {
    new Game("pride-canvas")
}