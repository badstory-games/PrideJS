"use strict";


class GameObject {
    constructor(renderable) {
        this.renderable = renderable;
    }


    
    getTransform() { return this.renderable.getTransform(); }
    
    getRenderable() { return this.renderable; }

    update() {  }   

    draw(camera) {
        this.renderable.draw(camera);
    }
}

export default GameObject;