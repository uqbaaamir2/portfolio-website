// =========================================================
// Typing effect — cycles through roles in the hero
// =========================================================
(function typingEffect() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const roles = [
    "Frontend Developer",
    "BS Computer Science Student",
    "HTML, CSS & React Learner",
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED = 65;
  const DELETE_SPEED = 35;
  const HOLD_TIME = 1400;

  function tick() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
})();

// =========================================================
// Scroll reveal — fades/slides elements in as they enter view
// =========================================================
(function scrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

// =========================================================
// Active nav link highlighting on scroll
// =========================================================
(function activeNavHighlight() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[data-nav]");
  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!link) return;

        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
})();

// =========================================================
// Cursor glow — lightweight ambient light that follows the pointer
// =========================================================
(function cursorGlow() {
  const glow = document.getElementById("cursor-glow");
  if (!glow) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (prefersReducedMotion || !isFinePointer) return;

  let rafId = null;
  let targetX = 0;
  let targetY = 0;

  function render() {
    glow.style.transform = `translate(${targetX}px, ${targetY}px)`;
    rafId = null;
  }

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    glow.classList.add("is-active");
    if (!rafId) rafId = requestAnimationFrame(render);
  }, { passive: true });

  window.addEventListener("mouseleave", () => glow.classList.remove("is-active"));
})();

// =========================================================
// Close mobile nav after clicking a link
// =========================================================
(function closeMobileNavOnClick() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.querySelectorAll(".nav-links a");
  if (!toggle) return;

  links.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.checked = false;
    });
  });
})();