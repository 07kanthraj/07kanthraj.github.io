// ── TICKER: duplicate content for seamless loop ──
const track = document.getElementById("ticker-track");
track.innerHTML += track.innerHTML;

// ── SCROLL REVEAL: observe .sr elements ──
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

// Observe all existing .sr elements
document.querySelectorAll(".sr").forEach((el) => obs.observe(el));

// Add staggered reveal to grid children
document
  .querySelectorAll(
    ".proj-grid .proj-card, .research-grid .res-card, .phil-grid .phil-card, .skills-grid .skill-group",
  )
  .forEach((el, i) => {
    el.style.transitionDelay = i * 0.06 + "s";
    el.classList.add("sr");
    obs.observe(el);
  });
