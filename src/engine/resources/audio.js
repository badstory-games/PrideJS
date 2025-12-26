"use strict";

import * as map from "../core/resource_map.js";



let unload = map.unreference;
let has = map.has;

let audioContext = null;
let backgroundAudio = null;
let backgroundGain = null;
let soundGain = null;
let masterGain = null;
let defaultInitGain= 0.1;



function init() {
    try {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();

        masterGain = audioContext.createGain();
        masterGain.connect(audioContext.destination);
        masterGain.gain.value = defaultInitGain;

        backgroundGain = audioContext.createGain();
        backgroundGain.connect(masterGain);
        backgroundGain.gain.value = 1.0;

        soundGain = audioContext.createGain();
        soundGain.connect(masterGain);
        soundGain.gain.value = 1.0;
    } catch (e) {
        throw new Error("...");
    }
}

function playSound(path, volume) {
    let source = audioContext.createBufferSource();
    source.buffer = map.get(path);
    source.start(0);

    source.connect(soundGain);
    soundGain.gain.value = volume;
}

function playBackgroundMusic(path, volume) {
    if (!has(path)) return;
    
    stopBackgroundMusic();
    backgroundAudio = audioContext.createBufferSource();
    backgroundAudio.buffer = map.get(path);
    backgroundAudio.loop = true;
    backgroundAudio.start(0);

    backgroundAudio.connect(backgroundGain);
    setBackgroundMusicVolume(volume);
}

function stopBackgroundMusic() {
    if (backgroundAudio === null) return;

    backgroundAudio.stop(0);
    backgroundAudio = null;
}

function isBackgroundMusicPlaying() {
    return (backgroundAudio !== null);
}

function setBackgroundMusicVolume(volume) {
    if (backgroundGain === null) return;
    
    backgroundGain.gain.value = volume;
}

function increaseBackgroundMusicVolume(volume) {
    if (backgroundGain === null) return;
    
    backgroundGain.gain.value += volume;

    if (backgroundGain.gain.value < 0) {
        setBackgroundMusicVolume(0);
    }
}

function setMasterVolume(volume) {
    if (masterGain === null) return;

    masterGain.gain.value = volume;
}

function increaseMasterVolume(volume) {
    if (masterGain === null) return;

    masterGain.gain.value += volume;

    if (masterGain.gain.value < 0) {
        setMasterVolume(0);
    }
}

function cleanUp() {
    audioContext.close();
    audioContext = null;
}



function decodeResource(data) { return data.arrayBuffer(); }

function parseResource(data) { return audioContext.decodeAudioData(data); }

function load(path) { return map.loadDecodeParse(path, decodeResource, parseResource); }



export {
    has, load, unload,
    init,
    playSound,
    playBackgroundMusic, stopBackgroundMusic, isBackgroundMusicPlaying,
    setBackgroundMusicVolume, increaseBackgroundMusicVolume,
    setMasterVolume, increaseMasterVolume,
    cleanUp
}