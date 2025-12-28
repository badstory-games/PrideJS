"use strict";

import * as math from "./math/math.js";

import * as glContext from "./core/gl_context.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaders from "./core/shaders.js";
import * as input from "./input.js";
import * as text from "./resources/text.js";
import * as xml from "./resources/xml.js";
import * as loop from "./core/loop.js";
import * as audio from "./resources/audio.js";
import * as texture from "./resources/texture.js";

import Camera from "./camera.js";
import Transform from "./transform.js";
import Renderable from "./renderables/renderable.js";
import TextureRenderable from "./renderables/texture_renderable.js";
import SpriteRenderable from "./renderables/sprite_renderable.js";
import { TextureCoordinatesArrayIndex } from "./renderables/sprite_renderable.js";
import AnimatedSpriteRenderable from "./renderables/animated_sprite_renderable.js";
import { AnimationType } from "./renderables/animated_sprite_renderable.js";
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
    audio.cleanUp();

    glContext.cleanUp();    
}

function clearCanvas(color) {
    let gl = glContext.get();
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
}



export default {
    math, input, text, xml, audio, texture,
    
    // Классы
    Camera, Transform, Renderable, TextureRenderable, SpriteRenderable, AnimatedSpriteRenderable,
    SceneFileParser, Scene,

    TextureCoordinatesArrayIndex, AnimationType,

    // Функции
    init, cleanUp, clearCanvas
}