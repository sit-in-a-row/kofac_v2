const imageUpload1 = document.getElementById("trainImgInput");
const imageUpload2 = document.getElementById("testImgInput");
const submit = document.getElementById('submit');

const trainImg1 = document.getElementById('trainImg1')
const trainImg2 = document.getElementById('trainImg2')
const trainImg3 = document.getElementById('trainImg3')

const testImg1 = document.getElementById('testImg1')
const testImg2 = document.getElementById('testImg2')
const testImg3 = document.getElementById('testImg3')

// 콘텐츠 포팅 시 하기 2개의 리스트에 대해 적절한 경로 설정 필요

// var trainImgSamples = [
//     'https://cdn.pixabay.com/photo/2023/12/13/06/40/cat-8446390_1280.jpg',
//     'https://cdn.pixabay.com/photo/2024/01/07/11/17/welsh-corgi-8492879_1280.jpg',
//     'https://cdn.pixabay.com/photo/2014/09/19/21/47/chihuahua-453063_1280.jpg'
// ]

// var testImgSamples = [
//     'https://cdn.pixabay.com/photo/2023/12/15/21/47/cat-8451431_1280.jpg',
//     'https://cdn.pixabay.com/photo/2023/09/09/09/03/cheetah-8242729_1280.png',
//     'https://cdn.pixabay.com/photo/2017/03/27/14/20/cupcakes-2179039_1280.jpg'
// ]

var trainImgSamples = [
    'trainImg1.png',
    'trainImg2.png',
    'trainImg3.png'
]

var testImgSamples = [
    'testImg1.png',
    'testImg2.png',
    'testImg3.png'
]

var trainImg = document.getElementById('trainImgDisplay');
var testImg = document.getElementById('testImgDisplay');

var isTrainImgUpload = false;
var isTestImgUpload = false;

var traditionalMode = false;
var machineLearningMode = false;

function checkMode() {
    var selectElement = document.getElementById("imageClassification");
    var selectedOption = selectElement.value;

    traditionalMode = selectedOption === 'traditional';
    machineLearningMode = selectedOption === 'machineLearning';

    console.log(traditionalMode ? '전통적인 이미지 분류 모드 설정 완료' : machineLearningMode ? '머신러닝 이미지 분류 모드 설정 완료' : '모드 확인 불가');
}

function loadImage(event, imgNum) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '100%';
        img.crossOrigin = 'anonymous'; // crossOrigin 속성 추가

        if (imgNum === 1) {
            trainImg = img;
            const trainImgContainer = document.getElementById('trainImgDisplay');
            trainImgContainer.innerHTML = '';
            trainImgContainer.appendChild(img);
        } else if (imgNum === 2) {
            testImg = img;
            const testImgContainer = document.getElementById('testImgDisplay');
            testImgContainer.innerHTML = '';
            testImgContainer.appendChild(img);
        }
    };
    reader.readAsDataURL(event.target.files[0]);
}


// 전통적인 이미지 분류

function getAverageRGB(img) {
    console.log('이미지 분류 시작');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var r = 0, g = 0, b = 0;

    for (var i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    r = Math.round(r / (data.length / 4));
    g = Math.round(g / (data.length / 4));
    b = Math.round(b / (data.length / 4));

    return {r, g, b};
}

function isSimilar(rgb1, rgb2) {
    var threshold = 30; // 역치값 조정해서 전통적인 모델 민감도 조절
    return (Math.abs(rgb1.r - rgb2.r) < threshold &&
            Math.abs(rgb1.g - rgb2.g) < threshold &&
            Math.abs(rgb1.b - rgb2.b) < threshold);
}

// 머신러닝 이미지 분류

function classifyImage(img) {
    console.log('이미지 분류 시작');
    return new Promise((resolve, reject) => {
        mobilenet.load().then(model => {
            model.classify(img).then(predictions => {
                resolve(predictions);
            }).catch(err => {
                reject(err);
            });
        });
    });
}

function areSimilar(preds1, preds2) {
    const classes1 = preds1.map(p => p.className);
    const classes2 = preds2.map(p => p.className);

    return classes1.some(className => classes2.includes(className));
}

// 결과 출력

function displayResult(similarity, mode) {
    console.log('결과 출력 실행됨');
    // const resultMessage = similarity ? '같은 이미지입니다' : '다른 이미지입니다';
    // alert(`${resultMessage}_${mode}`);

    const resultImage = document.getElementById("resultImage");
    resultImage.style.display = "block";
    resultImage.src = `imgs/classify_${similarity ? 'same' : 'different'}.png`;

    // resultImage.addEventListener('click', function() {
    //     resultImage.classList.add('fade-out'); 
    //     setTimeout(function() {
    //         resultImage.style.display = "none";
    //         resultImage.classList.remove('fade-out'); 
    //     }, 1000); 
    // });

    setTimeout(function() {
        resultImage.style.display = "none";
        resultImage.classList.remove('fade-out'); 
    }, 1000); 
}

async function traditionalClassifier() {
    const rgbTrain = getAverageRGB(trainImg);
    const rgbTest = getAverageRGB(testImg);

    if (isTrainImgUpload && isTestImgUpload) {
        var similarity = isSimilar(rgbTrain, rgbTest);
        displayResult(similarity, 'traditional');
    }
}

async function machineLearningClassifier() {
    if (isTrainImgUpload && isTestImgUpload) {
        const classifyingImage = document.getElementById('classifyingImage');
        classifyingImage.style.display = 'block'; 

        const predictions1 = await classifyImage(trainImg);
        const predictions2 = await classifyImage(testImg);

        const similar = areSimilar(predictions1, predictions2);
        displayResult(similar, 'machineLearning');

        classifyingImage.style.display = 'none';
    }
}

function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

var algoInfoButton = document.getElementById("algoInfo");
algoInfoButton.addEventListener("click", openModal);

var closeModalButton = document.getElementById("closeModal");
closeModalButton.addEventListener("click", closeModal);

window.addEventListener("click", function(event) {
    var modal = document.getElementById("modal");
    if (event.target == modal) {
        closeModal();
    }
});

// 이벤트 리스너들

imageUpload1.addEventListener('change', (event) => {
    isTrainImgUpload = false;
    loadImage(event, 1);
    isTrainImgUpload = true;
});

imageUpload2.addEventListener('change', (event) => {
    isTestImgUpload = false;
    loadImage(event, 2);
    isTestImgUpload = true;
});

submit.addEventListener("click", () => {
    console.log('분류하기 버튼 실행됨');
    checkMode();
    console.log('모드 확인 실행됨');
    if (traditionalMode) {
        traditionalClassifier();
        console.log('전통적인 분류 실행됨');
    } else if (machineLearningMode) {
        machineLearningClassifier();
        console.log('머신러닝 분류 실행됨');
    } else {
        console.log("모드 확인 불가_classify");
    }
});

trainImg1.addEventListener("click", () => {
    isTrainImgUpload = false;
    let img = document.createElement('img');
    // img.src = 'https://cdn.pixabay.com/photo/2023/12/13/06/40/cat-8446390_1280.jpg';
    // img.src = 'trainImg1.png'
    img.src = trainImgSamples[0];
    img.style.maxWidth = '100%';
    img.crossOrigin = 'anonymous'; // 여기에 crossOrigin 속성 추가
    trainImg = img;
    trainImg.src = img.src; // 이미지의 src를 저장
    let trainImgContainer = document.getElementById('trainImgDisplay');
    trainImgContainer.innerHTML = '';
    trainImgContainer.appendChild(img);
    isTrainImgUpload = true;
});

trainImg2.addEventListener("click", () => {
    isTrainImgUpload = false;
    let img = document.createElement('img');
    // img.src = 'trainImg2.png';
    img.src = trainImgSamples[1];
    img.style.maxWidth = '100%';
    img.crossOrigin = 'anonymous'; // 여기에 crossOrigin 속성 추가
    trainImg = img;
    trainImg.src = img.src; // 이미지의 src를 저장
    let trainImgContainer = document.getElementById('trainImgDisplay');
    trainImgContainer.innerHTML = '';
    trainImgContainer.appendChild(img);
    isTrainImgUpload = true;
});

trainImg3.addEventListener("click", () => {
    isTrainImgUpload = false;
    let img = document.createElement('img');
    // img.src = 'trainImg3.png';
    img.src = trainImgSamples[2];
    img.style.maxWidth = '100%';
    img.crossOrigin = 'anonymous'; // 여기에 crossOrigin 속성 추가
    trainImg = img;
    trainImg.src = img.src; // 이미지의 src를 저장
    let trainImgContainer = document.getElementById('trainImgDisplay');
    trainImgContainer.innerHTML = '';
    trainImgContainer.appendChild(img);
    isTrainImgUpload = true;
});

testImg1.addEventListener("click", () => {
    isTestImgUpload = false;
    let img = document.createElement('img');
    img.src = testImgSamples[0];
    // img.src = 'testImg1.png';
    img.style.maxWidth = '100%';
    img.crossOrigin = 'anonymous'; // 여기에 crossOrigin 속성 추가
    testImg = img;
    testImg.src = img.src; // 이미지의 src를 저장
    let testImgContainer = document.getElementById('testImgDisplay');
    testImgContainer.innerHTML = '';
    testImgContainer.appendChild(img);
    isTestImgUpload = true;
});

testImg2.addEventListener("click", () => {
    isTestImgUpload = false;
    let img = document.createElement('img');
    img.src = testImgSamples[1];
    img.style.maxWidth = '100%';
    img.crossOrigin = 'anonymous'; // 여기에 crossOrigin 속성 추가
    testImg = img;
    testImg.src = img.src; // 이미지의 src를 저장
    let testImgContainer = document.getElementById('testImgDisplay');
    testImgContainer.innerHTML = '';
    testImgContainer.appendChild(img);
    isTestImgUpload = true;
});

testImg3.addEventListener("click", () => {
    isTestImgUpload = false;
    let img = document.createElement('img');
    img.src = testImgSamples[2];
    img.style.maxWidth = '100%';
    img.crossOrigin = 'anonymous'; // 여기에 crossOrigin 속성 추가
    testImg = img;
    testImg.src = img.src; // 이미지의 src를 저장
    let testImgContainer = document.getElementById('testImgDisplay');
    testImgContainer.innerHTML = '';
    testImgContainer.appendChild(img);
    isTestImgUpload = true;
});
