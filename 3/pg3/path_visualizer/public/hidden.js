const dijkstra = () => {
    running = true;
    const startId = $('td[class=start]').attr('id').split('-');
    const endId = $('td[class=end]').attr('id').split('-');
    const startIdx = get1DIdx(parseInt(startId[0]), parseInt(startId[1]));
    const endIdx = get1DIdx(parseInt(endId[0]), parseInt(endId[1]));

    const dis = new Array(rows * cols);
    const visited = new Array(rows * cols);
    const prev = new Array(rows * cols);
    for (let i = 0; i < dis.length; ++i) {
        dis[i] = 1e9;
        visited[i] = false;
        prev[i] = i;
    }

    const tmp = [];
    tmp.push({ idx: startIdx, weight: 0 });
    dis[startIdx] = 0;

    let visitedNodes = 0;
    let iterationCount = 0;

    dijkstraHelper(tmp, endIdx, dis, visited, prev, visitedNodes, iterationCount);
}

const dijkstraHelper = (tmp, endIdx, dis, visited, prev, visitedNodes, iterationCount, distance = 0) => {
    setTimeout(() => {
        if (tmp.length == 0) {
            toggleButtons();
            running = false;

            return;
        }

        let minIdx = 0;
        tmp.forEach((item, i) => {
            if (item.weight < tmp[minIdx].weight) {
                minIdx = i;
            }
        });

        const current = tmp.splice(minIdx, 1)[0];

        if (visited[current.idx]) {
            dijkstraHelper(tmp, endIdx, dis, visited, prev, visitedNodes, iterationCount, distance);
            return;
        }

        visited[current.idx] = true;
        visitedNodes++;
        const row = Math.floor(current.idx / cols);
        const col = current.idx % cols;
        $(`td[id=${row}-${col}]`).addClass('visited');

        if (current.idx == endIdx) {
            console.log(`Found a path of ${dis[endIdx]} nodes`);
            animatePath(prev, current.idx);
            $('#nodesVisited').html('<strong>탐색한 거리:</strong>&nbsp' + (dis[endIdx]+1) + '&nbsp&nbsp<strong>반복 횟수:</strong>&nbsp' + iterationCount).show();
            return;
        }

        if (row > 0 && cells[row - 1][col] != 1 && dis[get1DIdx(row - 1, col)] > dis[current.idx] + ($(`td[id=${row - 1}-${col}]`).hasClass('weight') ? 20 : 1)) {
            dis[get1DIdx(row - 1, col)] = dis[current.idx] + ($(`td[id=${row - 1}-${col}]`).hasClass('weight') ? 20 : 1);
            prev[get1DIdx(row - 1, col)] = current.idx;
            tmp.push({ idx: get1DIdx(row - 1, col), weight: dis[get1DIdx(row - 1, col)] });
        }
        if (col < cols - 1 && cells[row][col + 1] != 1 && dis[get1DIdx(row, col + 1)] > dis[current.idx] + ($(`td[id=${row}-${col + 1}]`).hasClass('weight') ? 20 : 1)) {
            dis[get1DIdx(row, col + 1)] = dis[current.idx] + ($(`td[id=${row}-${col + 1}]`).hasClass('weight') ? 20 : 1);
            prev[get1DIdx(row, col + 1)] = current.idx;
            tmp.push({ idx: get1DIdx(row, col + 1), weight: dis[get1DIdx(row, col + 1)] });
        }
        if (row < rows - 1 && cells[row + 1][col] != 1 && dis[get1DIdx(row + 1, col)] > dis[current.idx] + ($(`td[id=${row + 1}-${col}]`).hasClass('weight') ? 20 : 1)) {
            dis[get1DIdx(row + 1, col)] = dis[current.idx] + ($(`td[id=${row + 1}-${col}]`).hasClass('weight') ? 20 : 1);
            prev[get1DIdx(row + 1, col)] = current.idx;
            tmp.push({ idx: get1DIdx(row + 1, col), weight: dis[get1DIdx(row + 1, col)] });
        }
        if (col > 0 && cells[row][col - 1] != 1 && dis[get1DIdx(row, col - 1)] > dis[current.idx] + ($(`td[id=${row}-${col - 1}]`).hasClass('weight') ? 20 : 1)) {
            dis[get1DIdx(row, col - 1)] = dis[current.idx] + ($(`td[id=${row}-${col - 1}]`).hasClass('weight') ? 20 : 1);
            prev[get1DIdx(row, col - 1)] = current.idx;
            tmp.push({ idx: get1DIdx(row, col - 1), weight: dis[get1DIdx(row, col - 1)] });
        }

        iterationCount++;
        console.log(`Algorithm completed in ${iterationCount} iterations, visited ${dis[endIdx]} nodes`);
   
        dijkstraHelper(tmp, endIdx, dis, visited, prev, visitedNodes, iterationCount, distance + 1);
    }, 20);
}
