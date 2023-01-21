var config = {
  apiKey: "APIKEY HERE",
  authDomain: "AUTHDOMAIN HERE",
  databaseURL: "DATABASEURL HERE",
  storageBucket: "STORAGE BUCKET HERE",
};

firebase.initializeApp(config);

var pointsData = firebase.database().ref();
var points = [];

window.onload = function () {

  // definitions
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var boundings = canvas.getBoundingClientRect();
  var range = document.getElementById("brush").value;

  // specifications
  var mouseX = 0;
  var mouseY = 0;
  var isDrawing = false;
  context.strokeStyle = 'black'; // initial color

  // brush size
  var brush = document.getElementById('brush');

  brush.addEventListener('input', function(brush){
    context.lineWidth = brush.target.value;
  });

  // Handle Colors
  var colors = document.getElementsByClassName('colors')[0];

  colors.addEventListener('click', function(event) {
    context.strokeStyle = event.target.value || 'black';
  });

  // mouse down Event
  canvas.addEventListener('mousedown', function(event) {
    setMouseCoordinates(event);
    isDrawing = true;

    // start drawing
    context.beginPath();
    context.moveTo(mouseX, mouseY);
  });

  // mouse move event
  canvas.addEventListener('mousemove', function(event) {
    setMouseCoordinates(event);

    if(isDrawing){
      context.lineTo(mouseX, mouseY);
      context.stroke();
    }
  });

  // mouse up event
  canvas.addEventListener('mouseup', function(event) {
    setMouseCoordinates(event);
    isDrawing = false;
  });

  // mouse coordinates
  function setMouseCoordinates(event) {
    mouseX = event.clientX - boundings.left;
    mouseY = event.clientY - boundings.top;
  }

  // clear button
  var clearButton = document.getElementById('clear');

  clearButton.addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  });

  // save button
  var saveButton = document.getElementById('save');

  saveButton.addEventListener('click', function() {
    var imageName = prompt('Save as:');
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'drawing';
    a.click();
  });
  
};

