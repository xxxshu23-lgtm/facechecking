document.addEventListener("DOMContentLoaded", () => {
  /* =========================
   *  페이드 인 효과 (페이지 로드)
   * ========================= */
  document.body.classList.add("fade-in");

  const navigateTo = (url) => {
    document.body.classList.add("fade-out");
    setTimeout(() => (window.location.href = url), 500);
  };

  /* =========================
   *  버튼 이동 (중복 제거 + 정리)
   * ========================= */
  const moreInfoBtn = document.getElementById("moreInfoBtn");
  if (moreInfoBtn) {
    moreInfoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("article.html");
    });

    // hover 효과
    moreInfoBtn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)";
      this.style.boxShadow = "0 6px 16px rgba(90,107,62,.4)";
    });
    moreInfoBtn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "none";
    });
  }

  // 이전 버튼 (face3.html로 이동)
  document.querySelectorAll(".prev-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("../face3.html");
    })
  );

  // 다음 버튼 (더 알아보기 제외)
  document.querySelectorAll(".next-btn:not(#moreInfoBtn)").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("../face4.html");
    })
  );

  /* =========================
   *  확대 박스 호버 효과 (선택적)
   * ========================= */
  document.querySelectorAll(".zoom-box").forEach((box) => {
    box.addEventListener("mouseenter", () => {
      box.style.transform = "scale(1.05)";
      box.style.transition = "transform 0.3s ease";
    });
    box.addEventListener("mouseleave", () => {
      box.style.transform = "scale(1)";
    });
  });

  /* =========================
   *  팝업 생성기 (공통 함수)
   * ========================= */
  const createPopup = (selector, className, imgSrc, altText) => {
    const box = document.querySelector(selector);
    const wrap = document.querySelector(".face-wrap");
    if (!box || !wrap) return;

    const popup = document.createElement("div");
    popup.classList.add(className);
    popup.innerHTML = `<img src="${imgSrc}" alt="${altText}">`;
    wrap.appendChild(popup);

    let opened = false;
    box.style.cursor = "pointer";

    box.addEventListener("click", (e) => {
      e.stopPropagation();
      opened = !opened;
      popup.classList.toggle("active", opened);
    });

    document.addEventListener("click", () => {
      if (opened) {
        opened = false;
        popup.classList.remove("active");
      }
    });
  };

  // ✅ 눈 / 코 / 귀 / 입 팝업 생성
  createPopup(".eye-zoom", "eye-popup", "../img/temptation_eye.png", "눈 확대 이미지");
  createPopup(".nose-zoom", "nose-popup", "../img/temptation_nose.png", "코 확대 이미지");
  createPopup(".ear-zoom", "ear-popup", "../img/temptation_ear.png", "귀 확대 이미지");
  createPopup(".mouth-zoom", "mouth-popup", "../img/temptation_lip.png", "입술 확대 이미지");
});

/* =========================
 *  페이지 캐시 복원 시 페이드 초기화
 * ========================= */
window.addEventListener("pageshow", (e) => {
  if (e.persisted) document.body.classList.remove("fade-out");
});

/* =========================
 *  뒤로가기 버튼 (있을 경우)
 * ========================= */
const backBtn = document.querySelector(".back-btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
}
