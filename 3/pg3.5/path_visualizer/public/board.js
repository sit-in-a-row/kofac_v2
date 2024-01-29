const size = 40;
const cells = []; //0 -> empty, 1 -> wall, 2 -> weight, 3 -> start, 4 -> end
const visited = [];
const rows = Math.floor(($(window).height() * .85) / size);
const cols = Math.floor($(window).width() / size);

let running = false;

// 슬라이더 관련

const slider = document.getElementById("animationSpeedSlider");
const sliderValue = document.getElementById("sliderValue");

var selectedValue = slider.value; // 전역 변수로 설정

slider.addEventListener("input", function() {
    selectedValue = slider.value; // 슬라이더 값 업데이트
    sliderValue.textContent = selectedValue + "ms";
});

// 재생 및 일시정지 관련

let stopCondition = false;

document.getElementById('pause').addEventListener('click', () => {
    stopCondition = true; // 알고리즘 일시 정지
    console.log("일시 정지");
});

document.getElementById('resume').addEventListener('click', () => {
    stopCondition = false; // 알고리즘 다시 시작
    console.log("다시 시작");
    console.log(stopCondition)
});

const continuePathFind = () => {
    stopCondition = false; // 경로 탐색 계속하기 위한 로직 구현
    console.log("경로 탐색 계속");
}

const initialize = () => {
    $('div#board').html('<table id="board" style="border-collapse: collapse"></table>');
    let tableHTML = '';
    for (let r = 0; r < rows; ++r) {
        tableHTML += `<tr id=\"${r}\">`;
        cells[r] = [];
        for (let c = 0; c < cols; ++c) {
            if (r == Math.floor(rows / 2) && c == Math.floor(cols / 4)) {
                tableHTML += `<td id=\"${r}-${c}\" class="start" width="${size}px" height="${size}px"></td>`;
                cells[r][c] = 3;
            } else if (r == Math.floor(rows / 2) && c == Math.floor(3 * cols / 4)) {
                tableHTML += `<td id=\"${r}-${c}\" class="end" width="${size}px" height="${size}px"></td>`;
                cells[r][c] = 4;
            } else {
                tableHTML += `<td id=\"${r}-${c}\" class width="${size}px" height="${size}px"></td>`;
                cells[r][c] = 0;
            }
        }
        tableHTML += '</tr>';
    }
    $('table#board').html(tableHTML);
}

const clearBoard = () => {
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            if (cells[r][c] == 1) {
                cells[r][c] = 0;
            }
        }
    }
    const startId = $('td.start').attr('id');
    const endId = $('td.end').attr('id');
    $('td').each((idx, item) => {
        if ($(item).attr('id') === startId) {
            $(item).attr('class', 'start');
        } else if ($(item).attr('id') === endId) {
            $(item).attr('class', 'end');
        } else {
            $(item).attr('class', '');
        }
    });
}

const clearWeights = () => {
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            if (cells[r][c] == 2) {
                cells[r][c] = 0;
            }
        }
    }
    $('td').each((idx, item) => {
        $(item).removeClass('weight');
    });
}

const clearPath = () => {
    $('td').each((idx, item) => {
        $(item).removeClass('visited').removeClass('path');
    });
}

const setBorders = () => {
    for (let c = 0; c < cells[0].length; ++c) {
        if (cells[0][c] != 3 && cells[0][c] != 4)
            cells[0][c] = 1;
    }
    for (let c = 0; c < cells[cells.length - 1].length; ++c) {
        if (cells[cells.length - 1][c] != 3 && cells[cells.length - 1][c] != 4)
            cells[cells.length - 1][c] = 1;
    }
    for (let r = 1; r < cells.length - 1; ++r) {
        if (cells[r][0] != 3 && cells[r][0] != 4)
            cells[r][0] = 1;
    }
    for (let r = 1; r < cells.length - 1; ++r) {
        if (cells[r][cells[r].length - 1] != 3 && cells[r][cells[r].length - 1] != 4)
            cells[r][cells[r].length - 1] = 1;
    }
}

const setGrid = () => {
    for (let r = 1; r < rows - 1; ++r) {
        for (let c = 1; c < cols - 1; ++c) {
            if (cells[r][c] != 3 && cells[r][c] != 4) {
                if (r % 2 == 0 || c % 2 == 0) {
                    cells[r][c] = 1;
                }
            }
        }
    }
}

const setMaze = () => {
    setBorders();
    setGrid();
    for (let r = 0; r < rows; ++r) {
        visited[r] = [];
        for (let c = 0; c < cols; ++c) {
            visited[r][c] = false;
        }
    }
    generateMaze(cols + 1);
    animateMaze(0);
}

const generateMaze = (idx) => {
    const neighbors = [];
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    visited[row][col] = true;
    if (col > 1) {
        if (cells[row][col - 2] != 1 && !visited[row][col - 2]) {
            neighbors.push(get1DIdx(row, col - 2));
        }
    }
    if (col < cols - 2) {
        if (cells[row][col + 2] != 1 && !visited[row][col + 2]) {
            neighbors.push(get1DIdx(row, col + 2));
        }
    }
    if (row > 1) {
        if (cells[row - 2][col] != 1 && !visited[row - 2][col]) {
            neighbors.push(get1DIdx(row - 2, col));
        }
    }
    if (row < rows - 2) {
        if (cells[row + 2][col] != 1 && !visited[row + 2][col]) {
            neighbors.push(get1DIdx(row + 2, col));
        }
    }
    shuffleArray(neighbors);
    if (neighbors.length == 0) {
        return;
    } else {
        neighbors.forEach(neighbor => {
            if (!visited[Math.floor(neighbor / cols)][neighbor % cols]) {
                removeWallBetween(idx, neighbor);
                generateMaze(neighbor);
            }
        });
    }

}

const setNoise = (weighted = false) => {
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            if (cells[r][c] != 3 && cells[r][c] != 4 && Math.random() < 0.3) {
                if (weighted) {
                    cells[r][c] = 2;
                } else {
                    cells[r][c] = 1;
                }
            }
        }
    }
    animateMaze(0);
}

const removeWallBetween = (idx1, idx2) => {
    const row1 = Math.floor(idx1 / cols);
    const row2 = Math.floor(idx2 / cols);
    const col1 = idx1 % cols;
    const col2 = idx2 % cols;
    if (col1 > col2) {
        if (cells[row1][col1 - 1] != 3 && cells[row1][col1 - 1] != 4)
            cells[row1][col1 - 1] = 0;
    } else if (col1 < col2) {
        if (cells[row1][col2 - 1] != 3 && cells[row1][col2 - 1] != 4)
            cells[row1][col2 - 1] = 0;
    } else if (row1 > row2) {
        if (cells[row1 - 1][col1] != 3 && cells[row1 - 1][col1] != 4)
            cells[row1 - 1][col1] = 0;
    } else if (row1 < row2) {
        if (cells[row2 - 1][col1] != 3 && cells[row2 - 1][col1] != 4)
            cells[row2 - 1][col1] = 0;
    }
}

const animateMaze = (idx) => {
    setTimeout(() => {
        if (idx == cells.length * cells[0].length) {
            running = false;
            
            return;
        }
        if (cells[Math.floor(idx / cols)][idx % cols] == 1) {
            $(`td[id=${Math.floor(idx / cols)}-${idx % cols}]`).addClass('wall');
        } else if (cells[Math.floor(idx / cols)][idx % cols] == 2) {
            $(`td[id=${Math.floor(idx / cols)}-${idx % cols}]`).addClass('weight');
        }
        animateMaze(idx + 1);
    }, 0);
}

// Greedy Best First Search 함수 //

const gbfs = () => {
    running = true;
    // 시작 노드와 목표 노드 위치 가져오기
    const startId = $('td[class=start]').attr('id').split('-');
    const endId = $('td[class=end]').attr('id').split('-');
    // 시작 노드와 목표 노드의 1차원 인덱스 구하기
    const startIdx = get1DIdx(parseInt(startId[0]), parseInt(startId[1]));
    const endIdx = get1DIdx(parseInt(endId[0]), parseInt(endId[1]));

    // 노드 방문 여부와 이전 노드 배열 초기화
    const visited = new Array(rows * cols);
    const prev = new Array(rows * cols);
    for (let i = 0; i < visited.length; ++i) {
        visited[i] = false;
        prev[i] = i;
    }

    // 임시 배열 생성 및 시작 노드 추가
    const tmp = [];
    tmp.push({ idx: startIdx, heuristic: getManhattanDistance(startIdx, endIdx) });

    let visitedNodes = 0;
    let iterationCount = 0;

    // 그리디 베스트 퍼스트 서치 도우미 함수 호출
    greedyBestFirstSearchHelper(tmp, endIdx, visited, prev, visitedNodes, iterationCount);
}

const calculatePathLength = (prev, endIdx) => {
    let length = 0;
    let currentIdx = endIdx;

    // 경로 길이 계산
    while (prev[currentIdx] !== currentIdx) {
        length++;
        currentIdx = prev[currentIdx];
    }

    return length;
}

const greedyBestFirstSearchHelper = (tmp, endIdx, visited, prev, visitedNodes, iterationCount) => {
    setTimeout(() => {
        // 일시정지 상태 확인
        if (stopCondition) {
            // 일시정지 상태에서 재생 버튼이 클릭될 때까지 대기
            const pauseInterval = setInterval(() => {
                if (!stopCondition) {
                    clearInterval(pauseInterval);
                    greedyBestFirstSearchHelper(tmp, endIdx, visited, prev, visitedNodes, iterationCount);
                }
            }, 100); // 매 100ms마다 체크
            return;
        }

        // 큐가 비었을 경우 검색 종료
        if (tmp.length === 0) {
            running = false;
            return;
        }

        // 가장 작은 휴리스틱 값을 가진 노드 찾기
        let minIdx = 0;
        tmp.forEach((item, i) => {
            if (item.heuristic < tmp[minIdx].heuristic) {
                minIdx = i;
            }
        });

        // 현재 노드 선택 및 큐에서 제거
        const current = tmp.splice(minIdx, 1)[0];

        // 이미 방문한 노드인 경우 무시
        if (visited[current.idx]) {
            greedyBestFirstSearchHelper(tmp, endIdx, visited, prev, visitedNodes, iterationCount);
            return;
        }

        // 현재 노드 방문 처리
        visited[current.idx] = true;
        visitedNodes++;
        const row = Math.floor(current.idx / cols);
        const col = current.idx % cols;
        $(`td[id=${row}-${col}]`).addClass('visited');

        // 목표 노드에 도달한 경우 경로 애니메이션 실행
        if (current.idx == endIdx) {
            animatePath(prev, current.idx);
            const pathLength = calculatePathLength(prev, endIdx);
            $('#nodesVisited').html('<strong>탐색한 거리:</strong>&nbsp' + (pathLength + 1) + '&nbsp&nbsp<strong>반복 횟수:</strong>&nbsp' + (iterationCount + 1)).show();
            running = false;
            return;
        }

        // 이웃 노드 추가 (상, 하, 좌, 우)
        const endRow = Math.floor(endIdx / cols);
        const endCol = endIdx % cols;
        addNeighbor(row - 1, col, tmp, endIdx, current.idx, visited, prev, endRow, endCol);
        addNeighbor(row, col + 1, tmp, endIdx, current.idx, visited, prev, endRow, endCol);
        addNeighbor(row + 1, col, tmp, endIdx, current.idx, visited, prev, endRow, endCol);
        addNeighbor(row, col - 1, tmp, endIdx, current.idx, visited, prev, endRow, endCol);

        // 다음 반복 실행
        iterationCount++;
        greedyBestFirstSearchHelper(tmp, endIdx, visited, prev, visitedNodes, iterationCount);
    }, selectedValue);
};

const addNeighbor = (row, col, tmp, endIdx, currentIdx, visited, prev, endRow, endCol) => {
    if (row >= 0 && row < rows && col >= 0 && col < cols && !visited[get1DIdx(row, col)] && cells[row][col] != 1) {
        const neighborIdx = get1DIdx(row, col);
        const heuristic = getManhattanDistance(row, col, endRow, endCol);
        tmp.push({ idx: neighborIdx, heuristic });
        prev[neighborIdx] = currentIdx;
    }
}

// Greedy Best First Search 함수 //

// Astar 함수 //

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    // 우선순위 큐 초기화
    enqueue(idx, priority) {
        let contains = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > priority) {
                this.items.splice(i, 0, { idx, priority });
                contains = true;
                break;
            }
        }

        if (!contains) {
            this.items.push({ idx, priority });
        }
    }

    // 가장 높은 우선순위 항목 추출
    dequeue() {
        return this.items.shift();
    }

    // 큐가 비어 있는지 확인
    isEmpty() {
        return this.items.length === 0;
    }
}

const astar = () => {
    running = true;
    
    // 시작 노드와 목표 노드 위치 획득
    const startId = $('td[class=start]').attr('id').split('-');
    const endId = $('td[class=end]').attr('id').split('-');
    
    // 시작 노드와 목표 노드의 1차원 인덱스 및 행, 열 정보 추출
    const startIdx = get1DIdx(parseInt(startId[0]), parseInt(startId[1]));
    const startR = parseInt(startId[0]);
    const startC = parseInt(startId[1]);
    
    const endIdx = get1DIdx(parseInt(endId[0]), parseInt(endId[1]));
    const endR = parseInt(endId[0]);
    const endC = parseInt(endId[1]);

    // 노드의 f-score, g-score, 이전 노드(prev) 배열 초기화
    const fScore = new Array(rows * cols).fill(1e9);
    const gScore = new Array(rows * cols).fill(1e9);
    const prev = new Array(rows * cols).fill(-1);

    // 아직 탐색되지 않은 노드들의 우선순위 큐 생성
    const openSet = new PriorityQueue();

    // 시작 노드의 f-score, g-score, prev 초기화 및 openSet에 추가
    fScore[startIdx] = getManhattanDistance(startR, startC, endR, endC);
    gScore[startIdx] = 0;
    prev[startIdx] = startIdx; // 시작 노드의 prev를 자기 자신으로 초기화
    openSet.enqueue(startIdx, fScore[startIdx]);

    // A* 알고리즘 도우미 함수 astarHelper 호출
    astarHelper(openSet, endIdx, endR, endC, fScore, gScore, prev, 0);
}

const astarHelper = (openSet, endIdx, endR, endC, fScore, gScore, prev, iterationCount) => {
    setTimeout(() => {
        // 일시정지 상태 확인
        if (stopCondition) {
            // 일시정지 상태에서 재생 버튼이 클릭될 때까지 대기
            const pauseInterval = setInterval(() => {
                if (!stopCondition) {
                    clearInterval(pauseInterval);
                    astarHelper(openSet, endIdx, endR, endC, fScore, gScore, prev, iterationCount);
                }
            }, 100); // 매 100ms마다 체크
            return;
        }
        
        iterationCount++;

        // openSet이 비어 있으면 탐색 종료 후 결과 출력 및 애니메이션 종료
        if (openSet.isEmpty()) {
            running = false;
            
            return;
        }

        // openSet에서 가장 높은 우선순위의 노드 가져오기
        const current = openSet.dequeue().idx;
        const row = Math.floor(current / cols);
        const col = current % cols;

        // 현재 노드 방문 표시
        $(`td[id = ${row}-${col}]`).addClass('visited');

        // 목표 노드 도달 확인 및 결과 출력
        if (current === endIdx) {
            console.log(`Visited nodes: ${iterationCount}, Shortest path: ${gScore[current]} nodes`);
            animatePath(prev, current);
            $('#nodesVisited').html('<strong>탐색한 거리:&nbsp</strong> ' + (gScore[current]+1) + '<strong>&nbsp&nbsp반복 횟수:&nbsp</strong> ' + iterationCount).show();
            return;
        }

        // 현재 노드의 이웃 노드 확인 및 갱신
        const neighbors = [
            { r: row - 1, c: col },
            { r: row, c: col + 1 },
            { r: row + 1, c: col },
            { r: row, c: col - 1 }
        ];

        neighbors.forEach(neighbor => {
            const { r, c } = neighbor;
            if (r >= 0 && r < rows && c >= 0 && c < cols && !($(`td[id=${r}-${c}]`).hasClass('wall'))) {
                const neighborIdx = get1DIdx(r, c);
                const tentativeGScore = gScore[current] + 1; // 필요한 경우 다른 가중치를 포함하여 업데이트

                // 현재 이웃 노드까지의 g-score가 더 작으면 갱신하고 openSet에 추가
                if (tentativeGScore < gScore[neighborIdx]) {
                    prev[neighborIdx] = current;
                    gScore[neighborIdx] = tentativeGScore;
                    fScore[neighborIdx] = tentativeGScore + getManhattanDistance(r, c, endR, endC);

                    if (!openSet.items.some(e => e.idx === neighborIdx)) {
                        openSet.enqueue(neighborIdx, fScore[neighborIdx]);
                    }
                }
            }
        });

        // 다음 탐색 단계 진행
        astarHelper(openSet, endIdx, endR, endC, fScore, gScore, prev, iterationCount);
    }, selectedValue); // 20 밀리초마다 한 번씩 탐색 진행
}

// Astar 함수 //

// BFS 함수 //

const bfs = () => {
    running = true;
    const startId = $('td[class=start]').attr('id').split('-');
    const endId = $('td[class=end]').attr('id').split('-');
    const startIdx = get1DIdx(parseInt(startId[0]), parseInt(startId[1]));
    const endIdx = get1DIdx(parseInt(endId[0]), parseInt(endId[1]));
    const prev = new Array(rows * cols);
    const visited = new Array(rows * cols);
    for (let i = 0; i < prev.length; ++i) {
        prev[i] = i;
        visited[i] = false;
    }
    const q = [];
    q.push({ node: startIdx, distance: 0 });
    bfsHelper(q, endIdx, prev, visited, 0, 0);
}

const bfsHelper = (q, endIdx, prev, visited, distance = 0, iterationCount = 0) => {
    setTimeout(() => {
        // 일시정지 상태 확인
        if (stopCondition) {
            // 일시정지 상태에서 재생 버튼이 클릭될 때까지 대기
            const pauseInterval = setInterval(() => {
                if (!stopCondition) {
                    clearInterval(pauseInterval);
                    bfsHelper(q, endIdx, prev, visited, distance = 0, iterationCount = 0);
                }
            }, 100); // 매 100ms마다 체크
            return;
        }
        
        if (q.length == 0) {
            running = false;
            
            return;
        }
        const { node, distance: currentDistance } = q.splice(0, 1)[0];
        const row = Math.floor(node / cols);
        const col = node % cols;

        // 콘솔에 현재 방문한 노드의 인덱스를 기록
        console.log(`방문한 노드: ${node} (행: ${row}, 열: ${col})`);

        $(`td[id=${row}-${col}]`).addClass('visited');
        if (visited[get1DIdx(row, col)]) {
            bfsHelper(q, endIdx, prev, visited, distance, iterationCount);
            return;
        }
        visited[node] = true;
        if (node == endIdx) {
            animatePath(prev, node);
            $('#nodesVisited').html('<strong>탐색한 거리:&nbsp</strong>' + (distance+1) + '&nbsp&nbsp<strong>반복 횟수:&nbsp</strong>' + iterationCount).show();
            return;
        }

        const neighbors = [
            { r: row - 1, c: col },
            { r: row, c: col + 1 },
            { r: row + 1, c: col },
            { r: row, c: col - 1 }
        ];

        for (const neighbor of neighbors) {
            const { r, c } = neighbor;
            if (r >= 0 && r < rows && c >= 0 && c < cols && cells[r][c] != 1 && !visited[get1DIdx(r, c)]) {
                const neighborIdx = get1DIdx(r, c);
                prev[neighborIdx] = node;
                q.push({ node: neighborIdx, distance: currentDistance + 1 });
            }
        }

        bfsHelper(q, endIdx, prev, visited, currentDistance, iterationCount + 1);
    }, selectedValue);
}

// BFS 함수 //

// DFS 함수 //

const dfs = () => {
    running = true;
    const startId = $('td[class=start]').attr('id').split('-');
    const endId = $('td[class=end]').attr('id').split('-');
    const startIdx = get1DIdx(parseInt(startId[0]), parseInt(startId[1]));
    const endIdx = get1DIdx(parseInt(endId[0]), parseInt(endId[1]));
    const prev = new Array(rows * cols);
    const visited = new Array(rows * cols);
    for (let i = 0; i < prev.length; ++i) {
        prev[i] = i;
        visited[i] = false;
    }
    const stack = [];
    stack.push({ node: startIdx, distance: 0 });
    dfsHelper(stack, endIdx, prev, visited, 0, 0);

}

const dfsHelper = (stack, endIdx, prev, visited, distance = 0, iterationCount = 0) => {
    setTimeout(() => {
        // 일시정지 상태 확인
        if (stopCondition) {
            // 일시정지 상태에서 재생 버튼이 클릭될 때까지 대기
            const pauseInterval = setInterval(() => {
                if (!stopCondition) {
                    clearInterval(pauseInterval);
                    dfsHelper = (stack, endIdx, prev, visited, distance = 0, iterationCount = 0);
                }
            }, 100); // 매 100ms마다 체크
            return;
        }

        if (stack.length == 0) {
            running = false;
            
            return;
        }
        const { node, distance: currentDistance } = stack.pop();
        const row = Math.floor(node / cols);
        const col = node % cols;
        $(`td[id=${row}-${col}]`).addClass('visited');
        if (visited[get1DIdx(row, col)]) {
            dfsHelper(stack, endIdx, prev, visited, distance, iterationCount);
            return;
        }
        visited[node] = true;
        if (node == endIdx) {
            animatePath(prev, node);
            $('#nodesVisited').html('<strong>탐색한 거리:&nbsp</strong>' + (distance+1) + '&nbsp&nbsp<strong>반복 횟수: </strong>' + iterationCount).show();
            return;
        }

        const neighbors = [
            { r: row - 1, c: col },
            { r: row, c: col + 1 },
            { r: row + 1, c: col },
            { r: row, c: col - 1 }
        ];

        for (const neighbor of neighbors) {
            const { r, c } = neighbor;
            if (r >= 0 && r < rows && c >= 0 && c < cols && cells[r][c] != 1 && !visited[get1DIdx(r, c)]) {
                const neighborIdx = get1DIdx(r, c);
                prev[neighborIdx] = node;
                stack.push({ node: neighborIdx, distance: currentDistance + 1 });
            }
        }

        dfsHelper(stack, endIdx, prev, visited, currentDistance, iterationCount + 1);
    }, selectedValue);
}

// DFS 함수 //

const animatePath = (prev, end) => {
    const stack = [];
    let current = end;
    while (prev[current] != current) {
        stack.push(current);
        current = prev[current];
    }
    stack.push(current);
    animatePathHelper(stack);
}

const animatePathHelper = (stack, prev) => {
    setTimeout(() => {
        if (stack.length == 0) {
            running = false;
            
            return;
        }
        const current = stack.pop();
        const row = Math.floor(current / cols);
        const col = current % cols;
        $(`td[id=${row}-${col}]`).addClass('path');
        animatePathHelper(stack, current);
    }, 50);

}

const addEventListeners = () => {
    let mouseDown = false;

    // 마우스가 보드 밖으로 나갔을 때
    $('div#board').on('mouseleave', () => {
        mouseDown = false;
    });

    // 셀에 대한 마우스 이벤트
    $('td[id]').on({
        mousedown: (e) => {
            if (!running) {
                mouseDown = true;
                updateCell(e.target);
            }
        },
        mouseup: () => {
            mouseDown = false;
        },
        mouseenter: (e) => {
            if (mouseDown && !running) {
                updateCell(e.target);
            }
        }
    });
};


// 셀 업데이트 함수
function updateCell(cell) {
    let id = cell.id.split('-');
    let row = id[0];
    let col = id[1];
    let classList = cell.className.split(/\s+/);

    if (classList.length == 0 || (!classList.includes('start') && !classList.includes('end'))) {
        if (!cell.classList.contains('weight')) {
            cell.classList.remove('path', 'visited');
            cell.classList.toggle('wall');
        }
        cells[row][col] = cell.classList.contains('wall') ? 1 : 0;
    }
}



//MISC functions & classes
const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const get1DIdx = (row, col) => {
    return row * cols + col;
}

const getManhattanDistance = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

