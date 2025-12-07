// Поскольку предполагается одно соглашение об именовании позиций вершин,
// атрибуты всегда начинаются с "a".
attribute vec3 aVertexPosition;

void main(void) {
    // Преобразование vec3 в vec4 и назначение gl_Position для передачи вершин во фрагментный шейдер
    gl_Position = vec4(aVertexPosition, 1.0);
}