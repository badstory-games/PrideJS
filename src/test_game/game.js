import pride from "../engine/pride.js";
import * as loop from "../engine/core/loop.js";



class Game {
    constructor() {
        this.sceneFile = "assets/scene.xml";
        this.squareSet = [];

        this.camera = null;
    }



    load() {
        pride.xml.load(this.sceneFile);
    }

    unload() {
        pride.xml.unload(this.sceneFile);
    }

    init() {
        let sceneParser = new pride.SceneFileParser(pride.xml.get(this.sceneFile));
        
        this.camera = sceneParser.parseCamera();
        this.squareSet = sceneParser.parseSquares();
    }

    draw() {
        pride.clearCanvas([0.9, 0.9, 0.9, 1]);
        this.camera.adjustProjection();
        
        let i;
        for(i = 0; i < this.squareSet.length; i++) {
            this.squareSet[i].draw(this.camera);
        }
    }

    update() {
        let whiteTransform = this.squareSet[0].getTransform();
        let delta = 0.1;
        
        if (pride.input.isKeyPressed(pride.input.keys.D)) {
            whiteTransform.increasePositionX(delta);
        }
        else if (pride.input.isKeyPressed(pride.input.keys.A)) {
            whiteTransform.increasePositionX(-delta);
        }
        if (pride.input.isKeyPressed(pride.input.keys.W)) {
            whiteTransform.increasePositionY(delta);
        }
        else if (pride.input.isKeyPressed(pride.input.keys.S)) {
            whiteTransform.increasePositionY(-delta);
        }

        let redTransform = this.squareSet[1].getTransform();
        if (redTransform.getWidth() > 5) {
            redTransform.setSize(2, 2);
        }
        redTransform.increaseSize(0.05);
    }
}



window.onload = function() {
    pride.init("pride-canvas");
    let game = new Game();
    loop.start(game)
}