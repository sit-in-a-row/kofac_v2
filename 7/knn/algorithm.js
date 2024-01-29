const SIZE = 30;
const WIDTH = window.innerWidth * 0.4; 
const HEIGHT = window.innerHeight * 0.4; 
const K = 5;

function generateRandomNode() {
  return [Math.random() * WIDTH, Math.random() * HEIGHT];
}

function generateDataset(size) {
  const dataset = {};
  for (let i = 0; i < size; i++) {
    dataset[`n${i}`] = generateRandomNode();
  }
  return dataset;
}

function assignLabels(dataset, width) {
  const labels = {};
  for (let key in dataset) {
    labels[key] = dataset[key][0] > width / 2 ? 1 : 0;
  }
  return labels;
}

function euclideanDistance(node1, node2) {
  return Math.sqrt(node1.reduce((acc, val, i) => acc + Math.pow(val - node2[i], 2), 0));
}

function classify(testNode, dataset, labels, k) {
  const distances = Object.entries(dataset)
    .map(([key, node]) => [euclideanDistance(node, testNode), key])
    .sort((a, b) => a[0] - b[0])
    .slice(0, k);

  const [label0, label1] = distances.reduce(
    (counts, [_, key]) => {
      counts[labels[key]]++;
      return counts;
    },
    [0, 0]
  );

  return label1 > label0 ? 1 : 0;
}

const dataset = generateDataset(SIZE);
const labels = assignLabels(dataset, WIDTH);
const testNode = [220, 80];

console.log(classify(testNode, dataset, labels, K));
