// ── TICKER (Removed) ──
// ── SCROLL PROGRESS BAR ──
const progress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  if (progress) progress.style.width = scrolled + "%";
});

// ── SCROLL SPY: active nav states ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-center a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ── MAGNETIC BUTTONS & NAV ──
const magneticElements = document.querySelectorAll(".btn-magnetic, nav");
magneticElements.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Less intense for the nav
    const strength = el.tagName === "NAV" ? 0.1 : 0.35;
    el.style.transform = el.tagName === "NAV" 
      ? `translate(calc(-50% + ${x * strength}px), ${y * strength}px)`
      : `translate(${x * strength}px, ${y * strength}px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = el.tagName === "NAV" ? "translate(-50%, 0px)" : "translate(0px, 0px)";
  });
});

// ── COMMAND PALETTE (Removed) ──

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.07, rootMargin: "0px 0px -32px 0px" },
);

document.querySelectorAll(".sr").forEach((el) => obs.observe(el));

document
  .querySelectorAll(
    ".proj-grid .proj-card, .research-grid .res-card, .phil-grid .phil-card, .skills-grid .skill-group, .exp-item",
  )
  .forEach((el, i) => {
    el.style.transitionDelay = i * 0.06 + "s";
    el.classList.add("sr");
    obs.observe(el);
  });
