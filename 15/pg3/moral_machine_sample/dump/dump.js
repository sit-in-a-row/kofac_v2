const imageDictionary = {
    'baby.png': '아기',
    'dog.png': '강아지',
    'fat_female.png': '비만 여성',
    'fat_male.png': '비만 남성',
    'female.png': '여성',
    'male.png': '남성',
    'old_male.png': '노인 남성',
    'old_female.png': '노인 여성',
    'transparent.png': '투명 이미지',
    'traffic_red.png': '빨간 신호등',
    'traffic_green.png': '초록 신호등'
};

const passengerImgs = [
    'baby.png',
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
    'baby_dead.png',
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
    'baby_walk.png',
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
    'baby_walk_dead.png',
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

// 모달 창 열기 버튼을 클릭했을 때
document.getElementById("info1Btn").addEventListener("click", function() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
    
    // 모달 내용을 가져와서 표시
    const modalOutput = document.getElementById("modalOutput");
    modalOutput.textContent = `1번 선택 시, 
    사망하는 그룹: ${Object.keys(pedestrianCounts).map(description => `${description} ${pedestrianCounts[description]}명`).join(', ')} | 
    생존하는 그룹: ${Object.keys(passengerCounts).map(description => `${description} ${passengerCounts[description]}명`).join(', ')} | 
    신호등: ${getImageDescription(trafficLightImg1.src)}`;
});

// 모달 창 열기 버튼을 클릭했을 때
document.getElementById("info2Btn").addEventListener("click", function() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
    
    // 모달 내용을 가져와서 표시
    const modalOutput = document.getElementById("modalOutput");
    modalOutput.textContent = `2번 선택 시, 
    사망하는 그룹: ${Object.keys(passengerCounts).map(description => `${description} ${passengerCounts[description]}명`).join(', ')} | 
    생존하는 그룹: ${Object.keys(pedestrianCounts).map(description => `${description} ${pedestrianCounts[description]}명`).join(', ')} | 
    신호등: ${getImageDescription(trafficLightImg2.src)}`;
});

// 모달 닫기 버튼을 클릭했을 때
document.querySelector(".close").addEventListener("click", function() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
});

// 모달 외부를 클릭했을 때 모달을 닫도록 하려면 다음 코드를 추가하세요
window.addEventListener("click", function(event) {
    var modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

let totalList = [];

// Choice1 상황 생성

//신호등

const trafficLightImg1 = document.getElementById(`trafficLight_1`);
let randomImageSrc1 = getRandomTrafficLight(trafficLightImgs);
trafficLightImg1.src = randomImageSrc1;

// 자동차

let passengerList = [];
for (let i = 1; i <= 5; i++) {
    const passengerImg = document.getElementById(`passenger${i}_1`);
    let randomImageSrc = getRandomPassenger(passengerImgs);
    
    // passenger5_1에는 transparent.png가 선택되면 male.png로 변경
    if (i === 5 && (randomImageSrc === 'imgs/transparent.png' || randomImageSrc === 'imgs/dog.png' || randomImageSrc === 'imgs/baby.png')) {
        randomImageSrc = 'imgs/male.png';
    }    

    passengerImg.src = randomImageSrc;
    passengerList.push(randomImageSrc);
}

// 보행자

let pedestrianList = [];
for (let i = 1; i <= 5; i++) {
    const pedestrianImg = document.getElementById(`pedestrian${i}_1`);
    let randomImageSrc = getRandomDeadPedestrian(pedestrianImgs);
    pedestrianList.push(randomImageSrc);

    pedestrianImg.src = randomImageSrc;
}

//Choice2 상황 생성

//신호등

const trafficLightImg2 = document.getElementById(`trafficLight_2`);
trafficLightImg2.src = trafficLightImg1.src; 

//자동차

for (let i = 1; i <= 5; i++) {
    const passengerDeadImg = document.getElementById(`passenger${i}_2`);
    let randomImageSrc = passengerList[i - 1];

    if (randomImageSrc !== 'imgs/transparent.png') {
        randomImageSrc = randomImageSrc.replace('.png', '_dead.png');
    }

    passengerDeadImg.src = randomImageSrc;
}

//보행자

for (let i = 1; i <= 5; i++) {
    const pedestrianDeadImg = document.getElementById(`pedestrian${i}_2`);
    let randomImageSrc = pedestrianList[i - 1];

    if (randomImageSrc !== 'imgs/transparent.png') {
        randomImageSrc = randomImageSrc.replace('_dead.png', '.png');
    }

    pedestrianDeadImg.src = randomImageSrc;
}

const passengerDescriptions = passengerList.map(getImageDescription).filter(description => description);
const pedestrianDescriptions = pedestrianList.map(getImageDescription).filter(description => description);

const passengerCounts = countDescriptions(passengerDescriptions);
const pedestrianCounts = countDescriptions(pedestrianDescriptions);

// console.log(
//     `1번 선택 시, 사망하는 그룹: ${Object.keys(passengerCounts).map(description => `${description} ${passengerCounts[description]}명`).join(', ')} | 생존하는 그룹: ${Object.keys(pedestrianCounts).map(description => `${description} ${pedestrianCounts[description]}명`).join(', ')}`
// );

// console.log(
//     `2번 선택 시, 사망하는 그룹: ${Object.keys(pedestrianCounts).map(description => `${description} ${pedestrianCounts[description]}명`).join(', ')} | 생존하는 그룹: ${Object.keys(passengerCounts).map(description => `${description} ${passengerCounts[description]}명`).join(', ')}`
// );

// // Choice 1 버튼 클릭 이벤트
// document.getElementById("choice1Btn").addEventListener("click", function() {
//     let choiceData = {
//         selectedChoice: 1,
//         selectedTrafficLight: randomImageSrc1,
//         selectedAliveList: passengerList,
//         selectedDeadList: pedestrianList
//     }
//     totalList.push(choiceData);
//     console.log(totalList);
// });

// // Choice 2 버튼 클릭 이벤트
// document.getElementById("choice2Btn").addEventListener("click", function() {
//     let choiceData = {
//         selectedChoice: 1,
//         selectedTrafficLight: randomImageSrc1,
//         selectedAliveList: pedestrianList,
//         selectedDeadList: passengerList
//     }
//     totalList.push(choiceData);
//     console.log(totalList);
// });

// 여기까지가 페이지 로드 시 기본으로 돌아가는 함수들
// 여기서부터는 버튼 눌렀을 때 상황을 새로 만드는 영역

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
        
        let randomPassengerSrc = getRandomPassenger();

        passengerImg1.src = randomPassengerSrc;
        if (randomPassengerSrc !== 'imgs/transparent.png') {
            passenger1List.push(passengerImg1);
        }

        passengerImg2.src = randomPassengerSrc !== 'imgs/transparent.png' ? randomPassengerSrc.replace('.png', '_dead.png') : randomPassengerSrc;
        if (randomPassengerSrc !== 'imgs/transparent.png') {
            passenger2List.push(passengerImg1);
        }

        // 보행자 이미지 업데이트
        const pedestrianImg1 = document.getElementById(`pedestrian${i}_1`);
        const pedestrianImg2 = document.getElementById(`pedestrian${i}_2`);

        let randomPedestrianSrc = getRandomDeadPedestrian();

        pedestrianImg1.src = randomPedestrianSrc;
        if (randomPedestrianSrc !== 'imgs/transparent.png') {
            pedestrian1List.push(passengerImg1);
        }

        pedestrianImg2.src = randomPedestrianSrc !== 'imgs/transparent.png' ? randomPedestrianSrc.replace('_dead.png', '.png') : randomPedestrianSrc;
        if (randomPedestrianSrc !== 'imgs/transparent.png') {
            pedestrian2List.push(passengerImg2);
        }

        function updateModalContent() {

            const passengerDescriptions = passengerList.map(getImageDescription).filter(description => description);
            const pedestrianDescriptions = pedestrianList.map(getImageDescription).filter(description => description);
        
            const passengerCounts = countDescriptions(passengerDescriptions);
            const pedestrianCounts = countDescriptions(pedestrianDescriptions);
        
            // 모달 창 열기 버튼을 클릭했을 때
            document.getElementById("info1Btn").addEventListener("click", function() {
                let choice1 = true;
                var modal = document.getElementById("modal");
                modal.style.display = "block";
                
                // 모달 내용을 가져와서 표시
                const modalOutput = document.getElementById("modalOutput");
                modalOutput.textContent = `1번 선택 시, 
                사망하는 그룹: ${Object.keys(pedestrianCounts).map(description => `${description} ${pedestrianCounts[description]}명`).join(', ')} | 
                생존하는 그룹: ${Object.keys(passengerCounts).map(description => `${description} ${passengerCounts[description]}명`).join(', ')} | 
                신호등: ${getImageDescription(trafficLightImg1.src)}`;
            });
        
            // 모달 창 열기 버튼을 클릭했을 때
            document.getElementById("info2Btn").addEventListener("click", function() {
                var modal = document.getElementById("modal");
                modal.style.display = "block";
                
                // 모달 내용을 가져와서 표시
                const modalOutput = document.getElementById("modalOutput");
                modalOutput.textContent = `2번 선택 시, 
                사망하는 그룹: ${Object.keys(passengerCounts).map(description => `${description} ${passengerCounts[description]}명`).join(', ')} | 
                생존하는 그룹: ${Object.keys(pedestrianCounts).map(description => `${description} ${pedestrianCounts[description]}명`).join(', ')} | 
                신호등: ${getImageDescription(trafficLightImg2.src)}`;
            });
        }

        updateModalContent();

    } return {
        newTrafficLightSrc,
        passenger1List,
        passenger2List,
        pedestrian1List,
        pedestrian2List
    }
}

let choiceStatus = 0;
let imagesData;

function handleChoice(choiceNumber) {
  // 새로운 이미지를 업데이트하고 결과를 가져옴
  let selectedData = updateImages();

  // 현재 선택 상태 설정
  let selectedChoice = choiceNumber;
  let selectedTrafficLight = selectedData.newTrafficLightSrc;
  let selectedAliveList, selectedDeadList;

  if (choiceNumber === 1) {
    selectedAliveList = selectedData.passenger1List;
    selectedDeadList = selectedData.pedestrian1List;
  } else {
    selectedAliveList = selectedData.pedestrian2List;
    selectedDeadList = selectedData.passenger2List;
  }

  let choiceData = {
    selectedChoice: selectedChoice,
    selectedTrafficLight: selectedTrafficLight,
    selectedAliveList: selectedAliveList,
    selectedDeadList: selectedDeadList
  };

  totalList.push(choiceData);
//   console.log(totalList); // 전체 리스트 출력
  return choiceData; // choiceData 반환
}

function victimNum(choiceData) {
  if (choiceData.selectedAliveList.length > choiceData.selectedDeadList.length) {
    console.log("다수 생존, 소수 사망");
    console.log(choiceData.selectedAliveList.length);
    console.log(choiceData.selectedDeadList.length);
  } else if (choiceData.selectedAliveList.length === choiceData.selectedDeadList.length) {
    console.log("사망자 수와 생존자 수 동일");
    console.log(choiceData.selectedAliveList.length);
    console.log(choiceData.selectedDeadList.length);
  } else {
    console.log("소수 생존, 다수 사망")
    console.log(choiceData.selectedAliveList.length);
    console.log(choiceData.selectedDeadList.length);
  }
}

// Choice 1 버튼 클릭 이벤트
document.getElementById("choice1Btn").addEventListener("click", function() {

});

// Choice 2 버튼 클릭 이벤트
document.getElementById("choice2Btn").addEventListener("click", function() {
    
});


// 여기까지 버튼 눌렀을 때 상황을 새로 만드는 영역
// 여기서부터는 정보 받아두는 영역)

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


function updateModalContent() {
    const passengerDescriptions = passengerList.map(getImageDescription).filter(description => description);
    const pedestrianDescriptions = pedestrianList.map(getImageDescription).filter(description => description);

    const passengerCounts = countDescriptions(passengerDescriptions);
    const pedestrianCounts = countDescriptions(pedestrianDescriptions);

    // 이벤트 리스너 중복 방지를 위한 제거
    const info1Btn = document.getElementById("info1Btn");
    const info2Btn = document.getElementById("info2Btn");
    info1Btn.removeEventListener("click", handleModalButtonClick);
    info2Btn.removeEventListener("click", handleModalButtonClick);

    // 이벤트 리스너 추가
    info1Btn.addEventListener("click", handleModalButtonClick);
    info2Btn.addEventListener("click", handleModalButtonClick);

    function handleModalButtonClick() {
        let modal = document.getElementById("modal");
        modal.style.display = "block";
        
        let choiceNumber = this.id === "info1Btn" ? 1 : 2; // 버튼 ID에 따라 선택 번호 결정
        const modalOutput = document.getElementById("modalOutput");

        // 모달 내용 업데이트
        if (choiceNumber === 1) {
            modalOutput.textContent = `1번 선택 시, 
            사망하는 그룹: ${Object.keys(pedestrianCounts).map(description => `${description} ${pedestrianCounts[description]}명`).join(', ')} | 
            생존하는 그룹: ${Object.keys(passengerCounts).map(description => `${description} ${passengerCounts[description]}명`).join(', ')} | 
            신호등: ${getImageDescription(trafficLightImg1.src)}`;
        } else {
            modalOutput.textContent = `2번 선택 시, 
            사망하는 그룹: ${Object.keys(passengerCounts).map(description => `${description} ${passengerCounts[description]}명`).join(', ')} | 
            생존하는 그룹: ${Object.keys(pedestrianCounts).map(description => `${description} ${pedestrianCounts[description]}명`).join(', ')} | 
            신호등: ${getImageDescription(trafficLightImg2.src)}`;
        }
    }
}

updateModalContent();

function updateModalContent() {
    const passengerDescriptions = passengerList.map(getImageDescription).filter(description => description);
    const pedestrianDescriptions = pedestrianList.map(getImageDescription).filter(description => description);

    const passengerCounts = countDescriptions(passengerDescriptions);
    const pedestrianCounts = countDescriptions(pedestrianDescriptions);

    // 모달 창 열기 버튼을 클릭했을 때
    document.getElementById("info1Btn").addEventListener("click", function() {
        let choice1 = true;
        var modal = document.getElementById("modal");
        modal.style.display = "block";
        
        // 모달 내용을 가져와서 표시
        const modalOutput = document.getElementById("modalOutput");
        modalOutput.textContent = `1번 선택 시, 
        사망하는 그룹: ${Object.keys(pedestrianCounts).map(description => `${description} ${pedestrianCounts[description]}명`).join(', ')} | 
        생존하는 그룹: ${Object.keys(passengerCounts).map(description => `${description} ${passengerCounts[description]}명`).join(', ')} | 
        신호등: ${getImageDescription(trafficLightImg1.src)}`;
    });

    // 모달 창 열기 버튼을 클릭했을 때
    document.getElementById("info2Btn").addEventListener("click", function() {
        var modal = document.getElementById("modal");
        modal.style.display = "block";
        
        // 모달 내용을 가져와서 표시
        const modalOutput = document.getElementById("modalOutput");
        modalOutput.textContent = `2번 선택 시, 
        사망하는 그룹: ${Object.keys(passengerCounts).map(description => `${description} ${passengerCounts[description]}명`).join(', ')} | 
        생존하는 그룹: ${Object.keys(pedestrianCounts).map(description => `${description} ${pedestrianCounts[description]}명`).join(', ')} | 
        신호등: ${getImageDescription(trafficLightImg2.src)}`;
    });
}

updateModalContent();