import * as glContext from "./core/gl_context.js";
import * as vertexBuffer from "./core/vertex_buffer.js";



class SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        this.compiledShader = null;
        this.vertexPositionLocation = null;
        this.pixelColorLocation = null;

        let gl = glContext.get();
        
        // Шаг А: Загрузка и компиляция вершинного и фрагментного шейдера
        this.vertexShader = loadAndCompileShader(vertexShaderPath, gl.VERTEX_SHADER);
        this.fragmentShader = loadAndCompileShader(fragmentShaderPath, gl.FRAGMENT_SHADER)
        
        // Шаг B: Создание шейдеров и объединение их в программу.
        this.compiledShader = gl.createProgram();
        gl.attachShader(this.compiledShader, this.vertexShader);
        gl.attachShader(this.compiledShader, this.fragmentShader);
        gl.linkProgram(this.compiledShader);
        
        // Шаг С: Проверка на ошибки
        if (!gl.getProgramParameter(this.compiledShader, gl.LINK_STATUS)) {
            throw new Error("Ошибка объединения шейдера");
        }
        
        // Шаг D: Получение ссылки на атрибут aVertexPosition в шейдере
        this.vertexPositionLocation = gl.getAttribLocation(this.compiledShader, "aVertexPosition");

        // Шаг E: Получение ссылки на uPixelColor во фрагментном шейдере
        this.pixelColorLocation = gl.getUniformLocation(this.compiledShader, "uPixelColor");
    }

    activate(pixelColor) {
        // Шаг А: Доступ к WebGL контексту
        let gl = glContext.get();
    
        // Шаг B: Определение скомпилированного шейдера для использования
        gl.useProgram(this.compiledShader);
    
        // Шаг C: Привязка вершинного буфера к атрибуту, определенному в вершинном шейдере
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(
            this.vertexPositionLocation,
            3,  // Каждый элемент имеет 3-float (x, y, z)
            gl.FLOAT, // Тип данных - FLOAT
            false, // Является ли содержимое нормализованными векторами
            0, // Количество байт, которые нужно пропускать между элементами
            0 // Смещение, относительно первого элемента
        );
        gl.enableVertexAttribArray(this.vertexPositionLocation);

        // Загрузка цвета во фрагментный шейдер
        gl.uniform4fv(this.pixelColorLocation, pixelColor);
    }
}

function loadAndCompileShader(filePath, type) {
    let xmlRequest;
    let shaderSource = null;
    let shader = null;
    let gl = glContext.get();

    // Шаг A: Запрос текста из указанного расположения файла
    xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", filePath, false);
    try {
        xmlRequest.send();
    } catch (error) {
        throw new Error("Ошибка загрузки шейдера: "
            + filePath
            + " [Подсказка: Вы не можете просто запустить проект в браузере. "
            + "Проект должен находиться на сервере или запускаться с локального web-сервера.]"
        );
    }
    
    shaderSource = xmlRequest.responseText;

    if (shaderSource === null) {
        throw new Error("Ошибка загрузки файла: " + filePath);
    }

    // Шаг B: Создание шейдера в зависимости от типа: вершинный или фрагментный
    shader = gl.createShader(type);

    // Шаг C: Компиляция созданного шейдера
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    // Шаг D: Проверка на наличие ошибок и возвращение результата (null в случае ошибки)
    // InfoLog отображает ошибки компиляции.
    // Это полезно для отладки шейдеров.
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error("Произошла ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
    }

    return shader;
}



export default SimpleShader;