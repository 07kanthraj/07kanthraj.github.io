// ── TICKER: duplicate content for seamless loop ──
const track = document.getElementById("ticker-track");
if (track) track.innerHTML += track.innerHTML;

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
    if (pageYOffset >= sectionTop - 120) {
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

// ── MAGNETIC BUTTONS ──
const magneticBtns = document.querySelectorAll(".btn-magnetic");
magneticBtns.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = `translate(0px, 0px)`;
  });
});

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
