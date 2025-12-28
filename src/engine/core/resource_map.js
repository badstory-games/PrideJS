"use strict";

class MapEntry {
    constructor(data) {
        this.data = data;
        this.refCount = 1;
    }

    reference() { this.refCount++; }

    unreference() { this.refCount--; }

    set(data) { this.data = data; }

    getData() { return this.data; }

    canRemove() { return (this.refCount == 0); }
}



let map = new Map();
let outstandingPromises = [];



function has(path) { return map.has(path); }

function get(path) {
    if (!has(path)) {
        throw new Error("Ошибка, файл [" + path + "] не загружен!");
    }

    return map.get(path).getData();
}

function set(key, value) { map.get(key).set(value); }

function loadRequested(path) { map.set(path, new MapEntry(null)); }

function reference(path) { map.get(path).reference(); }

function unreference(path) {
    let entry = map.get(path);
    entry.unreference();
    
    if (entry.canRemove()) {
        map.delete(path);
    }

    return entry.canRemove();
}

function pushPromise(promise) { outstandingPromises.push(promise); }

function loadDecodeParse(path, decodeResource, parseResource) {
    let fetchPromise = null;
    if (!has(path)) {
        loadRequested(path);
        fetchPromise = fetch(path)
            .then(res => decodeResource(res))
            .then(data => parseResource(data))
            .then(data => { return set(path, data) })
            .catch(err => { throw err });
        pushPromise(fetchPromise);
    } else {
        reference(path);
    }

    return fetchPromise;
}

async function waitOnPromises() {
    await Promise.all(outstandingPromises);
    outstandingPromises = [];
}



export {
    has, get, set,
    loadRequested, reference, unreference,
    loadDecodeParse, pushPromise, waitOnPromises
}