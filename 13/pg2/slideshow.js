function modelButtonClick(algoNumber) {
    var currentImg = document.getElementById("img2");
    var algoImgSrc = `./imgs/model_${String.fromCharCode(96 + algoNumber)}.gif`;
  
    currentImg.src = algoImgSrc;
  }