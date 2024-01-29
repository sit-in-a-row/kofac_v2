const imageDictionary = {
    'kid.png': '어린이',
    'dog.png': '강아지',
    'fat_female.png': '여성',
    'fat_male.png': '남성',
    'female.png': '여성',
    'male.png': '남성',
    'old_male.png': '노인 남성',
    'old_female.png': '노인 여성',
    'transparent.png': '투명 이미지',
    'traffic_red.png': '빨간 신호등',
    'traffic_green.png': '초록 신호등'
};

const passengerImgs = [
    'kid.png',
    'dog.png',
    'fat_female.png',
    'fat_male.png',
    'female.png',
    'male.png',
    'old_male.png',
    'old_female.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png'
];

const passengerDeadImgs = [
    'kid_dead.png',
    'dog_dead.png',
    'fat_female_dead.png',
    'fat_male_dead.png',
    'female_dead.png',
    'male_dead.png',
    'old_male_dead.png',
    'old_female_dead.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png'
];

const pedestrianImgs = [
    'kid_walk.png',
    'dog_walk.png',
    'fat_female_walk.png',
    'fat_male_walk.png',
    'female_walk.png',
    'male_walk.png',
    'old_male_walk.png',
    'old_female_walk.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png'
];

const pedestrianDeadImgs = [
    'kid_walk_dead.png',
    'dog_walk_dead.png',
    'fat_female_walk_dead.png',
    'fat_male_walk_dead.png',
    'female_walk_dead.png',
    'male_walk_dead.png',
    'old_male_walk_dead.png',
    'old_female_walk_dead.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png',
    'transparent.png'
];

const trafficLightImgs = [
    'traffic_green.png',
    'traffic_red.png'
];

const trafficLightImg1 = document.getElementById(`trafficLight_1`);
const trafficLightImg2 = document.getElementById(`trafficLight_2`);
const passengerList = [];
const pedestrianList = [];
const totalList = [];

let totalScenarioCount = totalList.length;
let currentScenarioCount = 1;

let victimMany = 0;
let victimLess = 0;

let passengerDead = 0;
let pedestrianDead = 0;

let youngImportant = 0;
let elderImportant = 0;

let outlawLive = 0;
let outlawDead = 0;

let puppyLive = 0;
let puppyDead = 0;

function getRandomTrafficLight() {
    const randomIndex = Math.floor(Math.random() * trafficLightImgs.length);
    return `imgs/${trafficLightImgs[randomIndex]}`;
}

function getRandomPassenger() {
    const randomIndex = Math.floor(Math.random() * passengerImgs.length);
    return `imgs/${passengerImgs[randomIndex]}`;
}

function getRandomPedestrian() {
    const randomIndex = Math.floor(Math.random() * pedestrianImgs.length);
    return `imgs/${pedestrianImgs[randomIndex]}`;
}

function getRandomDeadPassenger() {
    const randomIndex = Math.floor(Math.random() * passengerDeadImgs.length);
    return `imgs/${passengerDeadImgs[randomIndex]}`;
}

function getRandomDeadPedestrian() {
    const randomIndex = Math.floor(Math.random() * pedestrianDeadImgs.length);
    return `imgs/${pedestrianDeadImgs[randomIndex]}`;
}

function getImageDescription(imagePath) {
    const imageName = imagePath.split('/').pop(); // 파일 이름 추출

    // 투명 이미지인 경우 무시하고 빈 문자열 반환
    if (imageName === 'transparent.png') {
        return '';
    }

    const originalImageName = imageName.replace(/(_dead|_walk|_walk_dead)\.png/g, '.png'); // _dead, _walk, 또는 _walk_dead를 제거
    return imageDictionary[originalImageName] || originalImageName; // 딕셔너리에서 설명 찾거나 기본 이름 반환
}

function countDescriptions(descriptions) {
    const countMap = {};
    descriptions.forEach(description => {
        countMap[description] = (countMap[description] || 0) + 1;
    });
    return countMap;
}

function updateImages() {
    // 신호등 이미지 업데이트
    const newTrafficLightSrc = getRandomTrafficLight();
    trafficLightImg1.src = newTrafficLightSrc;
    trafficLightImg2.src = newTrafficLightSrc;

    // 자동차 및 보행자 이미지 업데이트
    let passenger1List = [];
    let passenger2List = [];
    let pedestrian1List = [];
    let pedestrian2List = [];

    for (let i = 1; i <= 5; i++) {
        // 자동차 이미지 업데이트
        const passengerImg1 = document.getElementById(`passenger${i}_1`);
        const passengerImg2 = document.getElementById(`passenger${i}_2`);
        const pedestrianImg1 = document.getElementById(`pedestrian${i}_1`);
        const pedestrianImg2 = document.getElementById(`pedestrian${i}_2`);

        let randomPassengerSrc = getRandomPassenger();
        let randomPedestrianSrc = getRandomDeadPedestrian();

        passengerImg1.src = randomPassengerSrc;
        if (randomPassengerSrc !== 'imgs/transparent.png') {
            passenger1List.push(passengerImg1);
        }

        passengerImg2.src = randomPassengerSrc !== 'imgs/transparent.png' ? randomPassengerSrc.replace('.png', '_dead.png') : randomPassengerSrc;
        if (randomPassengerSrc !== 'imgs/transparent.png') {
            passenger2List.push(passengerImg1);
        }

        pedestrianImg1.src = randomPedestrianSrc;
        if (randomPedestrianSrc !== 'imgs/transparent.png') {
            pedestrian1List.push(pedestrianImg1);
        }

        pedestrianImg2.src = randomPedestrianSrc !== 'imgs/transparent.png' ? randomPedestrianSrc.replace('_dead.png', '.png') : randomPedestrianSrc;
        if (randomPedestrianSrc !== 'imgs/transparent.png') {
            pedestrian2List.push(pedestrianImg2);
        }
    }

    function showModal() {
        var modal = document.getElementById("modal");
        modal.style.display = "block";
    
        const modalOutput = document.getElementById("modalOutput");
    
        // pedestrian1List와 passenger1List에 있는 이미지의 경로를 추출하여 배열로 만듦
        const pedestrianPaths = pedestrian1List.map(img => img.src);
        const passengerPaths = passenger1List.map(img => img.src);
    
        // 이미지 경로를 설명으로 바꾸는 함수
        function getImageDescriptionFromPath(path) {
            const imageName = path.split('/').pop();
            const originalImageName = imageName.replace(/(_dead|_walk|_walk_dead)\.png/g, '.png');
            return imageDictionary[originalImageName] || originalImageName;
        }
    
        // 이미지 경로를 설명으로 바꾸고, 설명과 함께 출력
        const pedestrianDescriptions = pedestrianPaths.map(getImageDescriptionFromPath);
        const passengerDescriptions = passengerPaths.map(getImageDescriptionFromPath);
    
        // 설명을 개수로 세는 함수
        function countDescriptions(descriptions) {
            const countMap = {};
            descriptions.forEach(description => {
                countMap[description] = (countMap[description] || 0) + 1;
            });
            return countMap;
        }
    
        // 보행자와 탑승자의 설명을 개수로 세기
        const pedestrianCounts = countDescriptions(pedestrianDescriptions);
        const passengerCounts = countDescriptions(passengerDescriptions);
    
        // 출력 문자열 생성
        const pedestrianOutput = Object.keys(pedestrianCounts).map(description => `- ${description}: ${pedestrianCounts[description]}`).join('<br>');
        const passengerOutput = Object.keys(passengerCounts).map(description => `- ${description}: ${passengerCounts[description]}`).join('<br>');
    
        modalOutput.innerHTML = `<strong>사망자</strong><br>${pedestrianOutput}<br><br><strong>생존자</strong><br>${passengerOutput}`;
    }
    
    document.getElementById("info1Btn").addEventListener("click", showModal);
    document.getElementById("info2Btn").addEventListener("click", showModal);
    
    // 모달 닫기 버튼에 클릭 이벤트 핸들러 추가
    document.getElementById("closeBtn").addEventListener("click", function() {
        var modal = document.getElementById("modal");
        modal.style.display = "none";
    });

    // 이미지 리스트 길이 확인
    if (
        passenger1List.length === 0 ||
        passenger2List.length === 0 ||
        pedestrian1List.length === 0 ||
        pedestrian2List.length === 0
    ) {
        // 하나 이상의 리스트 길이가 0이면 함수를 다시 호출
        return updateImages();
    } else {
        // 모든 리스트에 이미지가 있으면 결과 반환
        return {
            newTrafficLightSrc,
            passenger1List,
            passenger2List,
            pedestrian1List,
            pedestrian2List,
        };
    }
}

function handleChoice(choiceNumber, currentChoiceData) {
    // 새로운 이미지를 업데이트하고 결과를 가져옴

    // 현재 선택 상태 설정
    let selectedChoice = choiceNumber;
    let selectedTrafficLight = currentChoiceData.newTrafficLightSrc;
    let selectedAliveList, selectedDeadList;

    if (choiceNumber === 1) {
        selectedAliveList = currentChoiceData.passenger1List;
        selectedDeadList = currentChoiceData.pedestrian1List;
    } else {
        selectedAliveList = currentChoiceData.pedestrian2List;
        selectedDeadList = currentChoiceData.passenger2List;
    }

    let choiceData = {
        selectedChoice: selectedChoice,
        selectedTrafficLight: selectedTrafficLight,
        selectedAliveList: selectedAliveList,
        selectedDeadList: selectedDeadList
    };

    totalList.push(choiceData);
    // console.log(totalList); // 전체 리스트 출력
    return choiceData; // choiceData 반환
}
  
function victimNum(choiceData) {
    if (choiceData.selectedAliveList.length > choiceData.selectedDeadList.length) {
        // console.log("다수 생존, 소수 사망");
        victimMany++;

    } else if (choiceData.selectedAliveList.length === choiceData.selectedDeadList.length) {
        // console.log("사망자 수와 생존자 수 동일");
        
    } else {
        // console.log("소수 생존, 다수 사망")
        victimLess++;   
    }
}

function passengerVsPedestrian(choiceData) {
    if (choiceData.selectedChoice === 1) {
        // console.log("탑승자 생존, 보행자 사망");
        pedestrianDead++;
        totalScenarioCount++;

    } else {
        // console.log("탑승자 사망, 보행자 생존")
        passengerDead++;
        totalScenarioCount++;
    }
}

function youngVsOld(choiceData) {
    let oldAliveCount = 0;
    let oldDeadCount = 0;
    let kidAliveCount = 0;
    let kidDeadCount = 0;

    const selectedAliveList = choiceData.selectedAliveList.map(item => String(item.src));
    const selectedDeadList = choiceData.selectedDeadList.map(item => String(item.src));

    // 살아남은 사람들 중 노인과 어린이 카운트
    selectedAliveList.forEach(src => {
        if (src.includes('old')) {
            oldAliveCount++;
        } else if (src.includes('kid')) {
            kidAliveCount++;
        }
    });

    // 사망한 사람들 중 노인과 어린이 카운트
    selectedDeadList.forEach(src => {
        if (src.includes('old')) {
            oldDeadCount++;
        } else if (src.includes('kid')) {
            kidDeadCount++;
        }
    });

    // console.log("생존 어린이", kidAliveCount);
    // console.log("사망 어린이", kidDeadCount);
    // console.log("생존 노인", oldAliveCount);
    // console.log("사망 노인", oldDeadCount);

    if (oldAliveCount + oldDeadCount + kidAliveCount + kidDeadCount !== 0) {
        if (oldAliveCount > kidAliveCount && oldAliveCount !== oldDeadCount) {
            // console.log("노인이 더 중요")
            elderImportant++;
            
        } 
        else if (kidAliveCount > oldAliveCount && kidAliveCount !== kidDeadCount) {
            // console.log("어린이가 더 중요")
            youngImportant++;
            
        }
        else {
            // console.log("판단 불가_1")
        }
    }
    else {
        // console.log("판단 불가_2")
    }
}

function checkOutlaw(choiceData) {
    if (choiceData.selectedTrafficLight === 'imgs/traffic_green.png') {
        if (choiceData.selectedChoice === 1) {
            // console.log("보행자는 합법으로 건너다가 사망했습니다")
            
        }
        else {
            // console.log("보행자는 합법으로 건넜고 살았습니다")
            
        } 
    }
    else {
        if (choiceData.selectedChoice === 1) {
            // console.log("보행자는 불법으로 건너가다가 사망했습니다")
            outlawDead++;
            
        }
        else {
            // console.log("보행자는 불법으로 건넜고 살았습니다")
            outlawLive++;
            
        }
    }
}

function checkPuppy(choiceData) {
    const selectedAliveList = choiceData.selectedAliveList.map(item => item.src);
    const selectedDeadList = choiceData.selectedDeadList.map(item => item.src);

    const isDogSelectedAlive = selectedAliveList.some(src => src.includes('dog'));
    const isDogSelectedDead = selectedDeadList.some(src => src.includes('dog'));

    if (isDogSelectedAlive && !isDogSelectedDead) {
        // console.log("강아지를 살렸습니다")
        puppyLive++;
    }
    else if (!isDogSelectedAlive && isDogSelectedDead){
        // console.log("강아지는 죽었습니다")
        puppyDead++;
    }
    else {
        // console.log("강아지가 없었습니다.")
    }
}

function checkMostChar(totalList) {
    const allAliveImages = [];
    const allDeadImages = [];

    totalList.forEach(choiceData => {
        const selectedAliveList = choiceData.selectedAliveList;
        const selectedDeadList = choiceData.selectedDeadList;

        const aliveImages = selectedAliveList.map(img => img.src);
        const deadImages = selectedDeadList.map(img => img.src);

        allAliveImages.push(...aliveImages);
        allDeadImages.push(...deadImages);
    });

    const mostAliveImage = findMostFrequent(allAliveImages);
    const mostDeadImage = findMostFrequent(allDeadImages);

    let secondMostAliveImage = null;
    let secondMostDeadImage = null;

    if (mostAliveImage && mostAliveImage !== 'imgs/transparent.png') {
        const filteredAliveImages = allAliveImages.filter(img => img !== mostAliveImage);
        secondMostAliveImage = findMostFrequent(filteredAliveImages);
    }

    if (mostDeadImage && mostDeadImage !== 'imgs/transparent.png') {
        const filteredDeadImages = allDeadImages.filter(img => img !== mostDeadImage);
        secondMostDeadImage = findMostFrequent(filteredDeadImages);
    }

    if (mostAliveImage && mostAliveImage !== 'imgs/transparent.png') {
        // console.log(`가장 많이 나온 생존 이미지: ${mostAliveImage}`);
        if (secondMostAliveImage) {
            // console.log(`두 번째로 많이 나온 생존 이미지: ${secondMostAliveImage}`);
        }
    }
    
    // console.log(`가장 많이 나온 사망 이미지: ${mostDeadImage}`);
    if (secondMostDeadImage) {
        // console.log(`두 번째로 많이 나온 사망 이미지: ${secondMostDeadImage}`);
    }

    mostCharInfo = {mostAliveImage, mostDeadImage, secondMostAliveImage, secondMostDeadImage};

    return mostCharInfo;
}

function findMostFrequent(arr) {
    const counts = {};

    arr.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });

    let mostFrequentItem = null;
    let maxCount = 0;

    for (const item in counts) {
        if (counts[item] > maxCount) {
            mostFrequentItem = item;
            maxCount = counts[item];
        }
    }

    return mostFrequentItem;
}

function mostCharToSubmitModal(mostCharInfo) {

    const mostSavedCharID = document.getElementById("mostSavedChar");
    const mostKilledCharID = document.getElementById("mostKilledChar");

    mostSavedCharID.innerHTML = '';
    mostKilledCharID.innerHTML = '';

    const mostAliveImage = mostCharInfo.mostAliveImage;
    const mostDeadImage = mostCharInfo.mostDeadImage;
    const secondMostAliveImage = mostCharInfo.secondMostAliveImage;
    const secondMostDeadImage = mostCharInfo.secondMostDeadImage;

    console.log(mostCharInfo);

    const addImageToElement = (imageSrc, element) => {
        const img = document.createElement('img');
        img.onload = () => {
            element.appendChild(img);
        };
        img.src = imageSrc;
    }

    if (mostAliveImage.includes('transparent.png')) {
        // mostAliveImage가 "transparent.png"를 포함하면 secondMostAliveImage를 출력
        addImageToElement(secondMostAliveImage, mostSavedCharID);
    } else {
        addImageToElement(mostAliveImage, mostSavedCharID);
    }

    if (mostDeadImage.includes('transparent.png')) {
        // mostDeadImage가 "transparent.png"를 포함하면 secondMostDeadImage를 출력
        addImageToElement(secondMostDeadImage, mostKilledCharID);
    } else {
        addImageToElement(mostDeadImage, mostKilledCharID);
    }
}

// 처음 실행 시 정보 로드
currentRawChoiceData = updateImages();

// Choice 1 버튼 클릭 이벤트
document.getElementById("choice1Btn").addEventListener("click", function() {
    choiceInfo = handleChoice(1, currentRawChoiceData)
    victimNum(choiceInfo);
    passengerVsPedestrian(choiceInfo);
    checkOutlaw(choiceInfo);
    checkPuppy(choiceInfo);
    youngVsOld(choiceInfo);
    currentScenarioCount++;

    consoleInfo = {
        "지금까지 결정한 상황의 수": totalScenarioCount,
        "(다수vs소수) 다수를 살린 횟수": victimMany,
        "(다수vs소수) 소수를 살린 횟수": victimLess,
        "(탑승vs보행) 탑승자가 죽은 횟수": passengerDead,
        "(탑승vs보행) 보행자가 죽은 횟수": pedestrianDead,
        "(아이vs노인) 아이가 더 중요했던 횟수": youngImportant,
        "(아이vs노인) 노인이 더 중요했던 횟수": elderImportant,
        "강아지를 살린 횟수": puppyLive,
        "강아지가 죽은 횟수": puppyDead
    }

    console.log(consoleInfo);

    currentRawChoiceData = updateImages();
});

// Choice 2 버튼 클릭 이벤트
document.getElementById("choice2Btn").addEventListener("click", function() {
    choiceInfo = handleChoice(2, currentRawChoiceData)
    victimNum(choiceInfo);
    passengerVsPedestrian(choiceInfo);
    checkOutlaw(choiceInfo);
    checkPuppy(choiceInfo);
    youngVsOld(choiceInfo);
    currentScenarioCount++;

    consoleInfo = {
        "지금까지 결정한 상황의 수": totalScenarioCount,
        "(다수vs소수) 다수를 살린 횟수": victimMany,
        "(다수vs소수) 소수를 살린 횟수": victimLess,
        "(탑승vs보행) 탑승자가 죽은 횟수": passengerDead,
        "(탑승vs보행) 보행자가 죽은 횟수": pedestrianDead,
        "(아이vs노인) 아이가 더 중요했던 횟수": youngImportant,
        "(아이vs노인) 노인이 더 중요했던 횟수": elderImportant,
        "강아지를 살린 횟수": puppyLive,
        "강아지가 죽은 횟수": puppyDead
    }

    // console.log(consoleInfo);
    console.log(totalList);
    
    currentRawChoiceData = updateImages();
});

function showSubmitModal() {
    var submitModal = document.getElementById("submitModal");
    submitModal.style.display = "block";
    console.log(totalList);

    // const submitModalOutput = document.getElementById("submitModalOutput");

    // totalList를 출력
    // submitModalOutput.innerHTML = `
    //     지금까지 결정한 상황의 수: ${totalScenarioCount}<br>
    //     (다수vs소수) 다수를 살린 횟수: ${victimMany}<br>
    //     (다수vs소수) 소수를 살린 횟수: ${victimLess}<br>
    //     (탑승vs보행) 탑승자가 죽은 횟수: ${passengerDead}<br>
    //     (탑승vs보행) 보행자가 죽은 횟수: ${pedestrianDead}<br>
    //     (아이vs노인) 아이가 더 중요했던 횟수: ${youngImportant}<br>
    //     (아이vs노인) 노인이 더 중요했던 횟수: ${elderImportant}<br>
    //     강아지를 살린 횟수: ${puppyLive}<br>
    //     강아지가 죽은 횟수: ${puppyDead}
    // `;
}





// 제출하기 버튼 클릭 시 showSubmitModal 함수 호출 (totalList는 여기에서 생성해야 함)
document.getElementById("submit").addEventListener("click", function() {
    showSubmitModal();
    var mostCharInfo = checkMostChar(totalList);
    mostCharToSubmitModal(mostCharInfo);
});

// 모달 닫기 버튼에 클릭 이벤트 핸들러 추가
document.getElementById("closeSubmitBtn").addEventListener("click", function() {
    var submitModal = document.getElementById("submitModal");
    submitModal.style.display = "none";
});