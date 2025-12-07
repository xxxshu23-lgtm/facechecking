// ==========================
// main.js — 자동확대 고정 포함 완성본
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
   *  공통: 페이드 인
   * ========================= */
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "1";
  }, 100);

  /* =========================
   *  경로(필요시 바꿔 쓰세요)
   * ========================= */
  const PATHS = {
    moreInfo: "article.html",
    prev: "../face4.html",
    next: "../face5.html",
    backFromArticle: "index.html",
  };

  /* =========================
   *  index.html 전용: 버튼 이동
   * ========================= */
  const moreInfoBtn = document.getElementById("moreInfoBtn");
  if (moreInfoBtn) {
    moreInfoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = PATHS.moreInfo), 500);
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

  const prevBtns = document.querySelectorAll(".prev-btn");
  prevBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = PATHS.prev), 500);
    });
  });

  const nextBtns = document.querySelectorAll(".next-btn:not(#moreInfoBtn)");
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = PATHS.next), 500);
    });
  });

  /* =========================
   *  article.html 전용 (돌아가기)
   * ========================= */
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = PATHS.backFromArticle), 500);
    });
  }

  /* =========================
   *  스크롤 인터랙션 (article.html)
   * ========================= */
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
   *  비교 이미지 클릭 확대 (article.html)
   * ========================= */
  document
    .querySelectorAll(".comparison-sketch, .comparison-photo")
    .forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", function () {
        this.style.transition = "transform 0.4s ease";
        this.style.transform =
          this.style.transform === "scale(1.15)" ? "scale(1)" : "scale(1.15)";
      });
    });

  /* =========================
   *  스탬프 애니메이션 (article.html)
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

  /* =========================
   *  결과 페이지: 자동 확대 고정 (눈, 코, 입)
   * ========================= */
  const featureBoxes = document.querySelectorAll(".box-img");
  featureBoxes.forEach((el, i) => {
    // 초기 상태 설정
    el.style.opacity = "0";
    el.style.transform = "translate(-50%, -50%) scale(1)";
    el.style.transition = "opacity 0.8s ease, transform 1.2s ease";

    // 순차 등장 및 확대
    setTimeout(() => {
      el.classList.add("show");
      el.style.opacity = "1";
      setTimeout(() => {
        el.classList.add("zoomed");
        el.style.transform = "translate(-50%, -50%) scale(1.3)";
      }, 500);
    }, i * 1200); // 1.2초 간격으로 순차 재생
  });
});

/* =========================
 *  페이지 전환 대응
 * ========================= */
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));
window.addEventListener("pageshow", (e) => {
  if (e.persisted) document.body.style.opacity = "1";
});
