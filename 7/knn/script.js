const WIDTH = window.innerWidth * 0.45; 
const HEIGHT = WIDTH;
// const HEIGHT = window.innerHeight * 0.4; 
const DIAMETER = 30;
const HOVERDIAMETER = 50;
const MAXLIMIT = 100000;
const COLORS = ["GREEN", "BLUE", "RED", "ORANGE"];

let dataset = [];
let targetNode;
let noOfDataPointInput, noOfLabelInput, noOfKInput, randomButton;
let noOfDataPoint, noOfLabel, noOfK;

function reset() {
  // get values from user input
  noOfDataPoint = noOfDataPointInput.value();
  noOfLabel = noOfLabelInput.value();
  noOfK = noOfKInput.value();

  select("#noOfLabel").html(noOfLabel);
  select("#noOfK").html(noOfK);
  select("#noOfDataPoint").html(noOfDataPoint);

  // populate dataset
  dataset = Node.populate(noOfDataPoint);

  // assign initially as class 0
  targetNode = new Node(0, 0, 0, 0);
}

function setup() {
  // create p5 canvas
  const canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("canvas_container");

  // select input elements
  noOfDataPointInput = select("#noOfDataPointInput");
  noOfLabelInput = select("#noOfLabelInput");
  noOfKInput = select("#noOfKInput");
  randomButton = select("#randomButton");

  reset();

  // event handling
  [noOfDataPointInput, noOfLabelInput, noOfKInput].forEach(input => input.changed(reset));
  randomButton.mousePressed(reset);
}

function draw() {
  background('#FFF');

  // calculate all the distances between neighbors and targetNode
  dataset.forEach(node => node.distance = node.getDistance(targetNode));

  // sort all the distances between neighbors and targetNode
  dataset.sort((a, b) => a.distance - b.distance);

  // take only the k closest points
  const neighbors = dataset.slice(0, noOfK);

  const labelCounts = new Array(noOfLabel).fill(0);

  // the targetNode is the location of mouse
  targetNode.setXY(mouseX, mouseY);
  // show connection lines
  targetNode.showConnection(neighbors);
  // show target node
  targetNode.showFill();

  // show all points
  dataset.forEach(node => node.show());

  // calculate no of each labels around k neighbors
  neighbors.forEach(neighbor => {
    // show neighbors
    neighbor.showFill();
    // count total number of each label
    labelCounts[neighbor.label]++;
  });

  // get all nearestPoints id
  const nearestPoints = neighbors.map(elt => elt.id);
  select("#noOfNearestPoints").html(noOfK);
  select("#nearestPoints").html(nearestPoints);

  // assign the label with maximum count
  targetNode.label = labelCounts.indexOf(max(labelCounts));

  // show the classified label color
  select("#classifiedLabelColor").style("background-color", COLORS[targetNode.label]);
}
