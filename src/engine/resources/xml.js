"use strict";

import * as map from "../core/resource_map.js";

let unload = map.unreference;
let has = map.has;
let get = map.get;

let parser = new DOMParser();



function decodeXML(data) { return data.text(); }

function parseXML(text) { return parser.parseFromString(text, "text/xml"); }

function load(path) { return map.loadDecodeParse(path, decodeXML, parseXML); }



export { has, get, load, unload }