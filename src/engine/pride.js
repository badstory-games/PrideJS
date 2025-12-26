import * as math from "../lib/gl-matrix/index.js";

import * as glContext from "./core/gl_context.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaders from "./core/shaders.js";
import * as input from "./input.js";
import * as text from "./resources/text.js";
import * as xml from "./resources/xml.js";
import * as loop from "./core/loop.js";
import * as audio from "./resources/audio.js";

import Camera from "./camera.js";
import Transform from "./transform.js";
import Renderable from "./renderable.js";
import SceneFileParser from "./utils/scene_file_parser.js";
import Scene from "./scene.js";



function init(canvasID) {
    glContext.init(canvasID);
    vertexBuffer.init();
    shaders.init();
    input.init();
    audio.init();
}

function cleanUp() {
    loop.cleanUp();
    input.cleanUp();
    shaders.cleanUp();
    vertexBuffer.cleanUp();
    glContext.cleanUp();
    audio.cleanUp();
}

function clearCanvas(color) {
    let gl = glContext.get();
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
}



export default {
    math, input, text, xml, audio,
    
    // Классы
    Camera, Transform, Renderable, SceneFileParser, Scene,

    // Функции
    init, cleanUp, clearCanvas
}