"use strict";

import * as loop from "./core/loop.js";
import pride from "./pride.js";

const ABSTRACT_CLASS_ERROR = new Error("Abstract Class");
const ABSTRACT_METHOD_ERROR = new Error("Abstract Method");

class Scene {
    constructor() {
        if (this.constructor === Scene) {
            throw ABSTRACT_CLASS_ERROR;
        }
    }



    async start() {
        await loop.start(this);
    }

    next() {
        loop.stop();
        this.unload();
    }

    stop() {
        loop.stop();
        this.unload();
        pride.cleanUp();
    }



    init() {}
    load(){}
    unload(){}
    draw(){}
    update(){}
}

export default Scene;