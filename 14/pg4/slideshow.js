function quizButtonClick(quizNumber) {
  var currentImg = document.getElementById("img4");
  var quizImageSrc = `./imgs/quiz_${String.fromCharCode(96 + quizNumber)}.png`;
  var wrongImageSrc = `./imgs/result_${String.fromCharCode(96 + quizNumber)}.png`;

  currentImg.src = quizImageSrc;

  setTimeout(function () {
    currentImg.src = wrongImageSrc;

    if (wrongImageSrc.includes("result_b")) {

      window.postMessage({
        type : 'on_submit_quiz',
        payload : {
          quiz_id : 'AI_14_quiz',
          answer : 'correct',
          is_correct : true,
        }
      })

      var answerExplainedImg = document.createElement("img");
      answerExplainedImg.src = "./imgs/answer_explained.png";
      document.body.appendChild(answerExplainedImg);

      // 스타일 지정
      answerExplainedImg.style.position = "absolute";
      answerExplainedImg.style.bottom = "28%"; 
      answerExplainedImg.style.right = "15%";
      
      // 크기 조절
      answerExplainedImg.style.width = "40%"; 
      answerExplainedImg.style.height = "auto";

      answerExplainedImg.style.display = "block";
      answerExplainedImg.addEventListener("click", function hideAnswerExplained() {
        answerExplainedImg.style.display = "none";

        // result_d 이미지도 사라지게 처리
        currentImg.src = quizImageSrc;

        answerExplainedImg.removeEventListener("click", hideAnswerExplained);
      });
    } else {

      window.postMessage({
        type : 'on_submit_quiz',
        payload : {
          quiz_id : 'AI_14_quiz',
          answer : 'incorrect',
          is_correct : false,
        }
      })

      setTimeout(function () {
        currentImg.src = quizImageSrc;
      }, 500);
    }
  }, 500);
}