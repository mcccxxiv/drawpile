var toolType = 'dot';
var widthSlider;
var colorInput = document.querySelector('#color');

var config = {
  apiKey: "APIKEY HERE",
  authDomain: "AUTHDOMAIN HERE",
  databaseURL: "DATABASEURL HERE",
  storageBucket: "STORAGEBUCKET HERE"
};
firebase.initializeApp(config);

var pointsData = firebase.database().ref();
var points = [];

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  background(255);
  fill(0);

  widthSlider = createSlider(1, 10, 3);
  widthSlider.position(5, 80);
  
  pointsData.on("child_removed", function () {
    points = [];
  });
  pointsData.on("child_added", function (point) {
    points.push(point.val());
  });
  canvas.mousePressed(drawPoint);
  canvas.mouseReleased(function () {
    pointsData.push({type: "release"});
  });
  canvas.mouseMoved(function () {
    if (mouseIsPressed) {
      drawPoint();
    }
  });
}

function draw() {
  background(255);
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    fill(point.color || '#000000')
    if (point.type == "dot") {
      strokeWeight(0);
      ellipse(point.x, point.y, point.width, point.width);
    } else if (i > 0 && point.type == "line" && points[i - 1].type == "line") {
      var previous = points[i - 1];
      stroke(point.color || '#000000')
      strokeWeight(point.width);
      line(point.x, point.y, previous.x, previous.y);
    }
  }
}

function keyPressed() {
  if (keyCode == "72") {
    help();
  } else if (keyCode == "68") {
    toolType = "dot";
  } else if (keyCode == "76") {
    toolType = "line";
  }
}

function drawPoint() {
  pointsData.push({type: toolType,
                   x: mouseX,
                   y: mouseY,
                   color: colorInput.value,
                   width: widthSlider.value()});
}

// clear button
$("#clear").on("click", clear);

function clear() {
  pointsData.remove();
  points = [];
}

// save button
$("#save").on("click", save);

function save() {
  saveCanvas(window.prompt("Save as:", "Drawpile"));
}
