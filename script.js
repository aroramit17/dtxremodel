const menuButton = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const comparison = document.querySelector("[data-comparison]");
const comparisonAfter = document.querySelector("[data-after]");
const comparisonSlider = document.querySelector("[data-slider]");
const leadForm = document.querySelector("[data-lead-form]");
const formStatus = document.querySelector("[data-form-status]");

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
