let checklistStatus = {
    firstClicked: false,
    secondClicked: false,
};

// 체크리스트 항목을 클릭했을 때 상태 변경
function checkButtonClick(selectedButtonId) {
    if (selectedButtonId === 1) {
        checklistStatus.firstClicked = true;
    } else if (selectedButtonId === 2) {
        checklistStatus.secondClicked = true;
    }

    updateChecklistImage();
    checkCompletion();
}

// 체크리스트 이미지 업데이트
function updateChecklistImage() {
    const checklistImage = document.getElementById('check_0');
    if (checklistStatus.firstClicked && checklistStatus.secondClicked) {
        // 두 항목 모두 클릭된 경우
        checklistImage.src = "./imgs/check_3.png";
    } else if (checklistStatus.firstClicked) {
        // 첫 번째 항목만 클릭된 경우
        checklistImage.src = "./imgs/check_1.png";
    } else if (checklistStatus.secondClicked) {
        // 두 번째 항목만 클릭된 경우
        checklistImage.src = "./imgs/check_2.png";
    } else {
        // 초기 상태
        checklistImage.src = "./imgs/check_0.png";
    }
}

// 체크리스트 항목이 모두 완료되었는지 확인하고 오버레이를 표시
function checkCompletion() {
    if (checklistStatus.firstClicked && checklistStatus.secondClicked) {
        // 모든 항목이 클릭된 경우, 오버레이로 goodbye.png를 표시
        setTimeout(function() {
            const overlay = document.getElementById('goodbye');
            overlay.src = "./imgs/goodbye.png";
            overlay.style.display = "block";
            
            // 오버레이 클릭 시 오버레이를 숨김
            overlay.onclick = function() {
                overlay.style.display = "none";
                hideOverlay()
            };
        }, 500);        
    }
}

// 오버레이를 숨기고 체크리스트 상태를 초기화하는 함수
function hideOverlay() {
    const overlay = document.getElementById('goodbye');
    overlay.style.display = "none";

    checklistStatus = {
        firstClicked: false,
        secondClicked: false,
    };
    updateChecklistImage();  // 체크리스트 이미지를 초기 상태로 되돌립니다.
}
