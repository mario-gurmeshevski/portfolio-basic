document.addEventListener("DOMContentLoaded", function () {
  initializeTheme();
  setupThemeToggle();
});

function initializeTheme() {
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  const systemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const isDark = savedTheme === "dark" || (!savedTheme && systemDark);

  if (isDark) {
    htmlElement.setAttribute("data-theme", "dark");
  } else {
    htmlElement.removeAttribute("data-theme");
  }
}

function setupThemeToggle() {
  const checkForToggle = () => {
    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
      themeToggle.removeEventListener("click", toggleTheme);
      themeToggle.addEventListener("click", toggleTheme);
      updateToggleIcon();
    } else {
      setTimeout(checkForToggle, 100);
    }
  };

  checkForToggle();
}

function toggleTheme() {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  if (newTheme === "dark") {
    htmlElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    htmlElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  }

  updateToggleIcon();

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.style.transform = "scale(0.8)";
    setTimeout(() => {
      toggle.style.transform = "scale(1)";
    }, 150);
  }
}

function updateToggleIcon() {
  const htmlElement = document.documentElement;
  const isDark = htmlElement.getAttribute("data-theme") === "dark";

  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");

  if (sunIcon && moonIcon) {
    if (isDark) {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  }
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      initializeTheme();
      updateToggleIcon();
    }
  });

window.themeUtils = {
  setupThemeToggle,
  updateToggleIcon,
  initializeTheme,
};
