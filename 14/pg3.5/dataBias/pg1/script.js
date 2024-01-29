document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.navigation-button');
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            let value = this.getAttribute('data-value'); 
			localStorage.setItem('value', value); //로컬 스토리지로 데이터 관리
            window.location.href = '../pg2/index.html';
        });
    });
});
