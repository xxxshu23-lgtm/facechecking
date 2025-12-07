// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  const NEXT_PAGE_URL = "../Korean.html"; // ← 다음 페이지 파일명/경로로 변경

  /* ---------- 1) 눈 깜박임 ---------- */
  function blink() {
    const eye = document.querySelector(".face-illustration, .face-img");
    if (!eye) return;
    eye.style.opacity = 0.2;
    setTimeout(() => (eye.style.opacity = 1), 120);
    setTimeout(blink, Math.random() * 5000 + 3000);
  }
  blink();

  /* ---------- 2) 타이핑 효과 (있을 때만 실행) ---------- */
  const titleEl = document.querySelector(".main-text h1");
  if (titleEl) {
    const txt = titleEl.innerText;
    titleEl.innerText = "";
    let i = 0;
    function type() {
      if (i < txt.length) {
        titleEl.innerText += txt[i++];
        setTimeout(type, 80);
      }
    }
    setTimeout(type, 800);
  }

  /* ---------- 3) 더 알아보기 토글 ---------- */
  const faceContainer = document.getElementById("faceContainer");
  const moreInfoBtn = document.getElementById("moreInfoBtn");
  if (faceContainer && moreInfoBtn) {
    let shown = true;
    moreInfoBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // 전역 클릭 이동 방지
      shown = !shown;
      faceContainer.classList.toggle("hide-guides", !shown);
      moreInfoBtn.textContent = shown ? "숨기기" : "더 알아보기";
    });
  }

  /* ---------- 4) 화면 아무 곳이나 클릭 → 다음 페이지 ---------- */
  const page = document.querySelector(".first-page-container");
  // ✅ 올바른 선택자
  let navigating = false;
  const goNext = () => {
    if (navigating) return;
    navigating = true;
    window.location.href = NEXT_PAGE_URL;
  };

  if (page) {
    page.addEventListener("click", (e) => {
      // 버튼/라벨/가이드/링크 등은 제외
      const isExcluded = e.target.closest(
        ".nav-btn, #moreInfoBtn, .label, .guide, a, button"
      );
      if (isExcluded) return;
      goNext();
    });
  }

  /* ---------- 5) 키보드(Enter/Space) 지원 ---------- */
  document.addEventListener("keydown", (e) => {
    if (["Enter", " "].includes(e.key)) goNext();
  });
});
