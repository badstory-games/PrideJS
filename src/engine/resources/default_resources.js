"use strict";

import * as font from "./font.js";
import * as map from "../core/resource_map.js";

let defaultFont = "src/engine/assets/fonts/system_default_font";



function cleanUp() {
    font.unload(defaultFont);
}

function init() {
    let loadPromise = new Promise(
        async function (resolve) {
            await Promise.all([
                font.load(defaultFont)
            ]);
            resolve();
        }
    ).then(
        function resolve() { /* ничего не нужно делать для шрифта */ }
    );
    map.pushPromise(loadPromise);
}

function getDefaultFontName() { return defaultFont; }



export {
    init, cleanUp,

    getDefaultFontName
}