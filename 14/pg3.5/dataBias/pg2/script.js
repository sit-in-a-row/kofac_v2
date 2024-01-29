const selectionCount = {
  "갈색 새": 0,
  "빨간색 새": 0,
  "핑크색 새": 0,
  "보라색 새": 0,
  "슬픈 표정": 0,
  "웃는 표정": 0,
  "졸린 표정": 0,
  "화난 표정": 0,
  "갈색 부리": 0,
  "보라색 부리": 0,
  "빨간색 부리": 0,
  "핑크색 부리": 0
};


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

const selectedImages = []; // 선택된 이미지의 경로를 저장하는 배열

document.addEventListener('DOMContentLoaded', function() {
	// 'selection' 키로 저장된 값을 localStorage에서 가져오기
	const value = localStorage.getItem('value');

	// HTML 요소에 값을 삽입합니다.
	document.querySelector('.learning-feature').textContent += value;
	
	const storedSelection = localStorage.getItem('selection');
	const selectionValue = storedSelection ? JSON.parse(storedSelection) : {};
	
    const slides = document.getElementById('slides');
    const indicators = document.querySelectorAll('.indicator');
	// 이미지 조합을 만드는 함수
    function generateImagePaths() {
        const bodies = ['rectangle', 'triangle', 'circle', 'oval'];
        const eyes = ['sad', 'smile', 'tired', 'angry'];
        const noses = ['brown', 'purple', 'red', 'pink'];
        let imagePaths = [];

        bodies.forEach(body => {
            eyes.forEach(eyes => {
                noses.forEach(nose => {
                    let filename = `${body}_${eyes}_${nose}`;
                    imagePaths.push(filename);
                });
            });
        });

        return imagePaths.sort(() => Math.random() - 0.5);
    }

	
	 // 각 슬라이드에 이미지 버튼을 추가하는 함수
    function addImagesToSlides(imagePaths) {
        const slidesContainer = document.getElementById('slides');

        for (let i = 0; i < 3; i++) { // 3개의 슬라이드
            let slide = document.createElement('div');
            slide.className = 'slide';
            slidesContainer.appendChild(slide);

            for (let j = 0; j < 16; j++) {
                let index = i * 16 + j;
                let imagePath = imagePaths[index];
				let [body, eyes, nose] = imagePath.split('_');
                let imageFullPath = `imgs/Birds/${imagePath}.png`;

                let button = document.createElement('button');
                button.className = 'image-button';
                button.style.width = '160px';
                button.style.height = '160px';
                button.style.margin = '5px';
                button.style.position = 'relative';
                button.style.background = 'none';
        		button.setAttribute('data-features', `${body}_${eyes}_${nose}`);
                
				let img = document.createElement('img');
                img.src = imageFullPath;
                img.alt = imagePath;
                img.style.width = '160px';
                img.style.height = '160px';
				img.style.borderRadius = '8px';

                button.appendChild(img);
                slide.appendChild(button);

                // 버튼 클릭 이벤트 리스너를 추가하여 선택 표시를 토글
                button.addEventListener('click', function() {
                	// body, eye, nose 값 추출
				    const [body, eyes, nose] = this.getAttribute('data-features').split('_');
					button.setAttribute('data-features', `${body}_${eyes}_${nose}`);

				    // 선택 또는 선택 해제에 따라 값 업데이트
				    this.classList.toggle('selected');
				    const isSelected = this.classList.contains('selected');
					
					const bodyName = featureNames[body];
				    const eyesName = featureNames[eyes];
				    const noseName = featureNames[nose];
					
					selectionCount[bodyName] = (selectionCount[bodyName] || 0) + (isSelected ? 1 : -1);
					selectionCount[eyesName] = (selectionCount[eyesName] || 0) + (isSelected ? 1 : -1);
					selectionCount[noseName] = (selectionCount[noseName] || 0) + (isSelected ? 1 : -1);
										
					const imagePath = `imgs/Birds/${body}_${eyes}_${nose}.png`;
 					if (isSelected) {
                        selectedImages.push(imagePath);
                    } else {
                        const index = selectedImages.indexOf(imagePath);
                        if (index > -1) {
                            selectedImages.splice(index, 1);
                        }
                    }
					localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
                });
            }
        }
    }

	// 슬라이드를 표시하는 함수
	function showSlide(index) {
		const slidesWidth = 1500; // 슬라이드 컨테이너 너비
   		slides.style.transform = `translateX(${-(index-1) * slidesWidth}px)`;
		indicators.forEach((indicator, idx) => {
			indicator.classList.toggle('active', idx === index);
		});
		currentSlide = index;
	}
	
    // 이미지 조합 생성 및 슬라이드에 이미지 추가
    const imagePaths = generateImagePaths();
    addImagesToSlides(imagePaths);

    // 첫 번째 슬라이드 및 인디케이터 활성화
    let currentSlide = 0;
    showSlide(currentSlide);

    // 인디케이터 및 다음 버튼 이벤트 리스너
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            let index = parseInt(this.getAttribute('data-slide-to'));
            showSlide(index);
			updateButtonText(index);
        });
    });

    document.getElementById('next').addEventListener('click', () => {
		let newIndex = (currentSlide + 1) % indicators.length;
		showSlide(newIndex);
		updateButtonText(newIndex);
	});

	function updateButtonText(index) {
	 	const nextButton = document.getElementById('next');
	 	if (index === 2) { // 세 번째 슬라이드일 때
			nextButton.textContent = '학습시키기';
			
			nextButton.addEventListener('click', function() {
			  localStorage.setItem('selection', JSON.stringify(selectionCount));
			  window.location.href = '../pg3/index.html';
			});
		} else {
			nextButton.textContent = '다음 데이터 선택하기';
			nextButton.onclick = () => showSlide((currentSlide) % indicators.length);
		}
	}
});
