"use strict";



class GameObjectGroup {
    constructor() {
        this.group = [];
    }

    getSize() { return this.group.length; }

    isEmpty() { return !this.group.length; }

    getObjectByID(id) {
        return this.group[id];
    }

    addGameObject(gameObject) {
        this.group.push(gameObject);
    }

    removeGameObject(gameObject) {
        let index = this.group.indexOf(gameObject);
        if (index > -1)
            this.group.splice(index, 1);
    }
    
    update() {
        let i;
        for (i = 0; i < this.group.length; i++) {
            this.group[i].update();
        }
    }

    draw(camera) {
        let i;
        for (i = 0; i < this.group.length; i++) {
            this.group[i].draw(camera);
        }
    }
}

export default GameObjectGroup;