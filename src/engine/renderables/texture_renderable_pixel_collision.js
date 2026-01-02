"use strict";

import * as texture from "../resources/texture.js";
import TextureRenderable from "./texture_renderable_main.js";



TextureRenderable.prototype.setColorArray = function() {
    if (this.colorArray === null) {
        this.colorArray = texture.getColorArray(this.texture);
    }
}



export default TextureRenderable;