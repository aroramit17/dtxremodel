const menuButton = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const comparison = document.querySelector("[data-comparison]");
const comparisonAfter = document.querySelector("[data-after]");
const comparisonSlider = document.querySelector("[data-slider]");
const leadForm = document.querySelector("[data-lead-form]");
const formStatus = document.querySelector("[data-form-status]");
const header = document.querySelector("[data-header]");
const estimateSection = document.querySelector("#estimate");
const floatingCta = document.querySelector(".floating-cta");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.classList.add("motion-ready");

if (header) {
  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

if (comparison && comparisonAfter && comparisonSlider) {
  const setSplit = (value) => {
    comparison.style.setProperty("--split", `${value}%`);
    comparisonAfter.style.width = `${value}%`;
  };

  setSplit(comparisonSlider.value);
  comparisonSlider.addEventListener("input", (event) => setSplit(event.target.value));
}

if (estimateSection && floatingCta && "IntersectionObserver" in window) {
  const ctaObserver = new IntersectionObserver(
    ([entry]) => {
      floatingCta.classList.toggle("is-hidden", entry.isIntersecting);
    },
    { threshold: 0.18 }
  );

  ctaObserver.observe(estimateSection);
}

const revealSelectors = [
  ".intro-section > *",
  ".section-heading",
  ".featured-service",
  ".service-groups article",
  ".comparison",
  ".project-notes article",
  ".approach-copy",
  ".steps article",
  ".image-band > *",
  ".testimonial-grid figure",
  ".areas > div",
  ".area-list li",
  ".estimate-copy",
  ".lead-form",
];

const revealItems = [...document.querySelectorAll(revealSelectors.join(","))];

revealItems.forEach((item, index) => {
  item.classList.add("reveal-item");
  item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);

  if (item.matches(".featured-service, .comparison, .image-band img")) {
    item.classList.add("reveal-image");
  }
});

if (reduceMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const lines = [
      "New DTX Remodel estimate request",
      "",
      `Name: ${formData.get("name") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Phone: ${formData.get("phone") || ""}`,
      `Project Type: ${formData.get("project_type") || ""}`,
      "",
      "Project Details:",
      formData.get("project_details") || "",
    ];

    const subject = encodeURIComponent("DTX Remodel estimate request");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:info@dtxremodel.com?subject=${subject}&body=${body}`;

    if (formStatus) {
      formStatus.textContent = "Opening your email app with the estimate request.";
    }
  });
}
