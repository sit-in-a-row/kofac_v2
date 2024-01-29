// HTML 요소 가져오기
var coorSelect = document.getElementById('coorSelect');
var textInput = document.getElementById('textInput'); // 수정
var conditionSelect = document.getElementById('conditionSelect');
var confirmButton = document.getElementById('confirm');

// 정보를 저장할 변수를 초기화합니다.
var selectedCoor = null;
var inputText = null;
var selectedCondition = null;

// 입력 버튼을 클릭했을 때 정보를 가져와서 저장합니다.
confirmButton.addEventListener('click', function () {
    selectedCoor = coorSelect.value;
    inputText = textInput.value; // 수정
    selectedCondition = conditionSelect.value;

    // 좌표를 원하는 형식으로 변환합니다.
    if (selectedCoor === 'selectX') {
        selectedCoor = 'x';
    } else {
        selectedCoor = 'y';
    }

    // 조건을 원하는 형식으로 변환합니다.
    if (selectedCondition === 'selectGreater') {
        selectedCondition = '>';
    } else if (selectedCondition === 'selectGreaterOrEqual') {
        selectedCondition = '>=';
    } else if (selectedCondition === 'selectSmaller') {
        selectedCondition = '<';
    } else {
        selectedCondition = '<='
    }

    // 조건식을 만듭니다.
    var conditionExpression = selectedCoor + ' ' + selectedCondition + ' ' + inputText;

    // 저장된 정보를 사용하여 원하는 작업을 수행합니다.
    console.log('선택된 좌표:', selectedCoor);
    console.log('입력된 값:', inputText);
    console.log('선택된 조건:', selectedCondition);

    // 조건식을 출력합니다.
    console.log('조건식:', conditionExpression);

    // 다른 작업을 수행하려면 여기에서 변수를 사용하세요.
});

// ... 이전 코드 ...

// 조건식을 만듭니다.
var conditionExpression = selectedCoor + ' ' + selectedCondition + ' ' + inputText;

// 저장된 정보를 사용하여 원하는 작업을 수행합니다.
console.log('선택된 좌표:', selectedCoor);
console.log('입력된 값:', inputText);
console.log('선택된 조건:', selectedCondition);

// 조건식을 출력합니다.
console.log('조건식:', conditionExpression);

// test 버튼을 가져오기
var testButton = document.getElementById('test'); // 이 부분은 HTML에서 해당 버튼의 ID를 'testButton'으로 설정해야 합니다.

// test 버튼에 클릭 이벤트 리스너 추가
testButton.addEventListener('click', function () {
    // 조건에 따라 분류하고 참/거짓 개수를 계산합니다.
    var trueCount = 0;
    var falseCount = 0;

    for (var p in points) {
        var point = points[p];
        var evaluateExpression = point[selectedCoor] + ' ' + selectedCondition + ' ' + inputText;
        var result = eval(evaluateExpression);

        if (result) {
            trueCount++;
        } else {
            falseCount++;
        }
    }

    // 결과를 출력합니다.
    console.log('조건에 맞는 개수:', trueCount);
    console.log('조건에 맞지 않는 개수:', falseCount);
});