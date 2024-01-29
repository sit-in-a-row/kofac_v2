// 챗봇 규칙
const rules = {
    '오늘 점심 메뉴는 무엇인가요?': '오늘 점심은 치킨 커리와 밥, 샐러드입니다.',
    '내일 아침 메뉴는 무엇인가요?': '내일 아침은 샌드위치와 오렌지 주스가 제공됩니다.',
    '급식 시간은 언제인가요?': '점심 급식 시간은 12시부터 1시까지입니다.',
    '알레르기 정보를 어디서 볼 수 있나요?': '급식 메뉴의 알레르기 정보는 학교 웹사이트에서 확인할 수 있습니다.',
    '저녁 급식도 제공되나요?': '아니요, 저희 학교에서는 저녁 급식을 제공하지 않습니다.',
    '주말에도 급식이 제공되나요?': '주말에는 급식 서비스가 운영되지 않습니다.',
    '음료수는 어디서 구할 수 있나요?': '음료수는 학교 매점에서 구매할 수 있습니다.',
    '식당에 좌석이 얼마나 있나요?': '식당에는 200개의 좌석이 있습니다.',
    '급식을 건너뛰면 환불되나요?': '미리 알린 경우에 한해 급식 비용을 환불해 드립니다.',
    '식단에 대한 피드백을 어디에 남길 수 있나요?': '식단에 대한 피드백은 학교 웹사이트의 피드백 섹션에서 남길 수 있습니다.',
    '급식 메뉴는 어떻게 결정되나요?': '급식 메뉴는 영양사와 학교 행정실의 협의를 통해 결정됩니다.'
};

const tableBody = document.getElementById('rulesTable').getElementsByTagName('tbody')[0];
for (const [input, response] of Object.entries(rules)) {
    const newRow = tableBody.insertRow(tableBody.rows.length);
    newRow.innerHTML = `<td>${input}</td><td>${response}</td>`;
}

// 레벤슈타인 거리 계산 함수
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length; 
    if (b.length === 0) return a.length; 

    var matrix = [];

    // 각 행의 첫 번째 열 채우기
    var i;
    for (i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    // 첫 번째 행의 모든 열 채우기
    var j;
    for (j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    // 나머지 행렬 채우기
    for (i = 1; i <= b.length; i++){
        for (j = 1; j <= a.length; j++){
            if (b.charAt(i-1) === a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // 대체
                                        Math.min(matrix[i][j-1] + 1, // 삽입
                                                 matrix[i-1][j] + 1)); // 삭제
            }
        }
    }

    return matrix[b.length][a.length];
};

// N-gram을 추출하는 함수
function nGrams(input, n) {
    const grams = [];
    for (let i = 0; i < input.length - n + 1; i++) {
        grams.push(input.slice(i, i + n));
    }
    return grams;
}

// N-gram 유사성을 계산하는 함수
function nGramSimilarity(input1, input2, n) {
    const grams1 = nGrams(input1, n);
    const grams2 = nGrams(input2, n);

    const intersection = grams1.filter(gram => grams2.includes(gram));

    const similarity = (2.0 * intersection.length) / (grams1.length + grams2.length);

    return similarity;
}

// 사용자 입력에 대한 응답 가져오기
function getResponse(userInput) {
    let lowerInput = userInput.toLowerCase();
    let closestMatch = { key: null, distance: Infinity, similarity: 0 };

    // 유사도 기반 규칙 선택
    for (let key in rules) {
        let distance = levenshteinDistance(lowerInput, key.toLowerCase());
        let similarity = nGramSimilarity(lowerInput, key.toLowerCase(), 2); // 2-gram 사용

        // Levenshtein 거리와 N-gram 유사성을 모두 고려하여 가장 가까운 규칙 선택
        if (distance < closestMatch.distance || (distance === closestMatch.distance && similarity > closestMatch.similarity)) {
            closestMatch = { key, distance, similarity };
        }
    }

    // 유사도 임계값 확인 (예: 거리 7 이하, 유사도 0.5 이상)
    if (closestMatch.distance <= 5 || closestMatch.similarity >= 0.5) {
        return rules[closestMatch.key];
    } else {
        // 기존 placeholder 응답 코드
        let placeholders = [
            "이해하지 못했어요.",
            "다른 방식으로 말씀해주실래요?",
            "음... 도와드릴 다른 내용은 또 없나요?",
        ];

        return placeholders[Math.floor(Math.random() * placeholders.length)];
    }
}

// 메시지 전송 함수
function sendMessage() {
    const userInputField = document.getElementById('userInput');
    const chatbox = document.getElementById('chatbox');

    const userInput = userInputField.value;
    const botResponse = getResponse(userInput);

    let messageCount = chatbox.children.length;
    chatbox.innerHTML += `<div class="user-message" style="order:${messageCount + 1}">${userInput}</div>`;
    messageCount++; 
    chatbox.innerHTML += `<div class="bot-message" style="order:${messageCount + 1}"><strong>급식봇:&nbsp</strong> ${botResponse}</div>`;

    // 스크롤을 최하단으로 이동
    chatbox.scrollTop = chatbox.scrollHeight;

    // 입력 필드 지우기
    userInputField.value = "";
}


// 엔터 키 이벤트 처리
document.getElementById('userInput').addEventListener('keydown', function(event) {
    if (event.keyCode === 13 && this.value.trim() !== "") {
        sendMessage();
        event.preventDefault();  // 기본 동작 (새 줄) 방지
    }
});

// 새로운 규칙 추가 폼 처리
document.getElementById('ruleForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 제출 동작 방지

    const inputRule = document.getElementById('inputRule').value.trim();
    const responseRule = document.getElementById('responseRule').value.trim();

    if (inputRule && responseRule) {
        // rules 객체에 새 규칙 추가
        rules[inputRule] = responseRule;

        // 테이블에 새로운 규칙 추가
        const newRow = tableBody.insertRow(tableBody.rows.length);
        newRow.innerHTML = `<td>${inputRule}</td><td>${responseRule}</td>`;

        // 폼 필드 초기화
        document.getElementById('inputRule').value = '';
        document.getElementById('responseRule').value = '';

        // alert('새로운 규칙이 추가되었습니다!');
    } else {
        alert('규칙과 응답을 모두 입력해주세요!');
    }
});
