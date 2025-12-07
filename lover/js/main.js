// js/main.js — 최종본 (세로 늘어남 방지 + 자동 확대 고정)
document.addEventListener("DOMContentLoaded", function () {
  /* ============== 공통: 페이드 인 ============== */
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.8s ease";
  setTimeout(() => (document.body.style.opacity = "1"), 100);

  /* ============== index.html: 버튼 이동 ============== */
  const moreInfoBtn = document.getElementById("moreInfoBtn");
  if (moreInfoBtn) {
    moreInfoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = "article.html"), 500);
    });
    moreInfoBtn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)";
      this.style.boxShadow = "0 6px 16px rgba(90,107,62,.4)";
    });
    moreInfoBtn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "none";
    });
  }

  document.querySelectorAll(".prev-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = "../face.html"), 500);
    })
  );

  document.querySelectorAll(".next-btn:not(#moreInfoBtn)").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = "../face2.html"), 500);
    })
  );

  /* ============== article.html: 뒤로가기 ============== */
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => (window.location.href = "index.html"), 500);
    });
  }

  // 스크롤 등장 애니메이션(기사)
  const io = new IntersectionObserver(
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
      io.observe(el);
    });

  // 비교 이미지 클릭 확대(기사)
  document
    .querySelectorAll(".comparison-sketch, .comparison-photo")
    .forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", function () {
        const scaled = this.style.transform === "scale(1.15)";
        this.style.transform = scaled ? "scale(1)" : "scale(1.15)";
        this.style.transition = "transform 0.4s ease";
      });
    });

  // 스탬프 효과(기사)
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

  /* ============== 결과 화면: 비율 고정(세로 늘어남 방지) ============== */
  const faceContainer = document.querySelector(".face-container");
  const faceImg = document.querySelector(".face-illustration");

  if (faceContainer && faceImg) {
    faceContainer.style.overflow = "visible"; // 박스가 밖으로 나가도 보이게

    // CSS aspect-ratio로 컨테이너 비율 고정 → 이미지 찌그러짐 방지
    const setAspect = () => {
      const w = faceImg.naturalWidth;
      const h = faceImg.naturalHeight;
      if (w && h) {
        // ex) "800 / 1200" 형식
        faceContainer.style.aspectRatio = `${w} / ${h}`;
      }
    };
    faceImg.complete
      ? setAspect()
      : faceImg.addEventListener("load", setAspect, { once: true });
  }

  /* ============== 결과 화면: 박스 자동 순차 확대(고정) ============== */
  const featureBoxes = document.querySelectorAll(".box-img");
  featureBoxes.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show"); // 서서히 등장
      setTimeout(() => {
        el.classList.add("zoomed"); // 확대
        // 더 이상 축소하지 않음(고정)
      }, 500);
    }, i * 1200); // 1.2초 간격으로 순차 재생
  });

  /* ============== DEV 레이아웃 모드(D): 좌표/크기 조정 ============== */
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

/* ============== 페이지 전환 대응 ============== */
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));
window.addEventListener("pageshow", (e) => {
  if (e.persisted) document.body.style.opacity = "1";
});
