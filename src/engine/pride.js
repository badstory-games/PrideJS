import * as glContext from "./core/gl_context.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaders from "./core/shaders.js";

import Camera from "./camera.js";
import Transform from "./transform.js";
import Renderable from "./renderable.js";



function init(canvasID) {
    glContext.init(canvasID);
    vertexBuffer.init();
    shaders.init();
}

function clearCanvas(color) {
    let gl = glContext.get();
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
}



export default {
    // Классы
    Camera, Transform, Renderable,

    // Функции
    init, clearCanvas
}