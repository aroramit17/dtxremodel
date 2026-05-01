const menuButton = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const comparison = document.querySelector("[data-comparison]");
const comparisonAfter = document.querySelector("[data-after]");
const comparisonSlider = document.querySelector("[data-slider]");

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
