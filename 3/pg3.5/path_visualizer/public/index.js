let algorithm = '';
let currentTutPage = 1;
let startTime, endTime;
let iterationCount = 0;
let visitedNodes = 0;

$(document).ready(() => {
    initialize();
    addEventListeners();

    $('#random-maze').click(() => {
        if (!running) {
            running = true;
            toggleButtons();
            clearBoard();
            setNoise();
        }
    });
    
    $('#dijkstra').click(() => {
        algorithm = 'dijkstra';
        $('#start').html('다익스트라 알고리즘<br>탐색 시작').css('line-height', '1.3')

    });
    $('#astar').click(() => {
        algorithm = 'astar';
        $('#start').html('A* 알고리즘<br>탐색 시작').css('line-height', '1.3')
    });
    $('#bfs').click(() => {
        algorithm = 'bfs';
        clearWeights();
        $('#start').html('너비 우선 탐색 알고리즘<br>탐색 시작').css('line-height', '1.3')
    });
    $('#dfs').click(() => {
        algorithm = 'dfs';
        clearWeights();
        $('#start').html('깊이 우선 탐색 알고리즘<br>탐색 시작').css('line-height', '1.3')
    });
    $('#gbfs').click(() => {
        algorithm = 'gbfs';
        clearWeights();
        $('#start').html('탐욕적 최상우선 탐색<br>탐색 시작').css('line-height', '1.3')
    });

    $('#start').click(() => {
        toggleButtons();
        startTime = performance.now();

        switch (algorithm) {
            case 'dijkstra':
                if (!running) { 
                    clearPath();
                    dijkstra();
                     
                }
                break;
            case 'astar':
                if (!running) {
                    clearPath();
                    astar();
                    
                }
                break;
            case 'bfs':
                if (!running) {
                    clearWeights();
                    clearPath();
                    bfs();
                    
                }
                break;
            case 'dfs':
                if (!running) {
                    clearWeights();
                    clearPath();
                    dfs();
                    
                }
                break;
            case 'gbfs':
                if (!running) {
                    clearWeights();
                    clearPath();
                    gbfs();
                    
                }
                break;
            default: break;
        }
        endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(`알고리즘: ${algorithm}, 실행 시간: ${executionTime} 밀리초`);
        // $('#time').html(`<strong>실행시간:&nbsp</strong>` + executionTime.toFixed(4) + 'ms').show();
    });
    $('#clear-board').click(() => {
        if (!running) {
            clearBoard();
        }
    });
    $('#clear-path').click(() => {
        if (!running) {
            clearPath();
        }
    });

});

const toggleButtons = () => {
    $('#clear-path').toggleClass('disabled');
    $('#clear-board').toggleClass('disabled');
    $('#clear-weights').toggleClass('disabled');
    $('#start').toggleClass('disabled');
    $('#pathfinding-algo').toggleClass('disabled');
    $('#mazegeneration-algo').toggleClass('disabled');
}