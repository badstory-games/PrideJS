"use strict";

import pride from "../pride.js";


function getElement(xmlContent, tagElement) {
    let element = xmlContent.getElementsByTagName(tagElement);

    if (element.lenght === 0) {
        console.error("ОШИБКА: Элемент сцены [" + tagElement + "] не найден!");
    }

    return element;
}


class SceneFileParser {
    constructor(xml) {
        this.xml = xml;
    }



    parseCamera() {
        let cameraElement = getElement(this.xml, "Camera");

        let centerX = Number(cameraElement[0].getAttribute("CenterX"));
        let centerY = Number(cameraElement[0].getAttribute("CenterY"));
        let width = Number(cameraElement[0].getAttribute("Width"));
        let viewport = cameraElement[0].getAttribute("Viewport").split(" ");
        let backgroundColor = cameraElement[0].getAttribute("BackgroundColor").split(" ");

        let j;
        for (j = 0; j < 4; j++) {
            backgroundColor[j] = Number(backgroundColor[j]);
            viewport[j] = Number(viewport[j]);
        }

        let camera = new pride.Camera(
            pride.math.vec2.fromValues(centerX, centerY),
            width,
            viewport
        );
        camera.setBackgroundColor(backgroundColor);

        return camera;
    }

    parseSquares() {
        let squareSet = [];
        let element = getElement(this.xml, "Square");

        let i, j, x, y, width, height, rotation, color, square;
        i = 0;
        for (i = 0; i < element.length; i++) {
            x = Number(element.item(i).attributes.getNamedItem("PositionX").value);
            y = Number(element.item(i).attributes.getNamedItem("PositionY").value);
            width = Number(element.item(i).attributes.getNamedItem("Width").value);
            height = Number(element.item(i).attributes.getNamedItem("Height").value);
            rotation = Number(element.item(i).attributes.getNamedItem("Rotation").value);
            color = element.item(i).attributes.getNamedItem("Color").value.split(" ");
            
            square = new pride.Renderable();

            for(j = 0; j < 4; j++) {
                color[j] = Number(color[j]);
            }
            
            square.setColor(color);
            square.getTransform().setPosition(x, y);
            square.getTransform().setRotationDegrees(rotation);
            square.getTransform().setSize(width, height);
            squareSet.push(square);
        }

        return squareSet;
    }
}

export default SceneFileParser;