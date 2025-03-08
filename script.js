var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gl = canvas.getContext('webgl');
if (!gl) {
  console.error("Unable to initialize WebGL.");
}

var time = 0.0;

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform1f(widthHandle, window.innerWidth);
  gl.uniform1f(heightHandle, window.innerHeight);
}

function compileShader(shaderSource, shaderType) {
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }
  return shader;
}

function getAttribLocation(program, name) {
  var attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
    throw 'Cannot find attribute ' + name + '.';
  }
  return attributeLocation;
}

function getUniformLocation(program, name) {
  var attributeLocation = gl.getUniformLocation(program, name);
  if (attributeLocation === -1) {
    throw 'Cannot find uniform ' + name + '.';
  }
  return attributeLocation;
}

var lastFrame = Date.now();
var thisFrame;

function draw() {
  thisFrame = Date.now();
  time += (thisFrame - lastFrame) / 1000;
  lastFrame = thisFrame;

  gl.uniform1f(timeHandle, time);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(draw);
}

draw();
// Seleccionar el mensaje
var mensaje = document.getElementById("mensaje");

// Función para mostrar el mensaje en sincronización con la animación del corazón
function mostrarMensaje() {
  mensaje.style.opacity = "1"; // Mostrar mensaje
}

// Función para ocultar el mensaje al final de la animación
function ocultarMensaje() {
  mensaje.style.opacity = "0"; // Ocultar mensaje
}

// Repetir la animación al mismo tiempo que el corazón (cada 4 segundos)
setInterval(function () {
  mostrarMensaje();
  setTimeout(ocultarMensaje, 3000); // Se oculta antes del nuevo ciclo
}, 4000);
