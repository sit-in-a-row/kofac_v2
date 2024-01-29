document.getElementById('nextButton').addEventListener('click', function() {
    var currentFrame = document.getElementById('frames').src;
    var frameNumber = parseInt(currentFrame.match(/frame_(\d)/)[1]);
    frameNumber = frameNumber < 4 ? frameNumber + 1 : 1;
    document.getElementById('frames').src = `./imgs/frame_${frameNumber}.png`;
});

document.getElementById('prevButton').addEventListener('click', function() {
    var currentFrame = document.getElementById('frames').src;
    var frameNumber = parseInt(currentFrame.match(/frame_(\d)/)[1]);
    frameNumber = frameNumber > 1 ? frameNumber - 1 : 4;
    document.getElementById('frames').src = `./imgs/frame_${frameNumber}.png`;
});
