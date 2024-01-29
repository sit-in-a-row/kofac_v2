const img = document.getElementById("img2");

let isImg2 = true;
let isAutoChangeEnabled = true;

function changeImage() {
    if (isImg2) {
        img.src = "./imgs/img2-1.png";
        isImg2 = false;
    } else {
        // 이미지를 클릭해야만 img2로 돌아갑니다.
    }
}

// 3초마다 이미지를 변경하는 함수를 호출합니다.
const intervalId = setInterval(function () {
    if (isAutoChangeEnabled) {
        changeImage();
    }
}, 3000);

// 이미지를 클릭하면 이미지를 변경하고 자동 전환을 중지합니다.
img.addEventListener("click", function () {
    if (!isImg2) {
        img.src = "./imgs/img2.png";
        isImg2 = true;
        isAutoChangeEnabled = false; // 클릭 시 자동 전환을 중지합니다.
        clearInterval(intervalId); // setInterval을 중지합니다.
    }
});
