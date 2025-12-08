import * as input from "../input.js";
import * as map from "./resource_map.js";

"use strict";

const FPS = 60;
const MPF = 1000 / FPS;

let prevTime;
let lagTime;
let loopRunning = false;
let currentScene = null;
let frameID = -1;



function loopOnce() {
    if (loopRunning) {
        frameID = requestAnimationFrame(loopOnce);

        currentScene.draw();

        let currentTime = performance.now();
        let elapsedTime = currentTime - prevTime;

        prevTime = currentTime;
        lagTime += elapsedTime;

        while ((lagTime >= MPF) && loopRunning) {
            input.update();
            currentScene.update();
            lagTime -= MPF;
        }
    }
}

async function start(scene) {
    if (loopRunning) {
        throw new Error("Цикл уже запущен!");
    }

    await map.waitOnPromises();

    currentScene = scene;
    currentScene.init();

    prevTime = performance.now();
    lagTime = 0.0;
    loopRunning = true;
    frameID = requestAnimationFrame(loopOnce);
}

function stop() {
    loopRunning = false;
    cancelAnimationFrame(frameID);
}



export { start, stop }