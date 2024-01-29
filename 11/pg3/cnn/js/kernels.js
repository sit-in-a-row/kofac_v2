// kernels.js


var kernels = [{
            "name": "필터 적용 없음",
            "kernel": [
                  [0, 0, 0],
                  [0, 1, 0],
                  [0, 0, 0]
            ]
      },
      {
            "name": "선명하게",
            "kernel": [
                  [0, -1, 0],
                  [-1, 5, -1],
                  [0, -1, 0]
            ]
      },
      {
            "name": "흐리게",
            "factor": 1 / 9,
            "kernel": [
                  [1, 1, 1],
                  [1, 1, 1],
                  [1, 1, 1]
            ]
      },
      {
            "name": "흐리게 (Gaussian, 3x3)",
            "factor": 1 / 16,
            "kernel": [
                  [1, 2, 1],
                  [2, 4, 2],
                  [1, 2, 1]
            ]
      },
      {
            "name": "흐리게 (Gaussian, 5x5)",
            "factor": 1 / 256,
            "kernel": [
                  [1, 4, 6, 4, 1],
                  [4, 16, 24, 16, 4],
                  [6, 24, 36, 24, 6],
                  [4, 16, 24, 16, 4],
                  [1, 4, 6, 4, 1]
            ]
      },
      {
            "name": "언샵 마스킹 (Unsharp Mask)",
            "factor": -1 / 256,
            "kernel": [
                  [1, 4, 6, 4, 1],
                  [4, 16, 24, 16, 4],
                  [6, 24, -476, 24, 6],
                  [4, 16, 24, 16, 4],
                  [1, 4, 6, 4, 1]
            ]
      },
      {
            "name": "커스텀 필터",
            "kernel": [
                  [0, 0, 0],
                  [0, 1, 0],
                  [0, 0, 0]
            ]
      }
];

const find_anchor = function(kernel) {
      var anchor = {
            "x": Math.floor(kernel.kernel[Math.floor(kernel.kernel.length / 2)].length / 2),
            "y": Math.floor(kernel.kernel.length / 2)
      };
      console.log("Anchor of " + kernel.name + " filter kernel calculated: (" + anchor.x + ", " + anchor.y + ")", anchor);
      return anchor;
}

// Prepare filter kernels for use in image convolution operations; fill in missing properties
kernels.forEach(
      (kernel) => {
            // If kernel factor does not exist, set it to 1
            if (!kernel.factor) {
                  kernel.factor = 1;
            }

            // If kernel anchor coordinates are not listed, calculate them
            if (!kernel.anchor) {
                  kernel.anchor = find_anchor(kernel);
            }
      }
);

console.log("kernels.js loaded");