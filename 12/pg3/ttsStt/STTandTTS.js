const startSttBtn = document.getElementById('start-stt');
const stopSttBtn = document.getElementById('stop-stt');
const sttResult = document.getElementById('stt-result');
const answerResult = document.getElementById('answer-result');
const quiz = document.getElementById('quiz');
const scoreCorrect = document.getElementById('scoreCorrect');
const scoreWrong = document.getElementById('scoreWrong');

let recognition;
let correct = 0;
let wrong = 0;

// 객체에서 값으로 키를 찾는 유틸리티 함수
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

// 웹킷 음성 인식을 위한 설정
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    // 추가 초기화 설정들...
    recognition.continuous = true; 
    recognition.lang = 

    // recognition.onresult 함수 설정
    recognition.onresult = function(event) {
        let final_transcript = '';
        for (let i = 0; i < event.results.length; ++i) {
            console.log(final_transcript)
            final_transcript += event.results[i][0].transcript;
        }
        sttResult.innerHTML = final_transcript;

        setTimeout(function() {
            sttResult.innerHTML = '다음 문제를 풀어볼까요?';
        }, 3000);

        // STT 결과가 idioms의 키와 일치하는지 확인
        const idiomKey = getKeyByValue(idioms, quiz.textContent);
        if (final_transcript === idiomKey) {
            correct += 1
            answerResult.innerHTML = ("정답입니다!");
            answerResult.style.color = "green"
            scoreCorrect.innerHTML = ("맞춘 개수:&nbsp" + correct)
        }
        else {
            wrong += 1
            answerResult.innerHTML = ("틀렸습니다...")
            answerResult.style.color = "red"
            scoreWrong.innerHTML = ("틀린 개수:&nbsp" + wrong)
        }
    };

    startSttBtn.onclick = function() {
        recognition.start();
        startSttBtn.disabled = true;
        stopSttBtn.disabled = false;
    };

    stopSttBtn.onclick = function() {
        recognition.stop();
        startSttBtn.disabled = false;
        stopSttBtn.disabled = true;
    };
} else {
    sttResult.innerHTML = "브라우저가 STT를 지원하지 않습니다.";
    startSttBtn.disabled = true;
    stopSttBtn.disabled = true;
}

// 듣기 중지 버튼을 초기에 비활성화
stopSttBtn.disabled = true;

// 여기서부터 TTS 관련

const ttsInput = document.getElementById('tts-input');
const startTtsBtn = document.getElementById('start-tts');
const voiceSelect = document.getElementById('voice-select'); // 음성 선택 드롭다운

let speechSynthesis = window.speechSynthesis;
let voices = [];

function populateVoiceList() {
    voices = speechSynthesis.getVoices();

    // 영어(en-) 또는 한국어(ko-KR) 음성만 필터링
    const filteredVoices = voices.filter(voice => voice.lang.startsWith('en-') || voice.lang === 'ko-KR');

    voiceSelect.innerHTML = ''; 

    for(let i = 0; i < filteredVoices.length; i++) {
        let option = document.createElement('option');
        option.textContent = filteredVoices[i].name + ' (' + filteredVoices[i].lang + ')';
        
        if(filteredVoices[i].default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', filteredVoices[i].lang);
        option.setAttribute('data-name', filteredVoices[i].name);
        voiceSelect.appendChild(option);
    }

    // 마지막 옵션을 기본값으로 선택
    voiceSelect.selectedIndex = filteredVoices.length - 1;
}

// 음성 목록이 변경될 때마다 목록을 새로고침
speechSynthesis.onvoiceschanged = populateVoiceList;

// 단어 설명을 위한 딕셔너리
const wordDescriptions = {
    '포카': '포카는 포토카드라는 뜻입니다.',
    '스불재': '스불재는 스스로 불러온 재앙이라는 뜻입니다.',
    '꾸안꾸': '꾸안꾸는 꾸민듯 안꾸민듯이라는 뜻입니다.',
    '이왜진': '이왜진은 이게 왜 진짜? 라는 뜻입니다.',
    '좋댓구알': '좋댓구알은 좋아요, 댓글, 구독, 알람설정 이라는 뜻입니다.',
    '말또서': '말또서는 말 또 서운하게 하네라는 뜻입니다.',
    '까방권': '까방권은 까임방지권이라는 뜻입니다.'
};

// 모든 'wordButton' 클래스 버튼에 대한 클릭 이벤트 리스너 추가
const wordButtons = document.querySelectorAll('.wordButton');

wordButtons.forEach(button => {
    button.addEventListener('click', function() {
        const wordKey = this.textContent;
        const description = wordDescriptions[wordKey] || wordKey; // 딕셔너리에서 설명 찾기, 없으면 기본 텍스트 사용
        ttsInput.value = description; // 설명을 TTS 입력 필드에 설정
        startTts(); // TTS 시작
    });
});

// TTS 시작 함수
function startTts() {
    if (speechSynthesis && speechSynthesis.speaking) {
        speechSynthesis.cancel(); // 중복 실행 방지
    }

    let ttsText = ttsInput.value;
    let selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    let speech = new SpeechSynthesisUtterance(ttsText);
    speech.voice = voices.find(voice => voice.name === selectedVoiceName);
    speechSynthesis.speak(speech);
}

// 기존의 startTtsBtn.onclick 이벤트를 함수로 변경
startTtsBtn.onclick = function() {
    startTts();
};

// "게임 시작" 버튼 클릭 시 랜덤 표시
const gameStartBtn = document.getElementById('game-start');
const idioms = {
    "고진감래": "괴로움이 다하면 달콤함이 온다는 뜻으로 고생 끝에 낙이 온다는 말",
    "구사일생": "아홉 번 죽을 뻔하다 한 번 살아난다는 뜻으로 죽을 고비를 여러 번 넘기고 간신히 목숨을 건진다는 말",
    "과유불급": "정도가 지나친 것은 부족한 것보다 못하다는 말",
    "괄목상대": "눈을 비비고 다시 본다는 뜻으로 상대방의 학문이나 재주가 깜짝 놀랄 만큼 발전했음을 이르는 말",
    "근묵자흑": "먹을 가까이하면 검어진다는 뜻으로 좋지 못한 사람과 가까이 지내면 나쁜 것에 물들게 된다는 말",
    "다다익선": "많으면 많을수록 더욱 좋다는 말",
    "대동소이": "큰 차이가 없이 거의 같고 조금 다르다는 말",
    "동병상련": "같은 병을 앓는 사람끼리 서로 가엾게 여긴다는 뜻으로 어려운 처지에 있는 사람끼리 서로 동정하고 공감한다는 말",
    "문전성시": "문 앞이 시장을 이룬다는 뜻으로 권세가 있거나 부자가 되어 집 문 앞이 방문객으로 넘쳐난다는 말",
    "백발백중": "백 번 쏘아 백 번 맞춘다는 뜻으로 모든 일이 계획대로 들어맞는다는 말",
    "사면초가": "동서남북 사방에서 들려오는 초나라의 노래라는 뜻으로 누구에게도 도움을 받을 수 없는 고립된 상태에 처했다는 말",
    "살신성인": "자기 몸을 희생하여 옳은 일을 이룬다는 뜻으로 의로운 일을 위해 목숨을 버린다는 말",
    "설상가상": "눈 위에 서리까지 더한다는 뜻으로 어려운 일이나 불행이 겹쳐서 한꺼번에 일어남을 이르는 말",
    "아전인수": "자기 논에 물 대기라는 뜻으로 자기의 이익만 먼저 생각하고 행동한다는 말",
    "역지사지": "입장을 바꾸어 다른 사람의 처지에서 생각하라는 말",
    "우이독경": "쇠귀에 경 읽기라는 뜻으로 아무리 가르치고 알려 주어도 도무지 알아듣지 못함을 이르는 말",
    "자업자득": "자기의 일은 자기가 받는다는 뜻으로 자신이 저지른 나쁜 행동이나 잘못이 결국 자기에게 되돌아온다는 말",
    "죽마고우": "죽마를 타고 놀던 친구라는 뜻으로 어려서부터 함께 자란 친구를 이르는 말",
    "청출어람": "푸른색은 쪽빛에서 나왔지만, 쪽빛보다 더 푸르다는 뜻으로 제자가 스승보다 나음을 비유하여 이르는 말",
    "촌철살인": "한 치의 칼로 사람을 죽인다는 뜻으로 간단한 말로도 사람을 감동하게 할 수 있음을 이르는 말",
    "함흥차사": "심부름을 간 사람이 아무 소식이 없을 때 이르는 말"
};

gameStartBtn.onclick = function() {
    const randomIdiom = getRandomIdiom(idioms);
    quiz.innerHTML = randomIdiom;
};

// 딕셔너리에서 랜덤 선택하는 함수
function getRandomIdiom(idiomObj) {
    const idiomKeys = Object.keys(idiomObj);
    const randomKey = idiomKeys[Math.floor(Math.random() * idiomKeys.length)];
    return idiomObj[randomKey];
}

