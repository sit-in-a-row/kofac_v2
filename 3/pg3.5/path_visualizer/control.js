const cellsToIframe = []; //0 -> empty, 1 -> wall, 2 -> weight, 3 -> start, 4 -> end
const rowsToIframe = Math.floor(($(window).height() * .85) / size);
const colsToIframe = Math.floor($(window).width() / size);
var iframes = document.getElementsByClassName('innerIframe');
var runningToIframe = false;
var sliderValueNum;

const initializeToIframe = () => {
    for (let r = 0; r < rowsToIframe; ++r) {
        cellsToIframe[r] = []; // 행마다 빈 배열 생성
        for (let c = 0; c < cols; ++c) {
            if (r == Math.floor(rowsToIframe / 2) && c == Math.floor(colsToIframe / 4)) {
                cellsToIframe[r][c] = 3; // 시작 지점을 나타내는 값 (예: 3)으로 설정
            } else if (r == Math.floor(rowsToIframe / 2) && c == Math.floor(3 * colsToIframe / 4)) {
                cellsToIframe[r][c] = 4; // 끝 지점을 나타내는 값 (예: 4)으로 설정
            } else {
                cellsToIframe[r][c] = 0; // 기본 셀 상태를 나타내는 값 (예: 0)으로 설정
            }
        }
    }
    return cellsToIframe
}

const toggleButtonsToIframe = () => {
    $('#clear-path').toggleClass('disabled');
    $('#clear-board').toggleClass('disabled');
    $('#clear-weights').toggleClass('disabled');
    $('#start').toggleClass('disabled');
    $('#pathfinding-algo').toggleClass('disabled');
    $('#mazegeneration-algo').toggleClass('disabled');
}

const setNoiseToIframe = (weighted = false) => {
    for (let r = 0; r < rowsToIframe; ++r) {
        for (let c = 0; c < colsToIframe; ++c) {
            if (cellsToIframe[r][c] != 3 && cellsToIframe[r][c] != 4 && Math.random() < 0.3) {
                if (weighted) {
                    cellsToIframe[r][c] = 2;
                } else {
                    cellsToIframe[r][c] = 1;
                }
            }
        }
    }
    return cellsToIframe
}

function sendMazeDataToIframes(mazeInfo) {
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        iframe.contentWindow.postMessage({ type: 'mazeInfo', data: mazeInfo }, '*');
    }
}

function triggerClearBoardInIframes() {
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        iframe.contentWindow.postMessage({ type: 'clearBoard', data: 'triggerClearBoard' }, '*');
    }
}

function triggerClearPathInIframes() {
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        iframe.contentWindow.postMessage({ type: 'clearPath', data: 'triggerClearPath' }, '*');
    }
}

function resumeBtn () {
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        iframe.contentWindow.postMessage({ type: 'resumeBtn', data: 'triggerResumeBtn' }, '*');
    }
}

function pauseBtn () {
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        iframe.contentWindow.postMessage({ type: 'pauseBtn', data: 'triggerPauseBtn' }, '*');
    }
}

function ToIframeSliderValue () {
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        iframe.contentWindow.postMessage({ type: 'sliderValue', data: selectedValueNum }, '*');
    }
}

$('#start').click(() => {
    toggleButtons();
    startTime = performance.now();

    // 각 iframe에 알고리즘 실행을 위한 메시지 전송
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        switch (i) {
            case 0:
                iframe.contentWindow.postMessage({ type: 'executeAlgorithm', algorithm: 'astar' }, '*');
                break;
            case 1:
                iframe.contentWindow.postMessage({ type: 'executeAlgorithm', algorithm: 'bfs' }, '*');
                break;
            case 2:
                iframe.contentWindow.postMessage({ type: 'executeAlgorithm', algorithm: 'dfs' }, '*');
                break;
            case 3:
                iframe.contentWindow.postMessage({ type: 'executeAlgorithm', algorithm: 'gbfs' }, '*');
                break;
        }
    }
    endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`실행 시간: ${executionTime} 밀리초`);
    $('#time').html(`<strong>실행시간:&nbsp</strong>` + executionTime.toFixed(4) + 'ms').show();
});

document.getElementById('clear-path').addEventListener('click', function () {
    console.log('경로 지우기 클릭');
    if (!runningToIframe) {
        runningToIframe = true;
        triggerClearPathInIframes();
        console.log('경로 지우기 정보 송신 완료');
        runningToIframe = false;
    }
    else {
        console.log('정보 송신 실패');
    }
});

document.getElementById('random-maze').addEventListener('click', function () {
    console.log('미로 그리기 클릭');
    if (!runningToIframe) {
        runningToIframe = true;
        initializeToIframe();
        toggleButtonsToIframe();
        let mazeInfo = setNoiseToIframe();
        sendMazeDataToIframes(mazeInfo);
        console.log('미로 만들기 정보 송신 완료');
        runningToIframe = false;
    }
    else {
        console.log('정보 송신 실패');
    }
});

document.getElementById('clear-board').addEventListener('click', function () {
    console.log('보드 지우기 클릭');
    if (!runningToIframe) {
        runningToIframe = true;
        triggerClearBoardInIframes();
        console.log('보드 지우기 정보 송신 완료');
        runningToIframe = false;
    }
    else {
        console.log('정보 송신 실패');
    }
});

document.getElementById('clear-path').addEventListener('click', function () {
    console.log('경로 지우기 클릭');
    if (!runningToIframe) {
        runningToIframe = true;
        triggerClearPathInIframes();
        console.log('경로 지우기 정보 송신 완료');
        runningToIframe = false;
    }
    else {
        console.log('정보 송신 실패');
    }
});

// asdfasdfasdf

// 슬라이더 관련

const sliderToIframe = document.getElementById("animationSpeedSlider");
const sliderValueToIframe = document.getElementById("sliderValue");

var selectedValue = sliderToIframe.value; // 전역 변수로 설정

sliderToIframe.addEventListener("input", function() {
    selectedValueNum = sliderToIframe.value; // 슬라이더 값 업데이트
    // sliderValueToIframe.textContent = selectedValue + "ms";
    ToIframeSliderValue(selectedValueNum);
});

// 재생 및 일시정지 관련

let stopConditionToIframe = false;

document.getElementById('pause').addEventListener('click', () => {
    stopConditionToIframe = true; // 알고리즘 일시 정지
    console.log("일시 정지");
    pauseBtn();
});

document.getElementById('resume').addEventListener('click', () => {
    stopConditionToIframe = false; // 알고리즘 다시 시작
    console.log("다시 시작");
    console.log(stopConditionToIframe);
    resumeBtn();
});

