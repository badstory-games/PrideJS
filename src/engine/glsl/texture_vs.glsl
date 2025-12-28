attribute vec3 aVertexPosition;
attribute vec2 aTextureCoordinates;

varying vec2 vTextureCoordinates;

uniform mat4 uModelTransform;
uniform mat4 uCameraTransform;

void main(void) {
    gl_Position = uCameraTransform * uModelTransform * vec4(aVertexPosition, 1.0);

    vTextureCoordinates = aTextureCoordinates;
}