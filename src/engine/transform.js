class Transform {
    constructor() {
        this.position = glMatrix.vec2.fromValues(0, 0);
        this.size = glMatrix.vec2.fromValues(1, 1);
        this.rotation = 0.0; // В радианах
    }



    increasePositionX(value) { this.position.x += value; }

    setPositionX(x) { this.position.x = x; }

    getPositionX() { return this.position.x; }

    increasePositionY(value) { this.position.y += value; }

    setPositionY(y) { this.position.y = y; }

    getPositionY() { return this.position.y; }

    setPosition(x, y) { this.setPositionX(x); this.setPositionY(y); }

    getPosition() { return this.position; }



    increaseWidth(value) { this.size.x += value; }

    setWidth(width) { this.size.x = width; }

    getWidth() { return this.size.x; }

    increaseHeight(value) { this.size.y += value; }

    setHeight(height) { this.size.y = height; }

    getHeight() { return this.size.y; }

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
        let matrix = glMatrix.mat4.create();

        // Шаг А: Вычисление перемещения, поскольку движок в 2D, ось z всегда равно 0.0
        glMatrix.mat4.translate(
            matrix,
            matrix,
            glMatrix.vec3.fromValues(this.getPositionX(), this.getPositionY(), 0.0)
        );

        // Шаг В: Объединение с вращением
        glMatrix.mat4.rotateZ(
            matrix,
            matrix,
            this.getRotationRadians()
        );

        // Шаг C: Объединение с масштабированием
        glMatrix.mat4.scale(
            matrix,
            matrix,
            glMatrix.vec3.fromValues(this.getWidth(), this.getHeight(), 1.0)
        );

        return matrix;
    }
}



export default Transform;