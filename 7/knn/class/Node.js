class Node {
  constructor(x, y, label, id) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.id = id;
    this.distance = 99999;
  }

  // Show outline circle
  show() {
    noFill();
    stroke(COLORS[this.label]);
    circle(this.x, this.y, DIAMETER);
    noStroke();
    fill(COLORS[this.label]);
    textAlign(CENTER, CENTER);
    text(this.id, this.x, this.y);
  }

  // Show fill circle with animation
  showFill() {
    noStroke();
    fill(COLORS[this.label]);

    // Define the target diameter for animation
    const targetDiameter = HOVERDIAMETER;

    // Interpolate the current diameter towards the target diameter over time
    if (!this.currentDiameter) {
      this.currentDiameter = DIAMETER;
    }

    const animatedDiameter = lerp(this.currentDiameter, targetDiameter, 0.1);
    this.currentDiameter = animatedDiameter;

    circle(this.x, this.y, animatedDiameter);

    fill("WHITE");
    textAlign(CENTER, CENTER);
    text(this.id, this.x, this.y);
  }

  // Show connection line with neighbors
  showConnection(neighbors) {
    stroke(50);
    noFill();
    for (const neighbor of neighbors) {
      line(this.x, this.y, neighbor.x, neighbor.y);
    }
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
  }

  // Function to calculate Euclidean distance
  getDistance(node) {
    return dist(this.x, this.y, node.x, node.y);
  }

  // Function to populate non-overlapped nodes
  static populate(size) {
    const dataset = [];

    function createNodeWithLabel(label) {
      return new Node(floor(random(WIDTH)), floor(random(HEIGHT)), label, dataset.length + 1);
    }

    for (let i = 0; i < size; i++) {
      let overlapped = true;
      let limit = 0;
      
      while (overlapped && limit < MAXLIMIT) {
        const newNode = createNodeWithLabel(0);
        overlapped = dataset.some(existingNode => newNode.overlap(existingNode));
        
        if (!overlapped) {
          dataset.push(newNode);
        }
        
        limit++;
      }
    }

    // Create patterns and assign labels for different label counts
    if (noOfLabel === 2) {
      dataset.forEach(node => (node.label = dist(node.x, node.y, WIDTH / 2, HEIGHT / 2) < 150 ? 0 : 1));
    } else if (noOfLabel === 3) {
      dataset.forEach(node => (node.label = node.x < WIDTH / 2 && node.y < HEIGHT / 2 + 100 ? 0 : (node.x > WIDTH / 2 ? 1 : 2)));
    } else if (noOfLabel === 4) {
      dataset.forEach(node => {
        if (node.x < WIDTH / 2 && node.y < HEIGHT / 2) node.label = 0;
        else if (node.x > WIDTH / 2 && node.y < HEIGHT / 2) node.label = 1;
        else if (node.x > WIDTH / 2 && node.y > HEIGHT / 2) node.label = 2;
        else if (node.x < WIDTH / 2 && node.y > HEIGHT / 2) node.label = 3;
      });
    }

    return [...dataset];
  }

  // Function to check if two nodes overlap
  overlap(node) {
    return dist(this.x, this.y, node.x, node.y) < HOVERDIAMETER;
  }
}
