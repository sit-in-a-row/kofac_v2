document.getElementById('nextButton').addEventListener('click', function() {
    var currentFrame = document.getElementById('frames').src;
    var frameNumber = parseInt(currentFrame.match(/frame_(\d+)/)[1]);
    frameNumber = frameNumber < 2 ? frameNumber + 1 : 1; 
    document.getElementById('frames').src = `./imgs/frame_${frameNumber}.png`;
});

document.getElementById('prevButton').addEventListener('click', function() {
    var currentFrame = document.getElementById('frames').src;
    var frameNumber = parseInt(currentFrame.match(/frame_(\d+)/)[1]);
    frameNumber = frameNumber > 1 ? frameNumber - 1 : 2; 
    document.getElementById('frames').src = `./imgs/frame_${frameNumber}.png`;
});

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('frameCanvas');
    const ctx = canvas.getContext('2d');
    let frameNumber = 1;
    let stars = []; // 별의 위치를 저장할 배열

    function drawImage() {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

            // 저장된 별들을 다시 그리기
            stars.forEach(star => {
                drawStar(star.x, star.y);
            });
        };
        img.src = `./imgs/frame_${frameNumber}.png`;
    }

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        // 별이 이미 있는 위치인지 확인하고, 있다면 삭제
        const starIndex = stars.findIndex(star => isInsideStar(x, y, star.x, star.y));
        if (starIndex !== -1) {
            stars.splice(starIndex, 1);
        } else {
            stars.push({x, y});
        }

        drawImage();
    });

    function drawStar(x, y, radius = 10) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(
                x + radius * Math.cos((18 + 72 * i) * Math.PI / 180),
                y - radius * Math.sin((18 + 72 * i) * Math.PI / 180)
            );
            ctx.lineTo(
                x + radius / 2 * Math.cos((54 + 72 * i) * Math.PI / 180),
                y - radius / 2 * Math.sin((54 + 72 * i) * Math.PI / 180)
            );
        }
        ctx.closePath();
        ctx.fill();
    }

    function isInsideStar(x, y, centerX, centerY, radius = 10) {
        // 클릭된 위치가 별 내부에 있는지 판단하는 로직
        // 간단한 방법으로는 별의 중심으로부터의 거리를 체크
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        return distance < radius;
    }

    document.getElementById('nextButton').addEventListener('click', function() {
        frameNumber = frameNumber < 2 ? frameNumber + 1 : 1;
        drawImage();
    });

    document.getElementById('prevButton').addEventListener('click', function() {
        frameNumber = frameNumber > 1 ? frameNumber - 1 : 2;
        drawImage();
    });

    drawImage(); // 초기 이미지 로드
});
