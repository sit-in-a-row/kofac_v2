var X = [];
var Y = [];

var M, B;

var isXselected = false;
var isYselected = false;

var Xinfo;
var Yinfo;

var Xheader = '';
var Yheader = '';

const m = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));

const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);

function setup() {
  // textContainer의 너비를 구하기
  const textContainerWidth = document.getElementById('textContainer').offsetWidth;

  // Viewport Width (vw) 단위를 픽셀로 변환
  const additionalMargin = windowWidth * 0.08;

  // 여백 정의
  const topBottomMargin = windowHeight * 0.05;

  // 여백과 textContainer 너비를 고려한 캔버스 크기 조정
  const canvasWidth = windowWidth - textContainerWidth - additionalMargin; 
  const canvasHeight = windowHeight - (2 * topBottomMargin);

  // 조정된 크기로 캔버스 생성
  createCanvas(canvasWidth, canvasHeight);
  background(220);
}

function windowResized() {
  // textContainer의 너비를 다시 구하기
  const textContainerWidth = document.getElementById('textContainer').offsetWidth;

  // Viewport Width (vw) 단위를 픽셀로 변환하여 추가 여백 계산
  const additionalMargin = windowWidth * 0.08;

  // 여백 정의
  const topBottomMargin = windowHeight * 0.05;

  // 여백과 textContainer 너비를 고려한 캔버스 크기 조정
  const canvasWidth = windowWidth - textContainerWidth - additionalMargin; 
  const canvasHeight = windowHeight - (2 * topBottomMargin);

  // 새로운 크기로 캔버스 크기 조정
  resizeCanvas(canvasWidth, canvasHeight);
}

function adjustCanvasSize() {
  // textContainer의 너비를 다시 구하기
  const textContainerWidth = document.getElementById('textContainer').offsetWidth;

  // Viewport Width (vw) 단위를 픽셀로 변환하여 추가 여백 계산
  const additionalMargin = windowWidth * 0.08;

  // 여백 정의
  const topBottomMargin = windowHeight * 0.05;

  // 여백과 textContainer 너비를 고려한 캔버스 크기 조정
  const canvasWidth = windowWidth - textContainerWidth - additionalMargin; 
  const canvasHeight = windowHeight - (2 * topBottomMargin);

  // 새로운 크기로 캔버스 크기 조정
  resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(255);
  intro();
  plotData();

  document.getElementById('equation').style.display = 'block';
  document.getElementById('MSE').style.display = 'block';

  if (X.length) {
    tf.tidy(() => {
      const xs = tf.tensor(X, [X.length, 1]);
      const ys = tf.tensor(Y, [Y.length, 1]);

      train(xs, ys);

      M = m.dataSync()[0];
      B = b.dataSync()[0];

      // 방정식 업데이트
      updateEquation(M, B);

      // MSE 계산 및 업데이트
      const predictions = predict(xs);
      const mse = calculateMSE(predictions, ys);
      document.getElementById('MSE').innerHTML = "MSE: " + mse.toFixed(4);
    });
    drawLine();
  }

  if (Xinfo && Yinfo && Xinfo.length > 0 && Yinfo.length > 0 && Xinfo.length === Yinfo.length) {
    plotXYInfo();
  }
}

// 회귀선을 계산하고 그리는 함수
function calculateAndDrawRegressionLine() {
  console.log('회귀선 그리기 함수 호출됨');
  if (Xinfo && Yinfo && Xinfo.length > 0 && Yinfo.length > 0) {
    console.log('조건 정상적으로 입력됨');
    // Xinfo와 Yinfo를 텐서로 변환
    const xs = tf.tensor(Xinfo, [Xinfo.length, 1]);
    const ys = tf.tensor(Yinfo, [Yinfo.length, 1]);

    // 회귀선을 훈련
    train(xs, ys, 100); // 예: 100번 반복 훈련

    // 회귀선의 매개변수를 가져오기
    M = m.dataSync()[0];
    B = b.dataSync()[0];

    // 캔버스에 회귀선 그리기
    drawLine();
  }
  else {
    console.log('그리기 실행되지 않음');
  }
}

function predict(x) {
  // y = m * x + b
  return m.mul(x).add(b)
}

function intro () {
  fill(250)
  noStroke()
  textFont('monospace')
  textSize(25)
  textSize(20)
  fill(100)
  textSize(15)
  noFill();
  noStroke();
}

function loss(predictions, labels) {
  // 평균 제곱 오차
  return predictions.sub(labels).square().mean();
}

function train(xs, ys, numIterations = 1) {
  for (let iter = 0; iter < numIterations; iter++) {
    optimizer.minimize(() => loss(predict(xs), ys));
  }
}

function calculateMSE(predictions, labels) {
  const error = predictions.sub(labels).square().mean();
  return error.dataSync()[0]; // Tensor 객체에서 스칼라 값으로 변환
}

function updateEquation(m, b) {
  const equation = "y = " + m.toFixed(2) + "x + " + b.toFixed(2);
  document.getElementById('equation').innerHTML = "방정식: " + equation;
}

function mouseClicked() {
  // 캔버스 범위 내에서 클릭 이벤트 확인
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    // 마우스 좌표를 정규화된 값으로 변환
    let normX = map(mouseX, 0, width, 0, 1);
    let normY = map(mouseY, 0, height, 1, 0);

    // X.push(normX);
    // Y.push(normY);

    // 콘솔에 좌표 출력
    console.log("클릭한 정규화된 좌표: X =", normX, ", Y =", normY);
  }
}

function h (x) {
  return B + M * x;
}

function drawLine() {
  let x1 = 0.0
  let y1 = h(x1);
  let x2 = 1.0
  let y2 = h(x2);

  let denormX1 = Math.floor(map(x1, 0, 1, 0, width));
  // Y 좌표의 방향을 반대로 매핑
  let denormY1 = Math.floor(map(y1, 0, 1, height, 0));
  let denormX2 = Math.floor(map(x2, 0, 1, 0, width));
  // Y 좌표의 방향을 반대로 매핑
  let denormY2 = Math.floor(map(y2, 0, 1, height, 0));

  stroke(0,32,115);
  strokeWeight(3);
  line(denormX1, denormY1, denormX2, denormY2);
}

function plotData () {
  noStroke();
  fill(0);
  for (let i = 0; i < X.length; i++) {
    let denormX = Math.floor(map(X[i], 0, 1, 0, width));
    // Y 좌표의 방향을 반대로 매핑
    let denormY = Math.floor(map(Y[i], 0, 1, height, 0));
    ellipse(denormX, denormY, 10);
  }
  noFill();
}

function plotXYInfo() {
  noStroke();
  fill(45,130,250); // Xinfo, Yinfo 데이터를 위한 색상 설정
  for (let i = 0; i < Xinfo.length; i++) {
    let denormX = Math.floor(map(Xinfo[i], 0, 1, 0, width));
    // Y 좌표의 방향을 반대로 매핑
    let denormY = Math.floor(map(Yinfo[i], 0, 1, height, 0));
    ellipse(denormX, denormY, 10);
  }
  noFill();
}

function displayCSV(csvData) {
  var rows = csvData.split("\n");
  var html = "<table border='1'>";

  rows.forEach(function(row, rowIndex) {
      var cells = row.split(",");
      html += "<tr>";
      cells.forEach(function(cell, cellIndex) {
          if (rowIndex === 0) {
              // 첫 번째 행은 테이블 헤더입니다. 인덱스는 표시하지 않습니다.
              html += "<th onmouseenter='highlightColumn(" + cellIndex + ", true)' onmouseleave='highlightColumn(" + cellIndex + ", false)' onclick='columnClicked(" + cellIndex + ")'>" + cell + "</th>";
          } else {
              html += "<td>" + cell + "</td>";
          }
      });
      html += "</tr>";
  });

  html += "</table>";
  document.getElementById('csvInput').innerHTML = html;
  
  // CSV 데이터를 표시한 후 캔버스 크기 조정
  adjustCanvasSize();
}

function highlightColumn(columnIndex, isHighlight) {
  var table = document.querySelector('#csvInput table');
  var rows = table.rows;

  for (var i = 1; i < rows.length; i++) {
      var cell = rows[i].cells[columnIndex];
      if (cell) {
          cell.style.backgroundColor = isHighlight ? '#f5f5f5' : ''; // 색상 변경
      }
  }
}

function columnClicked(columnIndex) {
  var table = document.querySelector('#csvInput table');
  var rows = table.rows;

  var columnData = [];
  var header = ''; // 현재 컬럼 헤더를 저장
  for (var i = 0; i < rows.length; i++) {
    var cell = rows[i].cells[columnIndex];
    if (cell) {
      if (i === 0) { // 첫 번째 행은 헤더
        header = cell.textContent;
      } else {
        var cellText = cell.textContent.trim();

        // 숫자 혹은 음수가 아닌 경우 체크
        if (!cellText.match(/^[-]?\d+(\.\d+)?$/)) {
          console.log('선택할 수 없는 컬럼입니다');
          document.getElementById('columnBanTip').style.display = 'block';

          // 1초 후에 메시지를 숨기도록 setTimeout을 사용
          setTimeout(function() {
            document.getElementById('columnBanTip').style.display = 'none';
          }, 1000);

          return; // 유효하지 않은 데이터가 있으면 함수 종료
        }

        // NaN 체크를 위해 숫자로 변환 시도
        var value = parseFloat(cellText);
        if (isNaN(value)) {
          console.log('선택할 수 없는 컬럼입니다');
          document.getElementById('columnBanTip').style.display = 'block';

          // 1초 후에 메시지를 숨기도록 setTimeout을 사용
          setTimeout(function() {
            document.getElementById('columnBanTip').style.display = 'none';
          }, 1000);
          
          return; // NaN이면 함수 종료
        }
        columnData.push(value);
      }
    }
  }

  console.log("Column " + columnIndex + " data:", columnData);

  // X 또는 Y로 설정할지 결정
  if (!isXselected) {
    Xheader = header;
    document.getElementById('Xlabel').innerHTML = Xheader;
    document.getElementById('Xlabel').style.opacity = 1;
  } else if (!isYselected) {
    Yheader = header;
    document.getElementById('Ylabel').innerHTML = Yheader;
    document.getElementById('Ylabel').style.opacity = 1;
  }

  infoToCanvas(columnData);
}

function infoToCanvas(columnData) {
  // 데이터가 이미 선택되었는지 확인하고 이미 선택되었으면 재설정
  if (arraysEqual(Xinfo, columnData)) {
    Xinfo = '';
    isXselected = false;
    console.log("Xinfo reset");
  } else if (arraysEqual(Yinfo, columnData)) {
    Yinfo = '';
    isYselected = false;
    console.log("Yinfo reset");
  } 
  // 새 데이터 선택
  else {
    // 데이터 정규화 수행
    var normalizedData = normalizeData(columnData);
    
    if (!isXselected) {
      Xinfo = normalizedData;
      isXselected = true;
      console.log("Xinfo set to:", Xinfo);
    } else if (!isYselected) {
      Yinfo = normalizedData;
      isYselected = true;
      console.log("Yinfo set to:", Yinfo);
    } else {
      // 두 변수가 이미 선택되어 있으면 데이터를 삭제하라는 메시지 표시
      console.log("데이터를 삭제하고 다시 시도해주세요");
      document.getElementById('resetTip').style.display = 'block';

      // 1초 후에 메시지를 숨기도록 setTimeout을 사용
      setTimeout(function() {
        document.getElementById('resetTip').style.display = 'none';
      }, 1000);
    }
  }
  draw();
}

function normalizeData(dataArray) {
  var maxVal = Math.max(...dataArray); // 배열에서 최대값을 찾습니다.
  var minVal = Math.min(...dataArray); // 배열에서 최소값을 찾습니다.

  return dataArray.map(function(value) {
    return (value - minVal) / (maxVal - minVal); // 데이터를 정규화하여 반환합니다.
  });
}

function arraysEqual(arr1, arr2) {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) // 배열이 없거나 길이가 다르면 false를 반환합니다.
    return false;

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) // 배열 요소 중 하나라도 다르면 false를 반환합니다.
      return false;
  }

  return true; // 모든 요소가 같다면 true를 반환합니다.
}

function reset () {
  X = []; // X 배열 초기화
  Y = []; // Y 배열 초기화
  Xinfo = []; // Xinfo 배열 초기화
  Yinfo = []; // Yinfo 배열 초기화
  document.getElementById('Xlabel').innerHTML = ''; // X 레이블 초기화
  document.getElementById('Ylabel').innerHTML = ''; // Y 레이블 초기화
  document.getElementById('equation').innerHTML = '방정식: '; // 방정식 초기화
  document.getElementById('MSE').innerHTML = 'MSE: '; // MSE 초기화
  Xheader = ''; // X 헤더 초기화
  Yheader = ''; // Y 헤더 초기화
  isXselected = false; // X가 선택되지 않았음을 표시
  isYselected = false; // Y가 선택되지 않았음을 표시
  document.getElementById('Xlabel').style.opacity = 0; // X 레이블 투명도 초기화
  document.getElementById('Ylabel').style.opacity = 0; // Y 레이블 투명도 초기화
  document.getElementById('equation').style.display = 'none'; // 방정식 숨기기
  document.getElementById('MSE').style.display = 'none'; // MSE 숨기기
  draw(); // 화면 그리기 함수 호출
  drawLine(); // 선 그리기 함수 호출
}

document.getElementById('reset').addEventListener('click', function() {
  reset(); // 리셋 함수 호출
  windowResized(); // 창 크기 변경 함수 호출
});

document.getElementById('loadCustomCSV').addEventListener('click', function() {
  document.getElementById('fileChooser').click(); // 파일 선택창 열기
});

document.getElementById('fileChooser').addEventListener('change', function(event) {
  var file = event.target.files[0];
  if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
          var contents = e.target.result;
          displayCSV(contents); // CSV 내용을 화면에 표시하는 함수 호출
      };
      reader.readAsText(file); // 파일을 텍스트로 읽기
  }
});

document.getElementById('loadCSV').addEventListener('click', function() {
  // CSV 파일의 URL. 파일이 호스팅된 위치에 따라 이 경로를 수정해야 합니다.
  var contents = 'bicycle_day_final.csv';

  fetch(contents)
      .then(response => response.text())
      .then(data => {
          displayCSV(data);
      })
      .catch(error => {
          console.error('Error fetching CSV:', error);
      });
});

document.getElementById('start').addEventListener('click', function() {
  // Xinfo와 Yinfo의 데이터를 X, Y 배열에 복사
  X = [...Xinfo];
  Y = [...Yinfo];

  // 훈련 및 그리기를 위해 draw 함수 호출
  draw(); // 화면 그리기 함수 호출
});
