const WIDTH = window.innerWidth * 0.5; 
const HEIGHT = window.innerHeight * 0.9; 
const DIAMETER = 20;
const DEFAULTCOLOR = [0, 0, 0, 70];
const DEFAULT_DELAY = 3000;

let dataset = [];
let noOfKInput, startButton, resetButton, stepButton;
let k;
let colors = ["#FF00FF", "#40E0D0", "#DFFF00", "#6495ED", "#DE3163"];
let centroids = [];
let centroids_old = [];
let errors = [];
let minx, maxx, miny, maxy;
let found;
let randomPointsRange, randomButton;
let randomPoints = 10; // 기본 랜덤포인트 개수
let isStart = false;

function reset() {
  background(255);
  // reset all variables
  found = false;
  k = 0;
  dataset = [];
  minx = 99999;
  maxx = 0;
  miny = 99999;
  maxy = 0;
  dataset = [];
  centroidCheckbox;
  noOfKInput, startButton, resetButton;
  k;
  colors = ["#FF00FF", "#40E0D0", "#DFFF00", "#6495ED", "#DE3163"];
  centroids = [];
  centroids_old = [];
  errors = [];
  minx, maxx, miny, maxy;
  found;
  randomPointsRange, randomButton;
  randomPoints = 10; // 기본 랜덤포인트 개수
  isStart = false;

  noLoop();
}

function setup() {
  // create p5 canvas
  const canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("canvas_container");

  // select input elements
  centroidCheckbox = select('#centroid-pointer');
  noOfKInput = select("#noOfKInput");
  startButton = select("#startButton");
  resetButton = select("#resetButton");
  stepButton = select("#stepButton");
  randomPointsRange = select("#randomPointsRange");
  randomButton = select("#randomButton");

  // show default k value
  select("#noOfK").html(noOfKInput.value());

  reset();

  // event handling
  canvas.mousePressed(addNewNode);
  resetButton.mousePressed(reset);
  startButton.mousePressed(start);
  stepButton.mousePressed(step);
  noOfKInput.changed(() => select("#noOfK").html(noOfKInput.value()));
  randomButton.mousePressed(addRandomPoints);
  randomPointsRange.changed(() => {
    randomPoints = randomPointsRange.value();
    select("#randomPointsValue").html(randomPoints);
  });

  noLoop();
}

function addRandomPoints() {  
  reset();
  dataset = [];
  minx = 99999;
  maxx = 0;
  miny = 99999;
  maxy = 0;
  
  // Update randomPoints variable
  randomPoints = randomPointsRange.value();

  for (let i = 0; i < randomPoints; i++) {
    let x = Math.floor(random(WIDTH)) + 0.5;
    let y = Math.floor(random(HEIGHT)) + 0.5;
    let newNode = new Node(x, y, DEFAULTCOLOR);
    // Node 객체를 복사하여 dataset 배열에 추가
    let newNodeCopy = new Node(newNode.x, newNode.y, newNode.color);
    dataset.push(newNodeCopy);

    // 센트로이드 초기 위치 설정
    if (x < minx) minx = x;
    if (x > maxx) maxx = x;
    if (y < miny) miny = y;
    if (y > maxy) maxy = y;
  }

  redraw(); // redraw 함수를 호출하여 화면을 다시 그립니다.
}

function drawStar(x, y, radius1, radius2, npoints) {
  radius1 = radius1*2;
  radius2 = radius2*2;
	
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

let frameInterval = 1; // 업데이트 간격을 10 프레임으로 설정
let frameCounter = 0; // 프레임 카운터 초기화

// 한번 그리기
function runDraw() {
  background(255);
  frameCounter++; // 프레임 카운터 증가

  // 데이터셋의 각 노드를 그리기
  for (const node of dataset) {
    if (node.label === -1) {
      node.label = null;
    }
    if (node.color === undefined) {
      node.color = DEFAULTCOLOR;
    }
    node.show();
  }  

  // 센트로이드 별 그리기
  fill(0, 0, 0);
  for (let i = 0; i < centroids.length; i++) {
    drawStar(centroids[i].x, centroids[i].y, DIAMETER / 4, DIAMETER / 8, 5);
  }

  // for (let i = 0; i < k; i++) {
  //   if (centroids_old[i]) {
  //     line(centroids_old[i].x, centroids_old[i].y, centroids[i].x, centroids[i].y);
  //   }
  // }

  // 일정 프레임 간격으로 업데이트
  if (frameCounter % frameInterval === 0) {
    recalculateCentroids();
  }

  // if there is no errors between old centroids and new centroids, then stop
  if (errors.length > 0 && errors.every((err) => err === 0)) {
    console.log('found', centroids);
    found = true;
    noLoop();
    return;
  }

  // assign samples to nearest centroid
  for (let i = 0; i < dataset.length; i++) {
    // calculate distance with one point and each centroids
    let distances = new Array(k).fill(0);
    for (let j = 0; j < k; j++) {
      distances[j] = dataset[i].getDistance(centroids[j]);
    }
    // assign label to nearest centroids
    let label = distances.indexOf(min(distances));

    dataset[i].label = label;

    // update nodes color based on their current clusters
    dataset[i].color = colors[label];
  }

  // copy old centroids
  centroids_old = [...centroids];

  // calculate the average position of each clusters
  for (let i = 0; i < k; i++) {
    let total_x = 0;
    let total_y = 0;
    let count = 0;
    for (let j = 0; j < dataset.length; j++) {
      if (dataset[j].label === i) {
        total_x += dataset[j].x;
        total_y += dataset[j].y;
        count++;
      }
    }
    // update centroids
    // if (count === 0) count++;
    if (count === 0) {
      centroids[i] = {
        x: random(minx, maxx),
        y: random(miny, maxy),
      };
    } else {
      centroids[i] = {
        x: total_x / count,
        y: total_y / count,
      };
    }
  }

  // calculate errors (old_centroids vs new centroids)
  for (let i = 0; i < k; i++) {
    errors[i] = dist(
      centroids[i].x,
      centroids[i].y,
      centroids_old[i].x,
      centroids_old[i].y
    );
  }

  strokeWeight(1);
  for (let i = 0; i < dataset.length; i++) {
	  if (!centroids[dataset[i].label]) {
		  continue;
	  }
	  stroke(dataset[i].color);
	  line(dataset[i].x, dataset[i].y, centroids[dataset[i].label].x, centroids[dataset[i].label].y);
  }
}

function draw() {
  runDraw();
}

function drawPoints() {
	background(255);
	
	// 데이터셋의 각 노드를 그리기
	for (const node of dataset) {
		if (node.label === -1) {
			node.label = null;
		}
		if (node.color === undefined) {
			node.color = DEFAULTCOLOR;
		}
		node.show();
	}

	// 센트로이드 별 그리기
	fill(0, 0, 0);
	for (let i = 0; i < centroids.length; i++) {
		drawStar(centroids[i].x, centroids[i].y, DIAMETER / 4, DIAMETER / 8, 5);
	}

	for (let i = 0; i < k; i++) {
		if (centroids_old[i]) {
			line(centroids_old[i].x, centroids_old[i].y, centroids[i].x, centroids[i].y);
		}
	}
}

function addNewNode() {
  if (!centroidCheckbox.checked()) {
	  let newNode = new Node(mouseX, mouseY, DEFAULTCOLOR);
	  newNode.show();
	  if (newNode.x < minx) minx = newNode.x;
	  if (newNode.x > maxx) maxx = newNode.x;
	  if (newNode.y < miny) miny = newNode.y;
	  if (newNode.y > maxy) maxy = newNode.y;
	  dataset.push(newNode);
	  
	  // 새로운 노드가 추가될 때마다 클러스터링을 다시 실행
	  if (found) {
		recalculateCentroids(); // 새로운 함수 호출
		loop();
	  }
  } else {
	if (found) {
		alert("이미 센트로이드를 찾았습니다! '포인트 삭제' 버튼을 누르시거나, 센트로이드 초기값을 풀고 점을 추가해주세요.");
		return;
	}
	  
	k = noOfKInput.value();
	  
	if (dataset.length < 3) {
		alert("센트로이드 추가하기 전에 최소 " + k + "개의 점을 찍어야 합니다. 화면 오른쪽을 클릭하거나, '랜덤 포인트 생성' 버튼을 통해 점을 추가해주세요.");
		return;
	}
	
	if (centroids.filter(Boolean).length === k) {
		centroids.shift();
		centroids_old.shift();
		errors.shift();
	} else if (centroids.filter(Boolean).length > k) {
		let count = centroids.filter(Boolean).length - k + 1;
		
		for (let i = 0; i < count; i++) {
			centroids.shift();
			centroids_old.shift();
			errors.shift();
		}
	}

	let x = mouseX;
	let y = mouseY;
	  
	if (mouseX < minx) x = minx;
	if (mouseX > maxx) x = maxx;
	if (mouseY < miny) y = miny;
	if (mouseY > maxy) y = maxy;
	  
	centroids.push({
		x: x,
		y: y
	});
	centroids_old.push({
		x: 0,
		y: 0
	});
	errors.push(1);

	drawPoints();
  }
}

function startSetup() {
  isStart = true;
	
  if (found) {
    alert("이미 센트로이드를 찾았습니다! '포인트 삭제' 버튼을 눌러 다시 시작해주세요.");
    return;
  }

  if (dataset.length === 0) {
    alert("화면 오른쪽을 클릭하거나, 랜덤 포인트 생성 버튼을 통해 점을 추가해주세요.");
    return;
  }

  // get k value from user input
  k = noOfKInput.value();

  // initialize centroids and errors
  // centroids = new Array(k);
  // centroids_old = new Array(k);
  // errors = new Array(k).fill(1);

  // place K random centroids
  for (let i = 0; i < k; i++) {
	if (!centroids[i]) {
		centroids[i] = {
		  x: random(minx, maxx),
		  y: random(miny, maxy),
		};
		centroids_old[i] = { x: 0, y: 0 };
	}  
  }
	
  frameRate(10);
};

function start() {
  startSetup();
  loop();
}

function step() {
	if (found) {
		alert("이미 센트로이드를 찾았습니다! '포인트 삭제' 버튼을 눌러 다시 시작해주세요.");
		return;
	}
	if (dataset.length === 0) {
		alert("화면 오른쪽을 클릭하거나, '랜덤 포인트 생성' 버튼을 통해 점을 추가해주세요.");
		return;
	}
	if (!isStart) {
		startSetup();
	}
	runDraw();
}

function recalculateCentroids() {
  const length = centroids.length;
  for (let i = 0; i < length; i++) {
    let total_x = 0;
    let total_y = 0;
    let count = 0;
    for (let j = 0; j < dataset.length; j++) {
      if (dataset[j].label === i) {
        total_x += dataset[j].x;
        total_y += dataset[j].y;
        count++;
      }
    }
    if (count > 0) {
      let new_x = total_x / count;
      let new_y = total_y / count;

      
      centroids[i].x = lerp(centroids[i].x, new_x, 0.0001);
      centroids[i].y = lerp(centroids[i].y, new_y, 0.0001);
    }
  }

  // 클러스터 재할당
  for (let i = 0; i < dataset.length; i++) {
    let distances = new Array(length).fill(0);
    for (let j = 0; j < length; j++) {
      distances[j] = dist(dataset[i].x, dataset[i].y, centroids[j].x, centroids[j].y);
    }
    dataset[i].label = distances.indexOf(min(distances));
    dataset[i].color = colors[dataset[i].label];
  }
}