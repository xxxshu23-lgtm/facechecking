// 처음으로 버튼 클릭 핸들러
function goToStart() {
  // ✅ mid 폴더의 index.html로 이동
  document.body.style.transition = "opacity 0.3s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "../mid/index.html"; // 경로 수정
  }, 300);
}

// 페이지 로드 애니메이션
window.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content-wrapper");
  if (content) {
    content.style.opacity = "0";
    content.style.transform = "translateY(20px)";
    content.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(() => {
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    }, 100);
  }
});
