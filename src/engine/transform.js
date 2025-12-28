"use strict";

import * as math from "./math/math.js";

class Transform {
    constructor() {
        this.position = math.vec2.fromValues(0, 0);
        this.size = math.vec2.fromValues(16, 16);
        this.rotation = 0.0; // В радианах
    }



    increasePositionX(value) { this.position[0] += value; }

    setPositionX(x) { this.position[0] = x; }

    getPositionX() { return this.position[0]; }

    increasePositionY(value) { this.position[1] += value; }

    setPositionY(y) { this.position[1] = y; }

    getPositionY() { return this.position[1]; }

    setPosition(x, y) { this.setPositionX(x); this.setPositionY(y); }

    getPosition() { return this.position; }



    increaseWidth(value) { this.size[0] += value; }

    setWidth(width) { this.size[0] = width; }

    getWidth() { return this.size[0]; }

    increaseHeight(value) { this.size[1] += value; }

    setHeight(height) { this.size[1] = height; }

    getHeight() { return this.size[1]; }

    increaseSize(value) { this.increaseWidth(value); this.increaseHeight(value); }

    setSize(width, height) { this.setWidth(width); this.setHeight(height); }

    getSize() { return this.size; }



    increaseRotationRadians(value) { this.setRotationRadians(this.rotation + value); }

    setRotationRadians(angle) {
        this.rotation = angle;

        while (this.rotation > (2 * Math.PI)) {
            this.rotation -= (2 * Math.PI)
        }
    }
    
    getRotationRadians() { return this.rotation; }

    increaseRotationDegrees(value) { this.increaseRotationRadians(value * Math.PI / 180.0); }

    setRotationDegrees(angle) { this.setRotationRadians(angle * Math.PI / 180.0); }

    getRotationDegrees() { return this.rotation * 180.0 / Math.PI; }



    getMatrix() {
        let matrix = math.mat4.create();

        // Шаг А: Вычисление перемещения, поскольку движок в 2D, ось z всегда равно 0.0
        math.mat4.translate(
            matrix,
            matrix,
            math.vec3.fromValues(this.getPositionX(), this.getPositionY(), 0.0)
        );

        // Шаг В: Объединение с вращением
        math.mat4.rotateZ(
            matrix,
            matrix,
            this.getRotationRadians()
        );

        // Шаг C: Объединение с масштабированием
        math.mat4.scale(
            matrix,
            matrix,
            math.vec3.fromValues(this.getWidth(), this.getHeight(), 1.0)
        );

        return matrix;
    }
}



export default Transform;