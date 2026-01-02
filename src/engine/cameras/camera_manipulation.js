"use strict";

import Camera from "./camera_main.js";
import { BoundCollideStatus } from "../bounding_box.js";



Camera.prototype.panWith = function(transform, zone) {
    let status = this.getCollideBounds(transform, zone);
    if (status !== BoundCollideStatus.INSIDE) {
        let pos = transform.getPosition();
        let newC = this.getCenter();
        if ((status & BoundCollideStatus.COLLIDE_TOP) !== 0) {
            newC[1] = pos[1] + (transform.getHeight() / 2) - (zone * this.getHeight() / 2);
        }
        if ((status & BoundCollideStatus.COLLIDE_BOTTOM) !== 0) {
            newC[1] = pos[1] - (transform.getHeight() / 2) + (zone * this.getHeight() / 2);
        }
        if ((status & BoundCollideStatus.COLLIDE_RIGHT) !== 0) {
            newC[0] = pos[0] + (transform.getWidth() / 2) - (zone * this.getWidth() / 2);
        }
        if ((status & BoundCollideStatus.COLLIDE_LEFT) !== 0) {
            newC[0] = pos[0] - (transform.getWidth() / 2) + (zone * this.getWidth() / 2);
        }
    }
}



export default Camera;