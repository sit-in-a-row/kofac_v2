const img = document.getElementById("img2");

let isImg2 = true;
let isAutoChangeEnabled = true;

function changeImage() {
    if (isImg2) {
        img.src = "./imgs/img2-1.png";
        isImg2 = false;
    } else {
       
    }
}

const intervalId = setInterval(function () {
    if (isAutoChangeEnabled) {
        changeImage();
    }
}, 3000);

img.addEventListener("click", function () {
    if (!isImg2) {
        img.src = "./imgs/img2.png";
        isImg2 = true;
        isAutoChangeEnabled = false; 
        clearInterval(intervalId); 
    }
});
