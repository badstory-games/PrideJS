"use strict";

const keys = {
    // Стрелки
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,

    // Пробел
    Space: 32,

    // Цифры
    Zero: 48,
    One: 49,
    Two: 50,
    Three: 51,
    Four: 52,
    Five : 53,
    Six : 54,
    Seven : 55,
    Eight : 56,
    Nine : 57,

    // Буквы
    A : 65,
    B : 66,
    C : 67,
    D : 68,
    E : 69,
    F : 70,
    G : 71,
    H : 72,
    I : 73,
    J : 74,
    K : 75,
    L : 76,
    M : 77,
    N : 78,
    O : 79,
    P : 80,
    Q : 81,
    R : 82,
    S : 83,
    T : 84,
    U : 85,
    V : 86,
    W : 87,
    X : 88,
    Y : 89,
    Z : 90,
    LastKeyCode: 222
};

let keyPreviousState = [];
let keysPressed = [];
let keysJustPressed = [];



function onKeyDown(event) { keysPressed[event.keyCode] = true; }

function onKeyUp(event) { keysPressed[event.keyCode] = false; }

function init() {
    let i;

    for (i = 0; i < keys.LastKeyCode; i++) {
        keyPreviousState[i] = false;
        keysPressed[i] = false;
        keysJustPressed[i] = false;
    }

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
}

function update() {
    let i;

    for (i = 0; i < keys.LastKeyCode; i++) {
        keysJustPressed[i] = (!keyPreviousState[i]) && keysPressed[i];
        keyPreviousState[i] = keysPressed[i];
    }
}

function isKeyPressed(keyCode) { return keysPressed[keyCode] }

function isKeyJustPressed(keyCode) { return keysJustPressed[keyCode] }



export {
    keys, init, update,
    isKeyPressed, isKeyJustPressed
}