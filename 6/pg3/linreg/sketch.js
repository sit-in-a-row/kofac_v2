var X = [];
var Y = [];
var M, B;
var mseElement; // MSE 값을 표시하는 HTML 요소
var equationElement; // 방정식을 표시하는 HTML 요소

const m = tf.variable(tf.scalar(1)); // 평균 기울기 값으로 설정
const b = tf.variable(tf.scalar(0)); // 평균 y-절편 값으로 설정

const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);
var trainingInProgress = true; 

function createCustomButton(label, positionX, positionY, clickHandler, bgColor, borderRadius, textColor, hoverColor) {
  const buttonWidth = windowWidth / 9; 
  const buttonHeight = windowHeight / 15; 
  const buttonFontSize = buttonWidth / 9; 

  const button = createButton(label)
    .position(positionX, positionY)
    .size(buttonWidth, buttonHeight)
    .mousePressed(clickHandler)
    .style('font-family', 'Pretendard')
    .style('font-size', buttonFontSize + 'px')
    .style('font-weight', 'bold')
    .style('background-color', bgColor)
    .style('color', textColor)
    .style('border', `1px solid ${bgColor}`)
    .style('border-radius', borderRadius + 'px');

  button.mouseOver(() => {
    button.style('background-color', hoverColor);
  });

  button.mouseOut(() => {
    button.style('background-color', bgColor);
  });

  return button;
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  const buttonWidth = windowWidth / 10;
  const buttonSpan = (windowWidth /55);
  const buttonY = windowHeight / 8;

  mseElement = createP('<strong>MSE:</strong> ').position(20, windowHeight - 100);
  mseElement.style('font-size', '20px').style('font-weight', 'bold');

  equationElement = createP('<strong>회귀식:</strong> ').position(20, windowHeight - 70);
  equationElement.style('font-size', '20px').style('font-weight', 'bold').style('color', 'white');

  createCustomButton('무작위 데이터 생성', windowWidth - (3*buttonWidth + 4*buttonSpan), buttonY, generateRandomData, '#002073', 12, 'white', '#007bff');
  createCustomButton('데이터 재설정', windowWidth - (2*buttonWidth + 3*buttonSpan), buttonY, resetData, '#3286FA', 12, 'white', '#66a9ff');
  createCustomButton('학습하기', windowWidth - (buttonWidth + 2*buttonSpan), buttonY, trainModel, '#FDD424', 12, 'black', '#ffcc00');

  resetData(); // resetData를 먼저 호출
}


function trainModel() {
  drawInitialLine();

  if (X.length > 1) {
    tf.tidy(() => {
      const xs = tf.tensor(X, [X.length, 1]);
      const ys = tf.tensor(Y, [Y.length, 1]);
      train(xs, ys);
      [M, B] = [m.dataSync()[0], b.dataSync()[0]];
    });

    drawLine();
    updateMSE();
    trainingInProgress = true;
  }
}

function draw() {
  background(255);
  intro();
  plotData();

  if (trainingInProgress) {
    tf.tidy(() => {
      const xs = tf.tensor(X, [X.length, 1]);
      const ys = tf.tensor(Y, [Y.length, 1]);
      train(xs, ys);
      [M, B] = [m.dataSync()[0], b.dataSync()[0]];
    });

    drawLine();
    updateMSE();
  }

  console.log(tf.memory().numTensors);

  if (X.length === 0) {
    mseElement.style('color', '#fff').html('MSE: ');
    equationElement.html('회귀식: ');
  }
}

function updateMSE() {
  const xs = tf.tensor(X, [X.length, 1]);
  const ys = tf.tensor(Y, [Y.length, 1]);
  const predictions = predict(xs);
  const mse = loss(predictions, ys).dataSync()[0] * 1000;

  if (X.length === 0) {
    mseElement.style('color', '#000').style('font-weight', 'bold').html('<strong>MSE:</strong> '); // 초기 화면, 'MSE:' 라벨만 굵게
    equationElement.html('<strong>회귀식:</strong> '); // 초기 화면, 'Equation:' 라벨만 표시
  } else if (trainingInProgress) {
    // Multiply M and B by 100 in the equation and round to 2 decimal places
    const equation = `<strong>회귀식:</strong> y = ${(M * 10).toFixed(2)}x + ${(B * 10).toFixed(2)}`;
    equationElement.style('color', '#000').style('font-weight', 'normal').html(equation); // 업데이트 중, 일반 굵기
    mseElement.style('color', '#000').style('font-weight', 'normal').html(`<strong>MSE:</strong> ${mse.toFixed(2)}`); // 업데이트 중, 일반 굵기
  }
}


function generateRandomData() {
  X = [];
  Y = [];

  const mValue = (Math.random() * 2) - 1; // -1에서 1 사이의 난수
  const bValue = 0.5 ; // y 절편을   

  for (let i = 0; i < 50; i++) {
    let randomX = Math.random(); // 0과 1 사이의 무작위 x값 생성
    let randomY = mValue * randomX + bValue + (Math.random() - 0.5) * 0.3; // 선형 관계에 노이즈 추가

    X.push(randomX);
    Y.push(randomY);
  }
}

function mouseClicked() {
  // 첫 번째 버튼 클릭 영역 확인
  const randomDataButtonX = windowWidth - 505;
  const randomDataButtonY = 95;
  const randomDataButtonWidth = 150;
  const randomDataButtonHeight = 50;

  // 두 번째 버튼 클릭 영역 확인
  const resetDataButtonX = windowWidth - 345;
  const resetDataButtonY = 95;
  const resetDataButtonWidth = 150;
  const resetDataButtonHeight = 50;

  // 세 번째 버튼 클릭 영역 확인
  const trainModelButtonX = windowWidth - 185;
  const trainModelButtonY = 95;
  const trainModelButtonWidth = 150;
  const trainModelButtonHeight = 50;

  // 클릭된 좌표가 어떤 버튼에 속하는지 확인 후 데이터 생성
  if (
    (mouseX < randomDataButtonX || mouseX > randomDataButtonX + randomDataButtonWidth ||
     mouseY < randomDataButtonY || mouseY > randomDataButtonY + randomDataButtonHeight) &&
    (mouseX < resetDataButtonX || mouseX > resetDataButtonX + resetDataButtonWidth ||
     mouseY < resetDataButtonY || mouseY > resetDataButtonY + resetDataButtonHeight) &&
    (mouseX < trainModelButtonX || mouseX > trainModelButtonX + trainModelButtonWidth ||
     mouseY < trainModelButtonY || mouseY > trainModelButtonY + trainModelButtonHeight) &&
     mouseX < windowWidth - 200
  ) {
    let normX = map(mouseX, 0, width, 0, 1);
    let normY = map(mouseY, 0, height, 0, 1);

    X.push(normX);
    Y.push(normY);
  }
}


function intro() {

  const titleFontsize = windowHeight / 15
  const paraFontsize = windowHeight / 30
  const buttonWidth = windowWidth / 10;
  const buttonSpan = (windowWidth /55);
  const rightMargin = 2*buttonSpan - 5

  fill(250);
  noStroke();
  textSize(40);

  // 말머리로 사용할 선 그리기
  stroke("#3286FA"); // 말머리 선의 색상을 #3286FA로 설정
  strokeWeight(paraFontsize/2); // 말머리 선의 두께 설정
  line(rightMargin, windowHeight/15, rightMargin, windowHeight / 6);

  // '선형회귀 실습' 텍스트 출력
  textFont('Pretendard');
  textStyle(BOLD);
  textSize(titleFontsize);
  noStroke(); // 텍스트 주변에 선 없애기
  fill(0); // 텍스트 색상을 검정색으로 설정
  text("선형회귀 실습", rightMargin*(1.5), windowHeight / 9);

  // '그래프에 점을 찍어 선형회귀선을 만들어봅시다' 일반 폰트 출력
  textStyle(NORMAL); // 일반 폰트로 설정
  textSize(paraFontsize);
  fill(0); // 텍스트 색상을 검정색으로 설정
  let instruction = "화면을 클릭하면 데이터가 생성됩니다. '학습하기' 버튼을 눌러 회귀선을 찾습니다.";
  text(instruction, rightMargin*(1.6), windowHeight / 6);

  fill(100);
  textSize(15);

  noFill();
  noStroke();
}

function loss(predictions, labels) {
  return predictions.sub(labels).square().mean();
}

function train(xs, ys, numIterations = 1) {
  for (let iter = 0; iter < numIterations; iter++) {
    optimizer.minimize(() => loss(predict(xs), ys));
  }
}

function predict(x) {
  return m.mul(x).add(b);
}

function h(x) {
  return B + M * x;
}

function drawInitialLine() {
  // 초기에 세로선을 그리는 함수
  stroke(150);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
}

function drawLine() {
  let x1 = 0;
  let y1 = h(x1);
  let x2 = 1;
  let y2 = h(x2);

  let denormX1 = Math.floor(map(x1, 0, 1, 0, width));
  let denormY1 = Math.floor(map(y1, 0, 1, 0, height));
  let denormX2 = Math.floor(map(x2, 0, 1, 0, width));
  let denormY2 = Math.floor(map(y2, 0, 1, 0, height));

  stroke("#002073"); 
  strokeWeight(3); // 회귀선 두께 조절
  line(denormX1, denormY1, denormX2, denormY2);
}


function plotData() {
  noStroke();
  fill('#3286FA')

  for (let i = 0; i < X.length; i++) {
    let denormX = Math.floor(map(X[i], 0, 1, 0, width));
    let denormY = Math.floor(map(Y[i], 0, 1, 0, height));
    ellipse(denormX, denormY, 10);
  }

  noFill();
}

function resetData() {
  background(255); // 캔버스 지우기
  X = [];
  Y = [];
  trainingInProgress = false; // 학습 중지
  mseElement.style('color', '#fff').html('MSE: '); // MSE 텍스트 색상을 흰색으로 변경
  equationElement.style('color', '#fff').html('<strong>회귀식:</strong> '); // 방정식 텍스트 색상을 흰색으로 변경
}

