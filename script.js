const iframe = document.getElementById('page-frame');
const lectureButtons = document.querySelectorAll('.lectureBtn');
const homeButton = document.getElementById('homeBtn'); 
const cover = document.getElementById('cover');
const lectureInfo = document.getElementById('lectureInfo');
const bottomBar = document.getElementById('bottom-bar');

const lectureContentMap = {
    'lecture1': '1/index.html',
    'lecture2': '2/index.html',
    'lecture3': '3/index.html',
    'lecture4': '4/index.html',
    'lecture5': '5/index.html',
    'lecture6': '6/index.html',
    'lecture7': '7/index.html',
    'lecture8': '8/index.html',
    'lecture9': '9/index.html',
    'lecture10': '10/index.html',
    'lecture11': '11/index.html',
    'lecture12': '12/index.html',
    'lecture13': '13/index.html',
    'lecture14': '14/index.html',
    'lecture15': '15/index.html'
};

function refreshPage() {
    location.reload();
}

lectureButtons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonId = button.id;       
        if (buttonId in lectureContentMap) {
            iframe.src = lectureContentMap[buttonId];
            iframe.style.display = 'block'; 
            cover.style.display = 'none';
            lectureInfo.style.display = 'none';
            bottomBar.style.display = 'none';
        }
    });
});

homeButton.addEventListener('click', refreshPage);
