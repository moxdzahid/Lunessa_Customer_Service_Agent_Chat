/**
 * Theme management functionality
 */
class ThemeManager {
  constructor() {
    this.currentTheme = 'dark';
    this.isThemeSwitching = false;
    
    this.initElements();
    this.initTheme();
  }

  initElements() {
    this.themeToggle = document.getElementById("themeToggle");
  }

  initTheme() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    this.currentTheme = savedTheme;

    document.documentElement.setAttribute("data-theme", this.currentTheme);

    if (this.currentTheme === "light") {
      document.documentElement.style.colorScheme = "light";
    } else {
      document.documentElement.style.colorScheme = "dark";
    }

    this.updateThemeToggleIcon();
  }

  toggleTheme() {
    if (this.isThemeSwitching) return;
    this.isThemeSwitching = true;

    requestAnimationFrame(() => {
      this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", this.currentTheme);
      document.documentElement.style.colorScheme = this.currentTheme;

      localStorage.setItem("theme", this.currentTheme);
      this.updateThemeToggleIcon();

      setTimeout(() => {
        this.isThemeSwitching = false;
      }, 250);
    });
  }

  updateThemeToggleIcon() {
    const slider = this.themeToggle.querySelector(".theme-toggle-slider");

    if (this.currentTheme === "light") {
      slider.innerHTML = "☀️";
      this.themeToggle.classList.add("light");
      this.themeToggle.title = "Switch to dark theme";
    } else {
      slider.innerHTML = "🌙";
      this.themeToggle.classList.remove("light");
      this.themeToggle.title = "Switch to light theme";
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

// Apply theme before page renders to prevent flash
(function () {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.documentElement.style.colorScheme = savedTheme;
})();
