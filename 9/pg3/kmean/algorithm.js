const k = 3;
let data;
let x;
let y;
let centroids = [];
let centroids_old = [];
let labels = [];
let distances = [];
let errors = [];

function preload() {
  data = loadTable("iris.csv", "csv", "header");
}

function setup() {
  x = data.getColumn("SepalLengthCm");
  y = data.getColumn("SepalWidthCm");

  // # Step 1: Place K random centroids
  centroids = new Array(k);
  const min_max = [min(x), max(x), min(y), max(y)];
  for (let i = 0; i < k; i++) {
    centroids[i] = {
      x: random(min_max[0], min_max[1]),
      y: random(min_max[2], min_max[3]),
    };

    centroids_old[i] = {
      x: 0,
      y: 0,
    };
  }

  labels = new Array(data.getRowCount());
  errors = new Array(k).fill(1);

  // # Repeat Steps 2 and 3 until convergence:
  while (!errors.every((err) => err === 0)) {
    // # Step 2: Assign samples to nearest centroid
    for (let i = 0; i < data.getRowCount(); i++) {
      // calculate distance with one point and each centroids
      distances = new Array(k).fill(0);
      for (let j = 0; j < centroids.length; j++) {
        distances[j] = dist(x[i], y[i], centroids[j].x, centroids[j].y);
      }
      // assign label to nearest centroids
      labels[i] = distances.indexOf(min(distances));
    }

    // # Step 3: Update centroids
    centroids_old = [...centroids];

    for (let i = 0; i < centroids.length; i++) {
      let total_x = 0;
      let total_y = 0;
      let count = 0;
      for (let j = 0; j < labels.length; j++) {
        if (labels[j] === i) {
          total_x += +x[j];
          total_y += +y[j];
          count++;
        }
      }
      centroids[i] = {
        x: total_x / count,
        y: total_y / count,
      };
    }

    // calculate errors (old_centroids and new centroids)
    for (let i = 0; i < k; i++) {
      errors[i] = dist(
        centroids[i].x,
        centroids[i].y,
        centroids_old[i].x,
        centroids_old[i].y
      );
    }
  }

  console.log(centroids);
}
