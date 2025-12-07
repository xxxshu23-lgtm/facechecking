// 더 알아보기 버튼 클릭 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const moreInfoBtn = document.getElementById('moreInfoBtn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtns = document.querySelectorAll('.nav-btn.next-btn');
    const nextBtn = nextBtns[nextBtns.length - 1]; // 마지막 next-btn (다음 버튼)

    // 더 알아보기 버튼
    if (moreInfoBtn) {
        moreInfoBtn.addEventListener('click', function() {
            console.log('더 알아보기 클릭');
            // 여기에 상세 페이지로 이동하거나 모달을 여는 로직 추가
            alert('더 자세한 관상 정보 페이지로 이동합니다.');
        });
    }

    // 이전 버튼
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('이전 버튼 클릭');
            // 이전 페이지로 이동
            window.history.back();
        });
    }

    // 다음 버튼
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('다음 버튼 클릭');
            // 다음 페이지로 이동
            alert('다음 단계로 이동합니다.');
        });
    }
});
