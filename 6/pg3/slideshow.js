// 슬라이드쇼 시작
function startSlideshow() {
    // 모든 TIP 이미지 숨기기
    hideAllTips();

    // 첫 번째 TIP 이미지 보이기
    showTip('TIP_Random');
}

// 모든 TIP 이미지 숨기기
function hideAllTips() {
    var tipIds = ['TIP_Random', 'TIP_Start', 'TIP_RegMSE', 'TIP_Reset', 'TIP_point'];
    for (var i = 0; i < tipIds.length; i++) {
        hideTip(tipIds[i]);
    }
}

// 특정 TIP 이미지 보이기
function showTip(id) {
    var tip = document.getElementById(id);
    if (tip) {
        tip.style.display = 'block';
    }
}

// 특정 TIP 이미지 숨기기
function hideTip(id) {
    var tip = document.getElementById(id);
    if (tip) {
        tip.style.display = 'none';
    }
}

// TIP 이미지 클릭 시 호출될 함수
function fadeOutTip(id) {
    var tip = document.getElementById(id);
    if (tip) {
        tip.style.animation = 'fadeOut 1.5s ease-in forwards';

        // 현재 TIP 이미지 숨기기
        hideTip(id);

        // 다음 TIP 이미지 보이기
        showNextTip(id);
    }
}

// 다음 TIP 이미지 보이기
function showNextTip(currentId) {
    var tipIds = ['TIP_Random', 'TIP_Start', 'TIP_RegMSE', 'TIP_Reset', 'TIP_point'];
    var currentIndex = tipIds.indexOf(currentId);

    if (currentIndex !== -1 && currentIndex < tipIds.length - 1) {
        // 현재 인덱스가 마지막이 아니면 다음 TIP 이미지 보이기
        showTip(tipIds[currentIndex + 1]);
    }
}

// 슬라이드쇼 시작 함수 호출
startSlideshow();
