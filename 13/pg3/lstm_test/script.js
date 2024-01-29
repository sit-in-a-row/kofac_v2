var ctx = document.getElementById('chart').getContext('2d');
ctx.canvas.width = 1000;
ctx.canvas.height = 500;

var barData = []; // 랜덤 데이터 생성 부분을 삭제

function lineData() { return barData.map(d => { return { x: d.x, y: d.c} }) };

var chart = new Chart(ctx, {
    type: 'candlestick',
    data: {
        datasets: [{
            label: '입력한 CSV 파일의 주가 추이 그래프',
            data: barData
        }]
    },
    options: {
        plugins: {
            zoom: {
                zoom: {
                  wheel: {
                    enabled: true
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: "xy"
                },
                pan: {
                  enabled: true
                }
              }
        }
    }
});


var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

// CSV 파일을 읽고 데이터를 파싱하는 함수
function readCSV(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var rows = e.target.result.split("\n");
        var data = [];
        for(var i = 1; i < rows.length; i++) {
            var cells = rows[i].split(",");
            if(cells.length > 1) {
                var datum = {
                    x: luxon.DateTime.fromISO(cells[0]).valueOf(),
                    o: parseFloat(cells[1]),
                    h: parseFloat(cells[2]),
                    l: parseFloat(cells[3]),
                    c: parseFloat(cells[4])
                };
                data.push(datum);
            }
        }
        callback(data);
    };
    reader.readAsText(file);
}

function resetZoom() {
    chart.resetZoom();
}


// CSV 데이터를 화면에 출력 (표 형식)
function displayCSVData(data) {
    var tableData = '<table border="1" style="width: calc(30vw - 30px); height: 100%;"><thead><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></thead><tbody>';
    data.forEach(function(datum, index) {
        // 날짜 포맷팅
        var formattedDate = new Date(datum.x).toISOString().split('T')[0];

        // 각 셀을 클릭하면 수정 가능한 입력 필드로 바꿈
        tableData += `<tr><td><input type="date" id="date-${index}" value="${formattedDate}" style="width: 100%;"></td><td><input type="number" id="open-${index}" value="${datum.o}" style="width: 100%;"></td><td><input type="number" id="high-${index}" value="${datum.h}" style="width: 100%;"></td><td><input type="number" id="low-${index}" value="${datum.l}" style="width: 100%;"></td><td><input type="number" id="close-${index}" value="${datum.c}" style="width: 100%;"></td></tr>`;
    });
    tableData += '</tbody></table>';

    document.getElementById('csv-data').innerHTML = tableData;
}




// 파일 업로드 처리
document.getElementById('file-input').addEventListener('change', function(e) {
    var file = e.target.files[0];
    readCSV(file, function(data) {
        // 여기에 차트 업데이트 로직 추가
        chart.data.datasets[0].data = data;
        chart.update();

        // CSV 데이터를 화면에 출력 (편집 가능한 입력 필드로 변환)
        displayCSVData(data);
    });
});





function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function randomBar(date, lastClose) {
    var open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
    var close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
    var high = +randomNumber(Math.max(open, close), Math.max(open, close) * 1.1).toFixed(2);
    var low = +randomNumber(Math.min(open, close) * 0.9, Math.min(open, close)).toFixed(2);
    return {
        x: date.valueOf(),
        o: open,
        h: high,
        l: low,
        c: close
    };

}

function getRandomData(dateStr, count) {
    var date = luxon.DateTime.fromRFC2822(dateStr);
    var data = [randomBar(date, 30)];
    while (data.length < count) {
        date = date.plus({days: 1});
        if (date.weekday <= 5) {
            data.push(randomBar(date, data[data.length - 1].c));
        }
    }
    return data;
}

// function fadeOutTip() {
//     var panZoomTip = document.getElementById('panZoom'); 
//     var resetTip = document.getElementById('reset'); 
//     panZoomTip.style.animation = 'fadeOut 0.5s ease-in forwards';
//     resetTip.style.animation = 'fadeOut 0.5s ease-in forwards';
// }


var update = function() {
    var dataset = chart.config.data.datasets[0];

    // candlestick vs ohlc
    var type = document.getElementById('type').value;
    dataset.type = type;

    // linear vs log
    var scaleType = document.getElementById('scale-type').value;
    chart.config.options.scales.y.type = scaleType;

    // color
    var colorScheme = document.getElementById('color-scheme').value;
    if (colorScheme === 'neon') {
        dataset.color = {
            up: '#01ff01',
            down: '#fe0000',
            unchanged: '#999',
        };
    } else {
        delete dataset.color;
    }

    // border
    var border = document.getElementById('border').value;
    var defaultOpts = Chart.defaults.elements[type];
    if (border === 'true') {
        dataset.borderColor = defaultOpts.borderColor;
    } else {
        dataset.borderColor = {
            up: defaultOpts.color.up,
            down: defaultOpts.color.down,
            unchanged: defaultOpts.color.up
        };
    }

    // mixed charts
    var mixed = document.getElementById('mixed').value;
    if(mixed === 'true') {
        chart.config.data.datasets = [
            {
                label: 'CHRT - Chart.js Corporation',
                data: barData
            },
            {
                label: 'Close price',
                type: 'line',
                data: lineData()
            }	
        ]
    }
    else {
        chart.config.data.datasets = [
            {
                label: 'CHRT - Chart.js Corporation',
                data: barData
            }	
        ]
    }

    chart.update();
};

// showGraph 버튼 클릭 이벤트 핸들러
document.getElementById('showGraph').addEventListener('click', function() {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";

    var panZoomTip = document.getElementById('panZoom');
    panZoomTip.style.display = "block"; // panZoom 이미지 표시

    // panZoom 이미지 클릭 시 fadeOutTip 함수 호출
    panZoomTip.addEventListener('click', function() {
        fadeOutTipModal();
    });

    var resetTip = document.getElementById('reset'); 
    resetTip.style.display = "none"; // reset 이미지 초기에 숨김

    // reset 이미지 클릭 시 사라지도록 이벤트 추가
    resetTip.addEventListener('click', function() {
        resetTip.style.display = "none";
    });
});

// fadeOutTipModal 함수 예제
function fadeOutTipModal() {
    var panZoomTip = document.getElementById('panZoom'); 
    panZoomTip.style.animation = 'fadeOut 0.5s ease-in forwards';

    // delay를 주어 fadeOut 애니메이션이 끝난 후에 reset 이미지가 나타나도록 함
    setTimeout(function() {
        var resetTip = document.getElementById('reset'); 
        resetTip.style.display = "block"; // reset 이미지 표시
    }, 500);
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('showGraph').addEventListener('click', main);

// // TensorFlow.js 라이브러리 로드
// const tf = require('@tensorflow/tfjs');

// 데이터 정규화 함수
function normalize(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return data.map(value => (value - min) / (max - min));
}

function denormalize(value, min, max) {
    return value * (max - min) + min;
}

function predictAndDenormalize(model, testX, min, max) {
    const predictedNormalized = model.predict(testX);
    predictedNormalized.print();

    const predicted = predictedNormalized.arraySync().map(value => denormalize(value[0], min, max));
    console.log(predicted);
}

// 시퀀스 데이터 생성 함수
function createSequences(data, nLookBack) {
    const x = [];
    const y = [];

    for (let i = nLookBack; i < data.length; i++) {
        x.push(data.slice(i - nLookBack, i));
        y.push(data[i]);
    }

    return {x, y};
}

// 데이터 준비 함수
function prepareData(data, nLookBack, testSize) {
    const closePrices = data.map(d => d.c);
    const normalizedClose = normalize(closePrices);

    const {x, y} = createSequences(normalizedClose, nLookBack);
    const trainSize = Math.floor(x.length * (1 - testSize));

    // 각 시퀀스의 각 값이 하나의 배열이 되도록 변경
    const x3d = x.map(sequence => sequence.map(value => [value]));

    return {
        trainX: tf.tensor3d(x3d.slice(0, trainSize), [trainSize, nLookBack, 1]),
        trainY: tf.tensor2d(y.slice(0, trainSize), [trainSize, 1]),
        testX: tf.tensor3d(x3d.slice(trainSize), [x3d.length - trainSize, nLookBack, 1]),
        testY: tf.tensor2d(y.slice(trainSize), [y.length - trainSize, 1])
    };
}


// LSTM 모델 구축 함수
function buildModel(inputShape) {
    const model = tf.sequential();
    model.add(tf.layers.lstm({inputShape, units: 50, returnSequences: true}));
    model.add(tf.layers.dropout(0.2));
    model.add(tf.layers.lstm({units: 50, returnSequences: false}));
    model.add(tf.layers.dropout(0.2));
    model.add(tf.layers.dense({units: 1}));

    model.compile(
        {
            optimizer: tf.train.adam(),
            loss: 'meanSquaredError',
        });
    
    return model;
}

// 차트 데이터와 설정 초기화
const lossChartData = {
    labels: [],
    datasets: [{
        label: 'Loss',
        data: [],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
    }]
};

const valLossChartData = {
    labels: [],
    datasets: [{
        label: 'Validation Loss',
        data: [],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
    }]
};

const chartOptions = {
    type: 'line',
    options: {}
};

// 차트 생성
const lossChart = new Chart(
    document.getElementById('lossGraph').getContext('2d'),
    { ...chartOptions, data: lossChartData }
);

const valLossChart = new Chart(
    document.getElementById('valLossGraph').getContext('2d'),
    { ...chartOptions, data: valLossChartData }
);

const trainLogsElement = document.getElementById('logs');

// 모델 훈련 함수
async function trainModel(model, trainX, trainY, epochs = 10, batchSize = 16, validationSplit = 0.2) {
    const callbacks = {
        onEpochEnd: async (epoch, logs) => {
            // 차트에 데이터 추가
            lossChartData.labels.push(`Epoch ${epoch + 1}`);
            lossChartData.datasets[0].data.push(logs.loss);
            valLossChartData.labels.push(`Epoch ${epoch + 1}`);
            valLossChartData.datasets[0].data.push(logs.val_loss);

            // 로그를 화면에 표시
            updateTrainingLogs(epoch, logs);

            // 차트 업데이트
            lossChart.update();
            valLossChart.update();

            await tf.nextFrame(); // UI 업데이트 허용
        }
    };

    return await model.fit(trainX, trainY, {epochs, batchSize, validationSplit, callbacks});
}

// 훈련 로그를 업데이트하는 함수
function updateTrainingLogs(epoch, logs) {
    const message = `<strong>[Epoch ${epoch + 1}]</strong><br>Loss = ${logs.loss.toFixed(4)}<br>Validation Loss = ${logs.val_loss.toFixed(4)}<br><br>`;
    trainLogsElement.innerHTML += message; // innerHTML을 사용하여 HTML 형식으로 메시지 추가
}

// 향후 30일 간의 예측 데이터를 기반으로 차트 데이터셋을 생성하는 함수
function createFuturePredictionDataset(predictions) {
    const labels = Array.from({length: predictions.length}, (_, i) => `${i + 1}일차`);
    const data = predictions;

    return {
        labels: labels,
        datasets: [{
            label: '앞으로의 주가 예측',
            data: data,
            fill: false,
            borderColor: 'green', // 라인 색상
            backgroundColor: 'rgba(0, 255, 0, 0.1)', // 배경 색상
            tension: 0.1 // 선의 곡률
        }]
    };
}

// 차트에 향후 30일 예측 데이터를 표시하는 함수
function displayFuturePredictions(predictions) {
    var checking = document.getElementById('checking');
    checking.style.display = "none";
    
    const futurePredictionData = createFuturePredictionDataset(predictions);

    // 향후 예측 차트 엘리먼트 가져오기
    const ctx = document.getElementById('valResultGraph').getContext('2d');
    
    // 기존 차트가 있다면 제거
    if (window.futurePredictionChart) {
        window.futurePredictionChart.destroy();
    }

    // 새로운 차트 생성
    window.futurePredictionChart = new Chart(ctx, {
        type: 'line',
        data: futurePredictionData,
        options: {
            scales: {
                y: {
                    beginAtZero: false, // y축을 0부터 시작하지 않음
                    title: {
                        display: true,
                        text: '가격'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '일자'
                    }
                }
            }
        }
    });
}


// 예측 결과 표시 함수
function predict(model, testX, min, max) {
    const predicted = model.predict(testX);
    const predictedArray = predicted.arraySync(); // 텐서를 JavaScript 배열로 변환
    const denormalizedPredictions = predictedArray.map(value => denormalize(value[0], min, max)); // 예측 결과를 denormalize
    console.log(denormalizedPredictions); // denormalized 예측 결과를 출력

    displayFuturePredictions(denormalizedPredictions); // 올바른 변수 사용
}


// 파일 읽기 및 주요 프로세스 실행 함수
async function main(file) {
    readCSV(file, async function(data) {
        const { trainX, trainY, testX, testY } = prepareData(data, 60, 0.2);
        const model = buildModel([60, 1]);
        await trainModel(model, trainX, trainY);

        // 모델을 사용하여 테스트 데이터에 대한 예측 수행
        predict(model, testX, Math.min(...data.map(d => d.c)), Math.max(...data.map(d => d.c)));
    });
}


// 파일 입력 및 예측 버튼 이벤트 리스너 설정
document.getElementById('predict').addEventListener('click', function() {
    var checking = document.getElementById('checking');
    checking.style.display = "block";
    tf.setBackend('cpu');

    const file = document.getElementById('file-input').files[0];
    main(file);
});

// 파일 입력의 클릭 이벤트를 트리거하기 위한 함수
function openFileInput() {
    document.getElementById('file-input').click();
}

// 사용자 정의 파일 입력 버튼에 이벤트 리스너를 추가합니다.
document.getElementById('custom-file-input').addEventListener('click', openFileInput);

// Function to fetch and read the CSV file
async function fetchAndReadCSV(url, callback) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        processCSVText(text, callback);
    } catch (error) {
        console.error("Error fetching the CSV file:", error);
    }
}

// Function to process CSV text
function processCSVText(csvText, callback) {
    var rows = csvText.split("\n");
    var data = [];
    for(var i = 1; i < rows.length; i++) {
        var cells = rows[i].split(",");
        if(cells.length > 1) {
            var datum = {
                x: luxon.DateTime.fromISO(cells[0]).valueOf(),
                o: parseFloat(cells[1]),
                h: parseFloat(cells[2]),
                l: parseFloat(cells[3]),
                c: parseFloat(cells[4])
            };
            data.push(datum);
        }
    }
    callback(data);
}

// Event listener for 'loadCSV' button
document.getElementById('loadCSV').addEventListener('click', function() {
    fetchAndReadCSV('stock_info.csv', function(data) {
        // Update chart and display CSV data
        chart.data.datasets[0].data = data;
        chart.update();
        displayCSVData(data);
    });
});
