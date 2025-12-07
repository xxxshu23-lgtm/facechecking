// ===============================
// main.js — 기본 얼굴 고정 + 자동 확대 인터랙션 완성본
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  /* =========================
   *  페이드인 (공통)
   * ========================= */
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "1";
  }, 100);

  /* =========================
   *  버튼 이동
   * ========================= */
  const moreInfoBtn = document.getElementById("moreInfoBtn");
  if (moreInfoBtn) {
    moreInfoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = "article.html"), 500);
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

  // 이전 버튼
  document.querySelectorAll(".prev-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = "../face5.html"), 500);
    })
  );

  // 다음 버튼 (마무리로 이동)
  document.querySelectorAll(".next-btn:not(#moreInfoBtn)").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = "../finish/index.html"), 500);
    })
  );

  /* =========================
   *  결과 페이지 자동 확대 인터랙션
   * ========================= */
  // 기본 얼굴은 제외 (.face-base 빼고 나머지 layer-image만 선택)
  const layers = document.querySelectorAll(".layer-image:not(.face-base)");

  layers.forEach((layer, i) => {
    // 초기 상태
    layer.style.opacity = "0";
    layer.style.transform = "scale(0.9)";
    layer.style.transition =
      "transform 1.2s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 1s ease";

    // 순차 등장 + 확대
    setTimeout(() => {
      layer.style.opacity = "1";
      layer.style.transform = "scale(1.1)"; // 확대 비율
    }, 400 + i * 900); // 순서 간격
  });

  /* =========================
   *  article.html 스크롤 애니메이션
   * ========================= */

  // 돌아가기 버튼 클릭 시 이동
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";

      // ✅ 신뢰 폴더의 index.html로 이동
      setTimeout(() => {
        window.location.href = "index.html";
      }, 500);
    });
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll(".top-section, .matching-section, .comparison-item")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(el);
    });

  /* =========================
   *  스탬프 효과
   * ========================= */
  const stamp = document.querySelector(".fact-check-stamp");
  if (stamp) {
    stamp.style.opacity = "0";
    stamp.style.transform = "translateY(-50%) scale(0.5) rotate(8deg)";
    setTimeout(() => {
      stamp.style.transition =
        "opacity 0.7s ease, transform 0.7s cubic-bezier(0.68,-0.55,0.265,1.55)";
      stamp.style.opacity = "0.95";
      stamp.style.transform = "translateY(-50%) scale(1) rotate(8deg)";
    }, 1200);
  }
});

/* =========================
 *  페이지 전환 대응
 * ========================= */
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));
window.addEventListener("pageshow", (e) => {
  if (e.persisted) document.body.style.opacity = "1";
});
