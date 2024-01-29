const iframe = document.getElementById('page-frame');
const lectureButtons = document.querySelectorAll('.lectureBtn');
const homeButton = document.getElementById('homeBtn'); 
const cover = document.getElementById('cover');
const lectureInfo = document.getElementById('lectureInfo');
const bottomBar = document.getElementById('bottom-bar');

const lectureContentMap = {
    'lecture1': '../1/contents.html',
    'lecture2': '../2/contents.html',
    'lecture3': '../3/contents.html',
    'lecture4': '../4/contents.html',
    'lecture5': '../5/contents.html',
    'lecture6': '../6/contents.html',
    'lecture7': '../7/contents.html',
    'lecture8': '../8/contents.html',
    'lecture9': '../9/contents.html',
    'lecture10': '../10/contents.html',
    'lecture11': '../11/contents.html',
    'lecture12': '../12/contents.html',
    'lecture13': '../13/contents.html',
    'lecture14': '../14/contents.html',
    'lecture15': '../15/contents.html'
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
