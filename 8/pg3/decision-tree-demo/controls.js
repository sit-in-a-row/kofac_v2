function init() {

    var canv = document.getElementById('goalStatus');
    var currentCanvas = document.getElementById('currentCanvas');
    var clearBtn = document.getElementById('clearBtn');
    var context = canv.getContext('2d');
    var displayTreeDiv = document.getElementById('displayTree');

    var NOT_SELECTED_COLOR_STYLE = '2px solid white';
    var SELECTED_COLOR_STYLE = '2px solid black';
    var colorSelectElements = document.getElementsByClassName('color-select');
    for (var i = 0; i < colorSelectElements.length; i++) {
        colorSelectElements[i].style.backgroundColor = colorSelectElements[i].getAttribute('label');
        colorSelectElements[i].style.border = NOT_SELECTED_COLOR_STYLE;
    }

    var POINT_RADIUS = 7;
    var points = [];
    var tree = null;
    var MAX_ALPHA = 128;
    var newCanvasWidth = 200;
    var newCanvasHeight = 200;
    var genDataBtn = document.getElementById('genDataBtn');
    // var inputText = null;
    var isHorizontalSplit;

    var coorSelect = document.getElementById('coorSelect');
    var textInput = document.getElementById('textInput');
    var conditionSelect = document.getElementById('conditionSelect1-1');
    var confirmButton = document.getElementById('confirm');

    var coorSelect2_1 = document.getElementById('coorSelect2-1');
    var textInput2_1 = document.getElementById('textInput2-1');
    var conditionSelect2_1 = document.getElementById('conditionSelect2-1');
    var confirmButton2_1 = document.getElementById('confirm2-1');
    var treeLeaf2_1 = document.getElementById('treeLeaf2-1');

    var coorSelect2_2 = document.getElementById('coorSelect2-2');
    var textInput2_2 = document.getElementById('textInput2-2');
    var conditionSelect2_2 = document.getElementById('conditionSelect2-2');
    var confirmButton2_2 = document.getElementById('confirm2-2');
    var treeLeaf2_2 = document.getElementById('treeLeaf2-2');

    var coorSelect3_1 = document.getElementById('coorSelect3-1');
    var textInput3_1 = document.getElementById('textInput3-1');
    var conditionSelect3_1 = document.getElementById('conditionSelect3-1');
    var confirmButton3_1 = document.getElementById('confirm3-1');
    var treeLeaf3_1 = document.getElementById('treeLeaf3-1');

    var coorSelect3_2 = document.getElementById('coorSelect3-2');
    var textInput3_2 = document.getElementById('textInput3-2');
    var conditionSelect3_2 = document.getElementById('conditionSelect3-2');
    var confirmButton3_2 = document.getElementById('confirm3-2');
    var treeLeaf3_2 = document.getElementById('treeLeaf3-2');

    var coorSelect3_3 = document.getElementById('coorSelect3-3');
    var textInput3_3 = document.getElementById('textInput3-3');
    var conditionSelect3_3 = document.getElementById('conditionSelect3-3');
    var confirmButton3_3 = document.getElementById('confirm3-3');
    var treeLeaf3_3 = document.getElementById('treeLeaf3-3');

    var coorSelect3_4 = document.getElementById('coorSelect3-4');
    var textInput3_4 = document.getElementById('textInput3-4');
    var conditionSelect3_4 = document.getElementById('conditionSelect3-4');
    var confirmButton3_4 = document.getElementById('confirm3-4');
    var treeLeaf3_4 = document.getElementById('treeLeaf3-4');

    var coor2_1;
    var coor2_2;

    var coor3_1;
    var coor3_2;
    var coor3_3;
    var coor3_4;

    canv.width = newCanvasWidth;
    canv.height = newCanvasHeight;
    currentCanvas.width = newCanvasWidth;
    currentCanvas.height = newCanvasHeight;

    function setCoordinates(startX, endX, startY, endY, inputNum, buttonID) {
        switch (buttonID) {
            case '1_1':
                console.log('선택좌표 확인', coorSelect.value);
                if (coorSelect.value === 'selectY') {
                    // Y축 기준으로 분할
                    coor2_1 = { StartX: 0, EndX: currentCanvas.width, StartY: 0, EndY: inputNum };
                    coor2_2 = { StartX: 0, EndX: currentCanvas.width, StartY: inputNum, EndY: currentCanvas.height };
                } else {
                    // X축 기준으로 분할
                    coor2_1 = { StartX: 0, EndX: inputNum, StartY: 0, EndY: currentCanvas.height };
                    coor2_2 = { StartX: inputNum, EndX: currentCanvas.width, StartY: 0, EndY: currentCanvas.height };
                }
                break;

            case '2_1':
                console.log('선택좌표 확인 2_1', coorSelect2_1.value);
                if (coorSelect2_1.value === 'selectY') {
                    // Y축 기준으로 분할
                    coor3_1 = { StartX: coor2_1.StartX, EndX: coor2_1.EndX, StartY: coor2_1.StartY, EndY: inputNum };
                    coor3_2 = { StartX: coor2_1.StartX, EndX: coor2_1.EndX, StartY: inputNum, EndY: coor2_1.EndY };
                } else {
                    // X축 기준으로 분할
                    coor3_1 = { StartX: coor2_1.StartX, EndX: inputNum, StartY: coor2_1.StartY, EndY: coor2_1.EndY };
                    coor3_2 = { StartX: inputNum, EndX: coor2_1.EndX, StartY: coor2_1.StartY, EndY: coor2_1.EndY };
                }
                break;

            case '2_2':
                coor3_3 = { StartX: startX, EndX: endX, StartY: startY, EndY: endY };
                coor3_4 = { StartX: endX, EndX: currentCanvas.width, StartY: startY, EndY: currentCanvas.height };
                break;
            case '3_1':
                coor4_1 = { StartX: startX, EndX: endX, StartY: startY, EndY: endY };
                coor4_2 = { StartX: endX, EndX: currentCanvas.width, StartY: startY, EndY: currentCanvas.height };
            case '3_2':
                coor4_3 = { StartX: startX, EndX: endX, StartY: startY, EndY: endY };
                coor4_4 = { StartX: endX, EndX: currentCanvas.width, StartY: startY, EndY: currentCanvas.height };
            case '3_3':
                coor4_5 = { StartX: startX, EndX: endX, StartY: startY, EndY: endY };
                coor4_6 = { StartX: endX, EndX: currentCanvas.width, StartY: startY, EndY: currentCanvas.height };
            case '3_4':
                coor4_7 = { StartX: startX, EndX: endX, StartY: startY, EndY: endY };
                coor4_8 = { StartX: endX, EndX: currentCanvas.width, StartY: startY, EndY: currentCanvas.height };
                break;

            default:
                // 기본 동작 또는 오류 처리
        }
    }
    
    // function getNextCoor(inputNum, isHorizontalSplit, buttonID) {
    //     // if (isHorizontalSplit) {
    //     //     setCoordinates(0, inputNum, 0, currentCanvas.height, inputNum, buttonID);
    //     // } else {
    //     //     setCoordinates(0, currentCanvas.width, 0, inputNum, inputNum, buttonID);
    //     // }

    // }

    function generateRandomNumbers() {
        clearCanvasListener();
        var colorOptions = [{
                color: '#002073',
                count: 50
            },
            {
                color: '#FD2626',
                count: 50
            }
        ];

        for (var i = 0; i < 10; i++) {
            var x = Math.floor(Math.random() * canv.width);
            var y = Math.floor(Math.random() * canv.height);

            var randomColorIndex;
            do {
                randomColorIndex = Math.floor(Math.random() * colorOptions.length);
            } while (colorOptions[randomColorIndex].count <= 0);

            var selectedColor = colorOptions[randomColorIndex].color;
            colorOptions[randomColorIndex].count--;

            drawCircle(context, x, y, POINT_RADIUS, selectedColor);
            points.push({
                x: x,
                y: y,
                color: selectedColor
            });
        }
        console.log("Generated points:", points);
        buildAndDisplayTree();
    }

    function displayGoalStatusPredictions() {
        goalStatus.width = newCanvasWidth;
        goalStatus.height = newCanvasHeight;

        var goalStatusContext = goalStatus.getContext('2d');
        goalStatusContext.clearRect(0, 0, newCanvasWidth, newCanvasHeight);

        var currentCanvasContext = currentCanvas.getContext('2d');

        var imageData = goalStatusContext.getImageData(0, 0, newCanvasWidth, newCanvasHeight);

        for (var x = 0; x < newCanvasWidth; x++) {
            for (var y = 0; y < newCanvasHeight; y++) {
                var predictedHexColor = tree.predict({
                    x: x,
                    y: y
                });
                putPixel(imageData, newCanvasWidth, x, y, predictedHexColor, MAX_ALPHA);
            }
        }

        goalStatusContext.putImageData(imageData, 0, 0);

        for (var p in points) {
            drawCircle(goalStatusContext, points[p].x, points[p].y, POINT_RADIUS, points[p].color);
        }

        currentCanvasContext.clearRect(0, 0, newCanvasWidth, newCanvasHeight);
        for (var p in points) {
            drawCircle(currentCanvasContext, points[p].x, points[p].y, POINT_RADIUS, points[p].color);
        }
    }


    function displayCurrentCanvasPoints() {
        currentCanvas.width = newCanvasWidth;
        currentCanvas.height = newCanvasHeight;

        var context = currentCanvas.getContext('2d');
        context.clearRect(0, 0, newCanvasWidth, newCanvasHeight);

        for (var p in points) {
            drawCircle(context, points[p].x, points[p].y, POINT_RADIUS, points[p].color);
        }
    }

    function buildAndDisplayTree() {
        if (points.length > 0) {
            var threshold = Math.floor(points.length / 100);
            threshold = (threshold > 1) ? threshold : 1;

            tree = new dt.DecisionTree({
                trainingSet: points,
                categoryAttr: 'color',
                minItemsCount: threshold
            });

            displayCurrentCanvasPoints();
            displayGoalStatusPredictions();
        }
    }

    // 가장 가까운 포인트 찾는 함수
    function findClosestPoint(points, x, y) {
        var minDist = Infinity;
        var closestPoint = null;

        points.forEach(function(point) {
            var dist = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
            if (dist < minDist) {
                minDist = dist;
                closestPoint = point;
            }
        });

        return closestPoint;
    }

    for (var i = 0; i < colorSelectElements.length; i++) {
        colorSelectElements[i].addEventListener('click', selectColorListener, false);
    }

    function drawCircle(context, x, y, radius, hexColor) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);

        var c = hexToRgb(hexColor)
        context.fillStyle = 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';

        context.fill();
        context.closePath();
        context.stroke();
    }

    function putPixel(imageData, width, x, y, hexColor, alpha) {
        var c = hexToRgb(hexColor);
        var indx = (y * width + x) * 4;

        var currAlpha = imageData.data[indx + 3];

        imageData.data[indx + 0] = (c.r * alpha + imageData.data[indx + 0] * currAlpha) / (alpha + currAlpha);
        imageData.data[indx + 1] = (c.g * alpha + imageData.data[indx + 1] * currAlpha) / (alpha + currAlpha);
        imageData.data[indx + 2] = (c.b * alpha + imageData.data[indx + 2] * currAlpha) / (alpha + currAlpha);
        imageData.data[indx + 3] = alpha + currAlpha;
    }

    function selectColorListener(event) {
        color = this.getAttribute('label');

        for (var i = 0; i < colorSelectElements.length; i++) {
            colorSelectElements[i].style.border = NOT_SELECTED_COLOR_STYLE;
        }

        this.style.border = SELECTED_COLOR_STYLE;
    }

    function clearCanvasListener(event) {
        context.clearRect(0, 0, canv.width, canv.height);
        var currentContext = currentCanvas.getContext('2d');
        currentContext.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
        points = [];
        displayTreeDiv.innerHTML = '';
    
        // notifyCoor 요소의 투명도를 0으로 설정
        notifyCoor.style.opacity = 0;
    
        // treeLeaf 요소들의 투명도를 0으로 설정
        document.getElementById('treeLeaf2-1').style.opacity = 0;
        document.getElementById('treeLeaf2-2').style.opacity = 0;
        document.getElementById('treeLeaf3-1').style.opacity = 0;
        document.getElementById('treeLeaf3-2').style.opacity = 0;
        document.getElementById('treeLeaf3-3').style.opacity = 0;
        document.getElementById('treeLeaf3-4').style.opacity = 0;
    
        // 모든 <input> 요소들의 값을 0으로 설정
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function(input) {
            if (input.type === 'number' || input.type === 'text') {
                input.value = '';
            }
        });
    }
    
    /**
     * Taken from: http://stackoverflow.com/a/5624139/653511
     */
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function updateCanvasBackgroundColor(canvas, region1Color, region2Color, splitCoordinate, isHorizontalSplit, startX, startY, endX, endY) {
        var context = canvas.getContext('2d');
        context.clearRect(startX, startY, endX - startX, endY - startY);
    
        // 영역 1에 대한 배경색 적용
        context.fillStyle = region1Color;
        if (isHorizontalSplit) {
            context.fillRect(startX, startY, endX - startX, splitCoordinate - startY);
        } else {
            context.fillRect(startX, startY, splitCoordinate - startX, endY - startY);
        }
    
        // 영역 2에 대한 배경색 적용
        context.fillStyle = region2Color;
        if (isHorizontalSplit) {
            context.fillRect(startX, splitCoordinate, endX - startX, endY - splitCoordinate);
        } else {
            context.fillRect(splitCoordinate, startY, endX - splitCoordinate, endY - startY);
        }
    
        // 기존 포인트 다시 그리기
        points.forEach(point => {
            if (point.x >= startX && point.x < endX && point.y >= startY && point.y < endY) {
                drawCircle(context, point.x, point.y, POINT_RADIUS, point.color);
            }
        });
    
        // CSS 클래스에 대한 테두리 색상 업데이트
        updateBorderColor('.tree_true', region1Color);
        updateBorderColor('.tree_false', region2Color);
    }
    
    function updateBorderColor(className, color) {
        var elements = document.querySelectorAll(className);
        elements.forEach(element => {
            element.style.border = `1px solid ${color}`;
        });
    }

    function checkHorizontalSplit (selectedCoor) {
        if (selectedCoor === 'selectX') {
            selectedCoor = 'x';
            isHorizontalSplit = false;
        } else if (selectedCoor === 'selectY') {
            selectedCoor = 'y';
            isHorizontalSplit = true;
        }
        return isHorizontalSplit;
    }

    function processButtonClick(region1Color, region2Color, coorSelect, textInput, conditionSelect, nextCoor, currentCanvas, canv, points, isHorizontalSplit) {
        var selectedCoor = coorSelect.value;
        var inputText = textInput.value;
        var selectedCondition = conditionSelect.value;
        console.log('selectedCoor', selectedCoor);

        isHorizontalSplit = checkHorizontalSplit(selectedCoor);
    
        if (selectedCondition === 'selectGreater') {
            selectedCondition = '>';
        } else if (selectedCondition === 'selectGreaterOrEqual') {
            selectedCondition = '>=';
        } else if (selectedCondition === 'selectSmaller') {
            selectedCondition = '<';
        } else {
            selectedCondition = '<=';
        }
    
        // var conditionExpression = selectedCoor + ' ' + selectedCondition + ' ' + inputText;
    
        console.log('선택된 좌표:', selectedCoor);
        console.log('입력된 값:', inputText);
        console.log('선택된 조건:', selectedCondition);

        var splitCoordinate = parseInt(inputText);
    
        var startX, startY, endX, endY;
    
        if (nextCoor) {
            startX = nextCoor.StartX;
            startY = nextCoor.StartY;
            endX = nextCoor.EndX;
            endY = nextCoor.EndY;
        } else {
            startX = 0;
            startY = 0;
            endX = canv.width;
            endY = canv.height;
        }

        updateCanvasBackgroundColor(currentCanvas, region1Color, region2Color, splitCoordinate, isHorizontalSplit, startX, startY, endX, endY);

        return {
            currentCanvas: currentCanvas,

            splitCoordinate: splitCoordinate,
            isHorizontalSplit: isHorizontalSplit,
            selectedCondition: selectedCondition,
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY
        };
    }

    // notifyCoor의 위치를 설정하는 함수
    function setNotifyCoorPosition(point, rect) {
        // 위치를 설정하기 전에 잠시 대기하여 요소의 크기가 정확하게 계산되도록 함
        setTimeout(function() {
            var top = point.y + rect.top - notifyCoor.offsetHeight - 10; // 10은 간격 조절용
            var left = point.x + rect.left - notifyCoor.offsetWidth / 2;

            notifyCoor.style.top = top + "px";
            notifyCoor.style.left = left + "px";
            notifyCoor.style.opacity = 1; // 요소를 보이게 함
        }, 0);
    }
    
    genDataBtn.addEventListener('click', generateRandomNumbers);

    clearBtn.addEventListener('click', clearCanvasListener, false);

    // HTML에서 notifyCoor div 요소를 찾습니다.
    var notifyCoor = document.getElementById('notifyCoor');


    // notifyCoor 요소에 클릭 이벤트 리스너 추가
    notifyCoor.addEventListener('click', function() {
        this.style.opacity = 0; // 요소를 숨김
    });

    // 캔버스 클릭 이벤트 리스너
    canv.addEventListener('click', function(e) {
        var rect = canv.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var closestPoint = findClosestPoint(points, x, y);
        if (closestPoint) {
            notifyCoor.innerHTML = "x = " + closestPoint.x + ", y = " + closestPoint.y;
            setNotifyCoorPosition(closestPoint, rect);
        } else {
            notifyCoor.innerHTML = "좌표 확인 불가";
            setNotifyCoorPosition({ x: x, y: y }, rect);
        }
    })

    // 캔버스 클릭 이벤트 리스너
    currentCanvas.addEventListener('click', function(e) {
        var rect = currentCanvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var closestPoint = findClosestPoint(points, x, y);
        if (closestPoint) {
            notifyCoor.innerHTML = "x = " + closestPoint.x + ", y = " + closestPoint.y;
            setNotifyCoorPosition(closestPoint, rect);
        } else {
            notifyCoor.innerHTML = "좌표 확인 불가";
            setNotifyCoorPosition({ x: x, y: y }, rect);
        }
    })

    confirmButton.addEventListener('click', function() {
        var coorInfo = processButtonClick(region1Color, region2Color, coorSelect, textInput, conditionSelect, null, currentCanvas, canv, points);
        var inputNum = parseInt(textInput.value); 
        var startX = coorInfo.startX;
        var startY = coorInfo.startY;
        var endX = coorInfo.endX;
        var endY = coorInfo.endY;
        var condition = conditionSelect.value;

        if (condition === 'selectGreater') {
            condition = '>';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition === 'selectGreaterOrEqual') {
            condition = '>=';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition === 'selectSmaller') {
            condition = '<';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        } else {
            condition = '<=';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        }

        if (inputNum < newCanvasWidth) {
            setCoordinates(startX, endX, startY, endY, inputNum, '1_1');
            processButtonClick(region1Color, region2Color, coorSelect, textInput, conditionSelect, null, currentCanvas, canv, points);
            treeLeaf2_1.style.opacity = 1;
            treeLeaf2_2.style.opacity = 1;
        }
        else {
            alert("올바른 조건식 입력"); 
        }
    });

    confirmButton2_1.addEventListener('click', function() {
        var inputNum = parseInt(textInput.value); 
        var inputNum2_1 = parseInt(textInput2_1.value);
        var condition2_1 = conditionSelect2_1.value;
        var prevCoor = coorSelect.value;
        var currentCoor = coorSelect2_1.value;

        if (condition2_1 === 'selectGreater') {
            condition2_1 = '>';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition2_1 === 'selectGreaterOrEqual') {
            condition2_1 = '>=';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition2_1 === 'selectSmaller') {
            condition2_1 = '<';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        } else {
            condition2_1 = '<=';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        }

        let evaluateExpression = inputNum + ' ' + condition2_1 + ' ' + inputNum2_1;
        if (prevCoor === currentCoor) {
            var result = eval(evaluateExpression);
        }
        else {
            var result = true;
        }
        
        console.log('조건식 확인', evaluateExpression);

        if (result) {
            var coorInfo = processButtonClick(region1Color, region2Color, coorSelect2_1, textInput2_1, conditionSelect2_1, coor2_1, currentCanvas, canv, points);
            var startX = coorInfo.startX;
            var startY = coorInfo.startY;
            var endX = coorInfo.endX;
            var endY = coorInfo.endY;
            setCoordinates(startX, endX, startY, endY, inputNum2_1, '2_1');
            console.log('좌표 확인:', startX, endX, startY, endY);
            treeLeaf3_1.style.opacity = 1;
            treeLeaf3_2.style.opacity = 1;
        }
        else {
            alert("올바른 조건식 입력"); 
        }

    });

    confirmButton2_2.addEventListener('click', function() {
        var inputNum = parseInt(textInput.value); 
        var inputNum2_2 = parseInt(textInput2_2.value);
        var condition2_2 = conditionSelect2_2.value;
        var prevCoor = coorSelect.value;
        var currentCoor = coorSelect2_2.value;

        if (condition2_2 === 'selectGreater') {
            condition2_2 = '>';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition2_2 === 'selectGreaterOrEqual') {
            condition2_2 = '>=';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition2_2 === 'selectSmaller') {
            condition2_2 = '<';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        } else {
            condition2_2 = '<=';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        }

        let evaluateExpression = inputNum + ' ' + condition2_2 + ' ' + inputNum2_2;
        if (prevCoor === currentCoor) {
            var result = eval(evaluateExpression);
        }
        else {
            var result = null;
        }
        
        console.log('2-2 조건식 확인', evaluateExpression);

        if (result === null || result === false) {
            var coorInfo = processButtonClick(region1Color, region2Color, coorSelect2_2, textInput2_2, conditionSelect2_2, coor2_2, currentCanvas, canv, points);
            var startX = coorInfo.startX;
            var startY = coorInfo.startY;
            var endX = coorInfo.endX;
            var endY = coorInfo.endY;
            setCoordinates(startX, endX, startY, endY, inputNum2_2, '2_2');
            console.log('좌표 확인:', startX, endX, startY, endY);
            treeLeaf3_3.style.opacity = 1;
            treeLeaf3_4.style.opacity = 1;
        }
        else {
            alert("올바른 조건식 입력"); 
        }

    });

    confirmButton3_1.addEventListener('click', function() {
        var inputNum2_1 = parseInt(textInput2_1.value); //이전 input
        var inputNum3_1 = parseInt(textInput3_1.value);
        var condition3_1 = conditionSelect3_1.value;
        var prevCoor = coorSelect2_1.value; //이전 좌표
        var currentCoor = coorSelect3_1.value;

        if (condition3_1 === 'selectGreater') {
            condition3_1 = '>';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition3_1 === 'selectGreaterOrEqual') {
            condition3_1 = '>=';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition3_1 === 'selectSmaller') {
            condition3_1 = '<';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        } else {
            condition3_1 = '<=';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        }

        let evaluateExpression = inputNum2_1 + ' ' + condition3_1 + ' ' + inputNum3_1; //이전 input
        if (prevCoor === currentCoor) {
            var result = eval(evaluateExpression);
        }
        else {
            var result = true;
        }
        
        console.log('조건식 확인', evaluateExpression);

        if (result) {
            var coorInfo = processButtonClick(region1Color, region2Color, coorSelect3_1, textInput3_1, conditionSelect3_1, coor3_1, currentCanvas, canv, points);
            var startX = coorInfo.startX;
            var startY = coorInfo.startY;
            var endX = coorInfo.endX;
            var endY = coorInfo.endY;
            setCoordinates(startX, endX, startY, endY, inputNum3_1, '3_1');
            console.log('좌표 확인:', startX, endX, startY, endY);
        }
        else {
            alert("올바른 조건식 입력"); 
        }
    });

    confirmButton3_2.addEventListener('click', function() {
        var inputNum2_1 = parseInt(textInput.value2_1); //이전 input
        var inputNum3_2 = parseInt(textInput3_2.value);
        var condition3_2 = conditionSelect3_2.value;
        var prevCoor = coorSelect2_1.value; //이전 좌표
        var currentCoor = coorSelect3_2.value;

        if (condition3_2 === 'selectGreater') {
            condition3_2 = '>';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition3_2 === 'selectGreaterOrEqual') {
            condition3_2 = '>=';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition3_2 === 'selectSmaller') {
            condition3_2 = '<';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        } else {
            condition3_2 = '<=';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        }

        let evaluateExpression = inputNum2_1 + ' ' + condition3_2 + ' ' + inputNum3_2; //이전 input
        if (prevCoor === currentCoor) {
            var result = eval(evaluateExpression);
        }
        else {
            var result = null;
        }
        
        console.log('조건식 확인', evaluateExpression);

        if (result === null || result === false) {
            var coorInfo = processButtonClick(region1Color, region2Color, coorSelect3_2, textInput3_2, conditionSelect3_2, coor3_2, currentCanvas, canv, points);
            var startX = coorInfo.startX;
            var startY = coorInfo.startY;
            var endX = coorInfo.endX;
            var endY = coorInfo.endY;
            setCoordinates(startX, endX, startY, endY, inputNum3_2, '3_2');
            console.log('좌표 확인:', startX, endX, startY, endY);
        }
        else {
            alert("올바른 조건식 입력"); 
        }
    });

    confirmButton3_3.addEventListener('click', function() {
        var inputNum2_2 = parseInt(textInput2_2.value); //이전 input
        var inputNum3_3 = parseInt(textInput3_3.value);
        var condition3_3 = conditionSelect3_3.value;
        var prevCoor = coorSelect2_2.value; //이전 좌표
        var currentCoor = coorSelect3_3.value;

        if (condition3_3 === 'selectGreater') {
            condition3_3 = '>';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition3_3 === 'selectGreaterOrEqual') {
            condition3_3 = '>=';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition3_3 === 'selectSmaller') {
            condition3_3 = '<';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        } else {
            condition3_3 = '<=';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        }

        let evaluateExpression = inputNum2_2 + ' ' + condition3_3 + ' ' + inputNum3_3; //이전 input
        if (prevCoor === currentCoor) {
            var result = eval(evaluateExpression);
        }
        else {
            var result = true;
        }
        
        console.log('조건식 확인', evaluateExpression);

        if (result) {
            var coorInfo = processButtonClick(region1Color, region2Color, coorSelect3_3, textInput3_3, conditionSelect3_3, coor3_3, currentCanvas, canv, points);
            var startX = coorInfo.startX;
            var startY = coorInfo.startY;
            var endX = coorInfo.endX;
            var endY = coorInfo.endY;
            setCoordinates(startX, endX, startY, endY, inputNum3_3, '3_3');
        }
        else {
            alert("올바른 조건식 입력"); 
        }
    });

    confirmButton3_4.addEventListener('click', function() {
        var inputNum2_2 = parseInt(textInput2_2.value); //이전 input
        var inputNum3_4 = parseInt(textInput3_4.value);
        var condition3_4 = conditionSelect3_4.value;
        var prevCoor = coorSelect2_2.value; //이전 좌표
        var currentCoor = coorSelect3_4.value;

        if (condition3_4 === 'selectGreater') {
            condition3_4 = '>';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition3_4 === 'selectGreaterOrEqual') {
            condition3_4 = '>=';
            var region1Color = '#FE9292'
            var region2Color = '#7F8FB9'
        } else if (condition3_4 === 'selectSmaller') {
            condition3_4 = '<';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        } else {
            condition3_4 = '<=';
            var region1Color = '#7F8FB9'
            var region2Color = '#FE9292'
        }

        let evaluateExpression = inputNum2_2 + ' ' + condition3_4 + ' ' + inputNum3_4; //이전 input
        if (prevCoor === currentCoor) {
            var result = eval(evaluateExpression);
        }
        else {
            var result = null;
        }
        
        console.log('조건식 확인', evaluateExpression);

        if (result === null || result === false) {
            var coorInfo = processButtonClick(region1Color, region2Color, coorSelect3_4, textInput3_4, conditionSelect3_4, coor3_4, currentCanvas, canv, points);
            var startX = coorInfo.startX;
            var startY = coorInfo.startY;
            var endX = coorInfo.endX;
            var endY = coorInfo.endY;
            setCoordinates(startX, endX, startY, endY, inputNum3_4, '3_4');
        }
        else {
            alert("올바른 조건식 입력"); 
        }
    });
} 