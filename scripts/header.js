document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, starting header fetch");
  loadHeader();
});

function loadHeader() {
  const headerPath = "header.html";

  fetch(headerPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      const cleanData = data.replace(
        /<script[\s\S]*?<\/script>/gi,
        ""
      );
      const headerPlaceholder = document.getElementById(
        "header-placeholder"
      );

      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = cleanData;

        setupActiveNavigation();

        if (window.themeUtils) {
          window.themeUtils.setupThemeToggle();
        }

        console.log("Header loaded successfully");
      } else {
        console.error("Header placeholder element not found");
      }
    })
    .catch((error) => {
      console.error("Error loading header:", error);
    });
}

function setupActiveNavigation() {
  const currentFile =
    window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("#navigation a");

  if (navLinks.length === 0) {
    console.warn("No navigation links found");
    return;
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      currentFile === href ||
      (currentFile === "" && href === "index.html") ||
      (currentFile === "index.html" && href === "index.html")
    ) {
      link.classList.add("active");
      console.log(`Active link set for: ${href}`);
    }
  });

  console.log(`Current file: ${currentFile}`);
}

window.headerUtils = {
  setupActiveNavigation,
  loadHeader,
};
