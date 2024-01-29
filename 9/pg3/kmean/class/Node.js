class Node {
  constructor(x, y, color, label = -1) {
    this.x = x;
    this.y = y;
    this.label = label === -1 ? null : label;
    this.color = color !== undefined ? color : DEFAULTCOLOR;
  }

  // show circle
  show() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, DIAMETER);
  }

  // function to calculate euclidean distance
  getDistance(node) {
    return dist(this.x, this.y, node.x, node.y);
  }
}