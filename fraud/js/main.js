// ==========================
// main.js — 최종 통합본 (자동 확대 고정 + 비율 유지)
// ==========================

document.addEventListener("DOMContentLoaded", function () {
  /** -----------------------------
   *  페이지 로드시 페이드인 효과
   * ----------------------------- */
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "1";
  }, 100);

  /** -----------------------------
   *  버튼 요소 선택
   * ----------------------------- */
  const moreInfoBtn = document.getElementById("moreInfoBtn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtns = document.querySelectorAll(".nav-btn.next-btn");
  const nextBtn = nextBtns[nextBtns.length - 1]; // 마지막 "다음" 버튼

  /** -----------------------------
   *  더 알아보기 버튼
   * ----------------------------- */
  if (moreInfoBtn) {
    moreInfoBtn.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = "article.html";
      }, 500);
    });

    moreInfoBtn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)";
      this.style.boxShadow = "0 6px 16px rgba(90, 107, 62, 0.4)";
    });
    moreInfoBtn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "none";
    });
  }

  /** -----------------------------
   *  이전 / 다음 버튼 이동
   * ----------------------------- */
  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = "../face2.html";
      }, 500);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = "../face3.html";
      }, 500);
    });
  }

  /** -----------------------------
   *  article.html 돌아가기 버튼
   * ----------------------------- */
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 500);
    });
  }

  /** -----------------------------
   *  스크롤 애니메이션 (article.html)
   * ----------------------------- */
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const articleSections = document.querySelectorAll(
    ".top-section, .matching-section, .comparison-item"
  );
  articleSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(section);
  });

  /** -----------------------------
   *  이미지 클릭 확대 (기사용)
   * ----------------------------- */
  const comparisonImages = document.querySelectorAll(
    ".comparison-sketch, .comparison-photo"
  );
  comparisonImages.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      this.style.transform =
        this.style.transform === "scale(1.15)" ? "scale(1)" : "scale(1.15)";
      this.style.transition = "transform 0.4s ease";
    });
  });

  /** -----------------------------
   *  스탬프 애니메이션 (기사용)
   * ----------------------------- */
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

  /** -----------------------------
   *  결과화면: 세로 찌그러짐 방지 (비율 고정)
   * ----------------------------- */
  const faceContainer = document.querySelector(".face-container");
  const faceImg = document.querySelector(".face-illustration");
  if (faceContainer && faceImg) {
    faceContainer.style.overflow = "visible";
    const setAspect = () => {
      const w = faceImg.naturalWidth;
      const h = faceImg.naturalHeight;
      if (w && h) {
        faceContainer.style.aspectRatio = `${w} / ${h}`;
      }
    };
    faceImg.complete
      ? setAspect()
      : faceImg.addEventListener("load", setAspect, { once: true });
  }

  /** -----------------------------
   *  결과화면: 박스 자동 순차 등장 + 확대 고정
   * ----------------------------- */
  const featureBoxes = document.querySelectorAll(".box-img");
  featureBoxes.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
      setTimeout(() => el.classList.add("zoomed"), 500);
      // 확대 후 유지 (축소 안함)
    }, i * 1000);
  });

  /** -----------------------------
   *  DEV 모드 (D키): 좌표/크기 조정
   * ----------------------------- */
  const devTargets = document.querySelectorAll(".box-img");
  if (faceContainer && devTargets.length) {
    let DEV = false;
    let dragging = null;

    window.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() !== "d") return;
      DEV = !DEV;
      devTargets.forEach((b) => {
        b.style.outline = DEV ? "1px dashed rgba(0,0,0,.25)" : "none";
        b.style.cursor = DEV ? "move" : "pointer";
      });
      console.log(DEV ? "📐 Layout mode ON" : "📐 Layout mode OFF");
    });

    devTargets.forEach((box) => {
      box.addEventListener("mousedown", (e) => {
        if (!DEV) return;
        dragging = box;
        e.preventDefault();
      });
      box.addEventListener(
        "wheel",
        (e) => {
          if (!DEV) return;
          e.preventDefault();
          const cur =
            parseFloat(getComputedStyle(box).getPropertyValue("--w")) || 30;
          const next = Math.max(
            10,
            Math.min(80, cur + (e.deltaY > 0 ? -1 : 1))
          );
          box.style.setProperty("--w", `${next}%`);
          logCSS(box);
        },
        { passive: false }
      );
    });

    window.addEventListener("mousemove", (e) => {
      if (!DEV || !dragging) return;
      const r = faceContainer.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      dragging.style.setProperty("--left", `${x}%`);
      dragging.style.setProperty("--top", `${y}%`);
    });

    window.addEventListener("mouseup", () => {
      if (!DEV || !dragging) return;
      logCSS(dragging);
      dragging = null;
    });

    function logCSS(el) {
      const s = getComputedStyle(el);
      const w = s.getPropertyValue("--w").trim() || "30%";
      const t = s.getPropertyValue("--top").trim() || "50%";
      const l = s.getPropertyValue("--left").trim() || "50%";
      const cls = [...el.classList].find((c) => /-box$/.test(c)) || "box";
      console.log(`.${cls}{ --w:${w}; --top:${t}; --left:${l}; }`);
    }
  }
});

/** -----------------------------
 *  페이지 이동 시 스크롤 초기화
 * ----------------------------- */
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

/** -----------------------------
 *  뒤로가기 시 페이드인 유지
 * ----------------------------- */
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    document.body.style.opacity = "1";
  }
});
