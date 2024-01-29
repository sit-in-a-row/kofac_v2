rulesData = [];
factsData = [];
inferenceData = [];

class ExpertSystem {
    constructor() {
        this.rules = [];
        this.facts = {};
    }

    addRule(rule) {
        this.rules.push(rule);
    }

    addFact(fact, value) {
        this.facts[fact] = value;
    }

    evaluateCondition(condition) {
        if (typeof condition === 'string') {
            return this.facts[condition];
        }

        const [op, left, right] = condition;
        switch (op) {
            case 'AND':
                return this.evaluateCondition(left) && this.evaluateCondition(right);
            case 'OR':
                return this.evaluateCondition(left) || this.evaluateCondition(right);
            default:
                return false;
        }
    }

    infer() {
        let resultText = '';
        let inferenceSuccessful = false; // 변수를 추가하여 추론 결과가 있는지 확인
    
        for (const rule of this.rules) {
            const { if: condition, then: result } = rule;
            if (this.evaluateCondition(condition)) {
                resultText = `${resultText}${result}<br>`; 
                inferenceSuccessful = true; // 추론 결과가 있음을 표시
            }
        }
    
        if (!inferenceSuccessful) {
            resultText = '추론할 수 없습니다'; // 추론 결과가 없는 경우 메시지 설정
        }
    
        // 결과를 inferenceData 배열에 추가
        inferenceData.push(resultText);
    }
}

// 사용 예시
const system = new ExpertSystem();

// 규칙 추가 함수
function addRule() {
    const ifInputValue = document.getElementById('ifInput').value.trim();
    const andInputValue = document.getElementById('andInput').value.trim();
    const orInputValue = document.getElementById('orInput').value.trim();
    const thenInputValue = document.getElementById('thenInput').value.trim();

    if (!ifInputValue || !thenInputValue) return;

    let condition = ifInputValue;
    let additionalCondition = '';
    if (andInputValue) {
        condition = ['AND', ifInputValue, andInputValue];
        additionalCondition = 'AND: ' + andInputValue;
    } else if (orInputValue) {
        condition = ['OR', ifInputValue, orInputValue];
        additionalCondition = 'OR: ' + orInputValue;
    }

    system.addRule({ if: condition, then: thenInputValue });

    // 새로운 <div> 요소 생성 -> 정보 추가
    const rulesElement = document.createElement('div');
    rulesElement.innerHTML = `<p>IF: ${ifInputValue} <br> ${additionalCondition} <br> THEN: ${thenInputValue}</p>`;
    rulesElement.classList.add('resultBox');
    document.getElementById('rulesContainer').appendChild(rulesElement);

    // 입력 필드 초기화
    document.getElementById('ifInput').value = '';
    document.getElementById('andInput').value = '';
    document.getElementById('orInput').value = '';
    document.getElementById('thenInput').value = '';
}



// 사실 추가 함수
function addFact() {
    const input = document.getElementById('factInputField').value;
    if (!input) return;

    let fact, value;
    if (input.includes(',')) {
        [fact, value] = input.split(',').map(s => s.trim());
        value = value.toLowerCase() === 'true';
    } else {
        fact = input.trim();
        value = true;
    }

    system.addFact(fact, value);

    // 새로운 <div> 요소 생성 -> 정보 추가
    const factsElement = document.createElement('div');
    factsElement.innerHTML = `<p>${input}</p>`;
    factsElement.classList.add('resultBox');
    document.getElementById('factsContainer').appendChild(factsElement);

    document.getElementById('factInputField').value = ''; // 입력 필드 초기화
}



function runInference() {
    system.infer();

    // 새로운 <div> 요소 생성 -> 정보 추가
    const resultElement = document.createElement('div');
    resultElement.innerHTML = `<p>${inferenceData[inferenceData.length - 1]}</p>`;
    resultElement.classList.add('resultBox');
    document.getElementById('infereceContainer').appendChild(resultElement);
}

