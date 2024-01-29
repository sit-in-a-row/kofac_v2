function generateImagePaths() {
    const bodies = ['rectangle', 'triangle', 'circle', 'oval'];
    const eyes = ['sad', 'smile', 'tired', 'angry'];
    const noses = ['brown', 'purple', 'red', 'pink'];
    let imagePaths = [];

    bodies.forEach(body => {
        eyes.forEach(eye => {
            noses.forEach(nose => {
                let filename = `${body}_${eye}_${nose}.png`;
                imagePaths.push(`imgs/Birds/${filename}`);
            });
        });
    });

    return imagePaths.sort(() => Math.random() - 0.5);
}

function getImagePaths() {
    return generateImagePaths(); // 이미지 경로 목록 반환
}

function findCommonFeatures(selectedImages) {
    const featureCount = { body: {}, eyes: {}, nose: {} };

    selectedImages.forEach(image => {
        const parts = image.split('/')[2].split('_'); // 이미지 경로에서 부분 추출
        const [body, eyes, nose] = parts.map(part => part.split('.')[0]);

        featureCount.body[body] = (featureCount.body[body] || 0) + 1;
        featureCount.eyes[eyes] = (featureCount.eyes[eyes] || 0) + 1;
        featureCount.nose[nose] = (featureCount.nose[nose] || 0) + 1;
    });

    // 가장 많이 나타난 특성 찾기
    const commonFeatures = {
        body: Object.keys(featureCount.body).reduce((a, b) => featureCount.body[a] > featureCount.body[b] ? a : b),
        eyes: Object.keys(featureCount.eyes).reduce((a, b) => featureCount.eyes[a] > featureCount.eyes[b] ? a : b),
        nose: Object.keys(featureCount.nose).reduce((a, b) => featureCount.nose[a] > featureCount.nose[b] ? a : b),
    };

    return commonFeatures;
}

// commonFeatures에 해당하는지 확인하는 함수
function isCommonFeature(imagePath, commonFeatures) {
    const parts = imagePath.split('/')[2].split('_');
    const [body, eyes, nose] = parts.map(part => part.split('.')[0]);

    return commonFeatures.body === body || commonFeatures.eyes === eyes || commonFeatures.nose === nose;
}

const featureNames = {
    rectangle: "갈색 새",
    triangle: "빨간색 새",
    circle: "핑크색 새",
    oval: "보라색 새",
    sad: "슬픈 표정",
    smile: "웃는 표정",
    tired: "졸린 표정",
    angry: "화난 표정",
    brown: "갈색 부리",
    purple: "보라색 부리",
    red: "빨간색 부리",
    pink: "핑크색 부리"
  };

document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('image-container');
    const analysisContainer = document.getElementById('analysis-container');

    const selectedImages = localStorage.getItem('selectedImages');
    const selectedImagesArray = selectedImages ? JSON.parse(selectedImages) : [];

    const commonFeatures = findCommonFeatures(selectedImagesArray);

    // localStorage에서 'value' 가져오기
    const value = localStorage.getItem('value');
    // 콘솔에 value 출력
    console.log('이전 페이지에서 저장된 value:', value);

    // localStorage에서 분석 데이터 셋들 가져오기
    let selection = localStorage.getItem('selection');
    selection = selection ? JSON.parse(selection) : {};

    // 가장 높은 값 찾기
    let maxValue = Math.max(...Object.values(selection));

    Object.keys(selection).filter(key => selection[key] > 0 && key.includes('표정'))
        .sort((a, b) => selection[b] - selection[a])
        .forEach(key => {
            let value = selection[key];
            let barContainer = document.createElement('div');
            barContainer.classList.add('bar-container');

            let bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.width = '0%'; // Set initial width to 0%

            // Create a span for the text inside the bar
            let barTextSpan = document.createElement('span');
            barTextSpan.classList.add('bar-text');
            barTextSpan.textContent = `${key}: ${value}개`;
            bar.appendChild(barTextSpan);

            // Create a span for the hover effect
            let speechbubbleSpan = document.createElement('span');
            speechbubbleSpan.classList.add('speechbubble-text');
            speechbubbleSpan.textContent = `${key}: ${value}개`;
            
            let speechbubble = document.createElement('div');
            speechbubble.classList.add('speechbubble');
            speechbubble.appendChild(speechbubbleSpan);
            bar.appendChild(speechbubble);

            barContainer.appendChild(bar);
            analysisContainer.appendChild(barContainer);

            setTimeout(() => {
                bar.style.width = `${(value / maxValue) * 100}%`;
            }, 100);
        });
    
        const commonFeature = localStorage.getItem('value'); // 이전 페이지에서 저장된 공통 특성 가져오기
        const featureKeys = Object.keys(featureNames);
        const commonFeatureKey = featureKeys.find(key => featureNames[key] === commonFeature);
    
        getImagePaths().forEach(imagePath => {
            let imgElement = document.createElement('img');
            imgElement.src = imagePath;
            imgElement.alt = "Selected Image";
            imgElement.style.width = '150px';
            imgElement.style.height = '150px';
            imgElement.style.margin = '5px';
            imgElement.style.borderRadius = '8px';
    
            let storedImages = localStorage.getItem('selectedImages');
            storedImages = storedImages ? JSON.parse(storedImages) : [];
    
            let imgContainer = document.createElement('div');
            imgContainer.style.position = 'relative';
            imgContainer.style.display = 'inline-block';
            imgContainer.appendChild(imgElement);
    
            let overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.opacity = '0.5';
            overlay.style.borderRadius = '8px';
    
            if (storedImages.includes(imagePath)) {
                overlay.style.backgroundColor = '#2d82FA'; // 이미지가 storedImages에 있으면
            } else if (imagePath.includes(commonFeatureKey)) {
                overlay.style.backgroundColor = '#002073'; // 이미지가 공통 특성에 해당하면
            }
    
            imgContainer.appendChild(overlay);
            imageContainer.appendChild(imgContainer);
        });

    // if (storedImages && Array.isArray(storedImages)) {
    //     storedImages.forEach(imagePath => {
    //         let imgElement = document.createElement('img');
    //         imgElement.src = imagePath;
    //         imgElement.alt = "Selected Image";
    //         imgElement.style.width = '150px';
    //         imgElement.style.height = '150px';
    //         imgElement.style.margin = '5px';
    //         imgElement.style.borderRadius = '8px';

    //         imageContainer.appendChild(imgElement);
    //     });
    // }

    // 팁 이미지 클릭 시 fade out
    const img = document.getElementById("tip");

    function fadeOutImage() {
        img.style.transition = "opacity 0.5s";
        img.style.opacity = 0;
        
        setTimeout(() => {
            img.style.display = "none";
        }, 500);
    }

    img.addEventListener("click", fadeOutImage);


    // "다시 해보기" 버튼 이벤트 리스너
    const retryButton = document.getElementById('retry');
    retryButton.addEventListener('click', function() {
        window.location.href = '../pg1/index.html';
    });
});
