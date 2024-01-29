function algoButtonClick(algoNumber) {
    var currentImg = document.getElementById("img2");
    var algoImgSrc = `./imgs/algo_${String.fromCharCode(96 + algoNumber)}.gif`;
  
    currentImg.src = algoImgSrc;
  }