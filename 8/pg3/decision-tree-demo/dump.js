var coorSelect2_1 = document.getElementById('coorSelect2-1');
var textInput2_1 = document.getElementById('textInput2-1');
var conditionSelect2_1 = document.getElementById('conditionSelect2-1');
var confirmButton2_1 = document.getElementById('confirm2-1');

var coorSelect2_2 = document.getElementById('coorSelect2-2');
var textInput2_2 = document.getElementById('textInput2-2');
var conditionSelect2_2 = document.getElementById('conditionSelect2-2');
var confirmButton2_2 = document.getElementById('confirm2-2');

var coorSelect3_1 = document.getElementById('coorSelect3-1');
var textInput3_1 = document.getElementById('textInput3-1');
var conditionSelect3_1 = document.getElementById('conditionSelect3-1');
var confirmButton3_1 = document.getElementById('confirm3-1');

var coorSelect3_2 = document.getElementById('coorSelect3-2');
var textInput3_2 = document.getElementById('textInput3-2');
var conditionSelect3_2 = document.getElementById('conditionSelect3-2');
var confirmButton3_2 = document.getElementById('confirm3-2');

var coorSelect3_3 = document.getElementById('coorSelect3-3');
var textInput3_3 = document.getElementById('textInput3-3');
var conditionSelect3_3 = document.getElementById('conditionSelect3-3');
var confirmButton3_3 = document.getElementById('confirm3-3');

var coorSelect3_4 = document.getElementById('coorSelect3-4');
var textInput3_4 = document.getElementById('textInput3-4');
var conditionSelect3_4 = document.getElementById('conditionSelect3-4');
var confirmButton3_4 = document.getElementById('confirm3-4');

var coorSelect4_1 = document.getElementById('coorSelect4-1');
var textInput4_1 = document.getElementById('textInput4-1');
var conditionSelect4_1 = document.getElementById('conditionSelect4-1');
var confirmButton4_1 = document.getElementById('confirm4-1');

var coorSelect4_2 = document.getElementById('coorSelect4-2');
var textInput4_2 = document.getElementById('textInput4-2');
var conditionSelect4_2 = document.getElementById('conditionSelect4-2');
var confirmButton4_2 = document.getElementById('confirm4-2');

var coorSelect4_3 = document.getElementById('coorSelect4-3');
var textInput4_3 = document.getElementById('textInput4-3');
var conditionSelect4_3 = document.getElementById('conditionSelect4-3');
var confirmButton4_3 = document.getElementById('confirm4-3');

var coorSelect4_4 = document.getElementById('coorSelect4-4');
var textInput4_4 = document.getElementById('textInput4-4');
var conditionSelect4_4 = document.getElementById('conditionSelect4-4');
var confirmButton4_4 = document.getElementById('confirm4-4');

var coorSelect4_5 = document.getElementById('coorSelect4-5');
var textInput4_5 = document.getElementById('textInput4-5');
var conditionSelect4_5 = document.getElementById('conditionSelect4-5');
var confirmButton4_5 = document.getElementById('confirm4-5');

var coorSelect4_6 = document.getElementById('coorSelect4-6');
var textInput4_6 = document.getElementById('textInput4-6');
var conditionSelect4_6 = document.getElementById('conditionSelect4-6');
var confirmButton4_6 = document.getElementById('confirm4-6');

var coorSelect4_7 = document.getElementById('coorSelect4-7');
var textInput4_7 = document.getElementById('textInput4-7');
var conditionSelect4_7 = document.getElementById('conditionSelect4-7');
var confirmButton4_7 = document.getElementById('confirm4-7');

var coorSelect4_8 = document.getElementById('coorSelect4-8');
var textInput4_8 = document.getElementById('textInput4-8');
var conditionSelect4_8 = document.getElementById('conditionSelect4-8');
var confirmButton4_8 = document.getElementById('confirm4-8');


confirmButton2_1.addEventListener('click', function() {
    var inputNum = parseInt(textInput.value); 
    var inputNum2_1 = parseInt(textInput2_1.value);
    var condition2_1 = conditionSelect.value;
    var prevCoor = coorSelect.value;
    var currentCoor = coorSelect2_1.value;

    if (condition2_1 === 'selectGreater') {
        condition2_1 = '>';
    } else if (condition2_1 === 'selectGreaterOrEqual') {
        condition2_1 = '>=';
    } else if (condition2_1 === 'selectSmaller') {
        condition2_1 = '<';
    } else {
        condition2_1 = '<=';
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
        var coorInfo = processButtonClick(coorSelect2_1, textInput2_1, conditionSelect2_1, coor2_1, currentCanvas, canv, points);
        var startX = coorInfo.startX;
        var startY = coorInfo.startY;
        var endX = coorInfo.endX;
        var endY = coorInfo.endY;
        setCoordinates(startX, endX, startY, endY, inputNum2_1, '2_1');
    }
    else {
        alert("올바른 조건식 입력"); 
    }
});

confirmButton2_2.addEventListener('click', function() {
    var inputNum = parseInt(textInput.value); 
    var inputNum2_2 = parseInt(textInput2_2.value);
    var condition2_2 = conditionSelect.value;
    var prevCoor = coorSelect.value;
    var currentCoor = coorSelect2_2.value;

    if (condition2_2 === 'selectGreater') {
        condition2_2 = '>';
    } else if (condition2_2 === 'selectGreaterOrEqual') {
        condition2_2 = '>=';
    } else if (condition2_2 === 'selectSmaller') {
        condition2_2 = '<';
    } else {
        condition2_2 = '<=';
    }

    let evaluateExpression = inputNum + ' ' + condition2_2 + ' ' + inputNum2_2;
    if (prevCoor === currentCoor) {
        var result = eval(evaluateExpression);
    }
    else {
        var result = true;
    }
    
    console.log('조건식 확인', evaluateExpression);

    if (!result) {
        var coorInfo = processButtonClick(coorSelect2_2, textInput2_2, conditionSelect2_2, coor2_2, currentCanvas, canv, points);
        var startX = coorInfo.startX;
        var startY = coorInfo.startY;
        var endX = coorInfo.endX;
        var endY = coorInfo.endY;
        setCoordinates(startX, endX, startY, endY, inputNum2_2, '2_2');
    }
    else {
        alert("올바른 조건식 입력"); 
    }
});

confirmButton3_1.addEventListener('click', function() {
    var inputNum2_1 = parseInt(textInput.value); //이전 input
    var inputNum3_1 = parseInt(textInput3_1.value);
    var condition3_1 = conditionSelect.value;
    var prevCoor = coorSelect2_1.value; //이전 좌표
    var currentCoor = coorSelect3_1.value;

    if (condition3_1 === 'selectGreater') {
        condition3_1 = '>';
    } else if (condition3_1 === 'selectGreaterOrEqual') {
        condition3_1 = '>=';
    } else if (condition3_1 === 'selectSmaller') {
        condition3_1 = '<';
    } else {
        condition3_1 = '<=';
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
        var coorInfo = processButtonClick(coorSelect3_1, textInput3_1, conditionSelect3_1, coor3_1, currentCanvas, canv, points);
        var startX = coorInfo.startX;
        var startY = coorInfo.startY;
        var endX = coorInfo.endX;
        var endY = coorInfo.endY;
        setCoordinates(startX, endX, startY, endY, inputNum3_1, '3_1');
    }
    else {
        alert("올바른 조건식 입력"); 
    }
});

confirmButton3_2.addEventListener('click', function() {
    var inputNum2_1 = parseInt(textInput.value); //이전 input
    var inputNum3_2 = parseInt(textInput3_2.value);
    var condition3_2 = conditionSelect.value;
    var prevCoor = coorSelect2_1.value; //이전 좌표
    var currentCoor = coorSelect3_2.value;

    if (condition3_2 === 'selectGreater') {
        condition3_2 = '>';
    } else if (condition3_2 === 'selectGreaterOrEqual') {
        condition3_2 = '>=';
    } else if (condition3_2 === 'selectSmaller') {
        condition3_2 = '<';
    } else {
        condition3_2 = '<=';
    }

    let evaluateExpression = inputNum2_1 + ' ' + condition3_2 + ' ' + inputNum3_2; //이전 input
    if (prevCoor === currentCoor) {
        var result = eval(evaluateExpression);
    }
    else {
        var result = true;
    }
    
    console.log('조건식 확인', evaluateExpression);

    if (!result) {
        var coorInfo = processButtonClick(coorSelect3_2, textInput3_2, conditionSelect3_2, coor3_2, currentCanvas, canv, points);
        var startX = coorInfo.startX;
        var startY = coorInfo.startY;
        var endX = coorInfo.endX;
        var endY = coorInfo.endY;
        setCoordinates(startX, endX, startY, endY, inputNum3_2, '3_2');
    }
    else {
        alert("올바른 조건식 입력"); 
    }
});

confirmButton3_3.addEventListener('click', function() {
    var inputNum2_2 = parseInt(textInput.value); //이전 input
    var inputNum3_3 = parseInt(textInput3_3.value);
    var condition3_3 = conditionSelect.value;
    var prevCoor = coorSelect2_2.value; //이전 좌표
    var currentCoor = coorSelect3_3.value;

    if (condition3_3 === 'selectGreater') {
        condition3_3 = '>';
    } else if (condition3_3 === 'selectGreaterOrEqual') {
        condition3_3 = '>=';
    } else if (condition3_3 === 'selectSmaller') {
        condition3_3 = '<';
    } else {
        condition3_3 = '<=';
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
        var coorInfo = processButtonClick(coorSelect3_3, textInput3_3, conditionSelect3_3, coor3_3, currentCanvas, canv, points);
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
    var inputNum2_2 = parseInt(textInput.value); //이전 input
    var inputNum3_4 = parseInt(textInput3_4.value);
    var condition3_4 = conditionSelect.value;
    var prevCoor = coorSelect2_2.value; //이전 좌표
    var currentCoor = coorSelect3_4.value;

    if (condition3_4 === 'selectGreater') {
        condition3_4 = '>';
    } else if (condition3_4 === 'selectGreaterOrEqual') {
        condition3_4 = '>=';
    } else if (condition3_4 === 'selectSmaller') {
        condition3_4 = '<';
    } else {
        condition3_4 = '<=';
    }

    let evaluateExpression = inputNum2_2 + ' ' + condition3_4 + ' ' + inputNum3_4; //이전 input
    if (prevCoor === currentCoor) {
        var result = eval(evaluateExpression);
    }
    else {
        var result = true;
    }
    
    console.log('조건식 확인', evaluateExpression);

    if (!result) {
        var coorInfo = processButtonClick(coorSelect3_4, textInput3_4, conditionSelect3_4, coor3_4, currentCanvas, canv, points);
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