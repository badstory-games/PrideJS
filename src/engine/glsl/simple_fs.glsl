// Точность для вычисления чисел с плавающей точкой
precision mediump float;

// Цвет пикселя
uniform vec4 uPixelColor;

void main(void) {
    // Для каждого вызываемого пикселя устанавливается указанный пользователем цвет
    gl_FragColor = uPixelColor;
}